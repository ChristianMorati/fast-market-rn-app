import React, { useEffect, useState } from "react";
import { purchaseService } from "../services/PurchaseService";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LoadingIndicator } from "../components";
import { Paragraph, ParagraphBold, ParagraphSemibold, Title } from "../styled-components/text";
import { ViewContainer } from "../styled-components/view";
import { globalStyles } from "../global-styles";
import { BasePage } from "../components/base-page";
import { useProductContext } from "../contexts/product-context";


const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date.seconds * 1000).toLocaleDateString('pt-BR', options);
};

export const Purchase = ({ purchase }) => {
    const { formatToCurrency } = useProductContext()

    const formattedDate = formatDate(purchase.date);
    const total = formatToCurrency(purchase.total)

    return (
        <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden]}>
            <Title>Itens:</Title>
            <View style={styles.itemsContainer}>
                {purchase.items.map((item, index) => {
                    return (
                        <View style={styles.itemContainer} key={index}>
                            <ParagraphBold>{item.description}</ParagraphBold>
                            <ParagraphSemibold>Preço: R$ {item.unit_price}</ParagraphSemibold>
                            <ParagraphSemibold>Quantidade: {item.quantity}</ParagraphSemibold>
                        </View>
                    )
                })}
            </View>
            <ParagraphBold>Total: {total}</ParagraphBold>
            <Paragraph>Data: {formattedDate}</Paragraph>
        </ViewContainer>
    )
}

export const PurchaseHistory = ({ purchases }) => {
    return (
        <>
            {purchases.map((item, index) => <Purchase key={index} purchase={item} />)}
        </>
    );
}

export const PurchaseHistoryScreen = () => {
    const [purchases, setPurchases] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        purchaseService.getAll()
            .then(purchases => {
                setPurchases(purchases);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }, []);

    return (
        <BasePage style={{ marginTop: 10 }} children={
            <>
                {loading ? (
                    <LoadingIndicator />
                ) : (
                    <>
                        {purchases && purchases.length >= 1 ? (
                            <PurchaseHistory purchases={purchases} />
                        ) : (
                            <Text style={styles.noPurchasesText}>Sem compras anteriores</Text>
                        )}
                    </>
                )}
            </>
        } />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3', // cor de fundo
    },
    purchaseContainer: {
        borderBottomWidth: 1,
        borderBottomColor: '#ccc', // cor da borda
        borderRadius: 10,
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 15,
        backgroundColor: '#fff', // cor do fundo do contêiner
    },
    itemsContainer: {
        marginBottom: 10,
    },
    itemContainer: {
        marginBottom: 5,
        borderBottomWidth: .5,
        borderColor: 'gray',
        borderStyle: "solid"
    },
    date: {
        fontSize: 14,
        color: '#999', // cor do texto
    }
});
