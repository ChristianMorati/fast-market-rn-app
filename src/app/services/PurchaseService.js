import { collection, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../../../firebaseConfig";
import useLastPurchase from "../hooks/lastPurchase";

class PurchaseService {
    getRefencedFieldPath(RefencedFieldPathObj) {
        return RefencedFieldPathObj._key.path.segments.join('/').split('/documents/')[1];
    }

    async getAll() {
        const q = query(collection(db, "purchases"), where("_userID", "==", auth.currentUser.uid));

        const purchases = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            purchases.push({
                id: doc.id,
                ...doc.data()
            })
        });

        return purchases;
    }

    async getLast() {
        let lastPurchase = null;

        const querySnapshot = await getDocs(query(
            collection(db, "purchases"),
            where("_userID", "==", auth.currentUser.uid),
            orderBy("date", "desc"),
            limit(1)
        ));

        querySnapshot.forEach((doc) => {
            lastPurchase = {
                id: doc.id,
                ...doc.data()
            };
        });

        return lastPurchase;
    }

    async getById(purchaseId) {
        const purchaseRef = doc(db, 'purchases', purchaseId);
        try {
            const purchase = await getDoc(purchaseRef);

            if (purchase.exists()) {
                return { id: purchase.id, ...purchase.data() };
            } else {
                throw Error("Documento não encontrado!");
            }
        } catch (e) {
            throw e;
        }
    }

    async redeemMyPurchase(purchaseId) {
        const purchaseRef = doc(db, 'purchases', purchaseId);

        try {
            const purchase = await this.getById(purchaseId);

            if (purchase.redeemed) {
                return { message: "Esta compra já foi resgatada!", success: false };
            }

            await updateDoc(purchaseRef, {
                redeemed: true
            });

            return { message: "Compra finalizada com sucesso!", success: true };
        } catch (error) {
            console.error("Erro ao resgatar compra:", error);
            return { message: "Erro ao resgatar compra. Tente novamente mais tarde.", success: false };
        }
    }
}

const purchaseService = new PurchaseService();
export { purchaseService };