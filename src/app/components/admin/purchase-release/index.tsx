import { Alert, Text, View } from "react-native";
import { CallToActionMD, CallToActionText } from "../../../styled-components/buttons";
import { Title } from "../../../styled-components/text";
import React, { useCallback, useState } from "react";
import { ViewContainer } from "../../../styled-components/view";
import { z } from "zod";
import Scanner from "../../../components/scanner/scanner";
import { StyleSheet } from "react-native";
import { globalStyles } from "../../../global-styles";
import { purchaseService } from "../../../services/PurchaseService";
import { useFocusEffect } from "@react-navigation/native";

type qrCodeData = {
    userId: string,
    purchaseId: string
}

type Message = {
    success: boolean,
    message: string
}

const Message = ({ message, success }: Message) => {
    return (
        <View style={{
            backgroundColor: success ? "green" : "red",
            padding: 20,
            borderRadius: 16,
        }}>
            <Title style={{ textAlign: "center" }}>{message}</Title>
        </View>
    );
}

export default function PurchaseRelease() {
    const [scannerActive, setScannerActive] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [resultMessage, setResultMessage] = useState<Message | null>(null);

    async function onCodeScanned(type: string, data: string) {
        if (type != '256' || !data) return;

        const qrCodeData: qrCodeData = JSON.parse(data);

        const qrCodeDataSchema = z.object({
            userId: z.string().min(8),
            purchaseId: z.string().min(8)
        });

        try {
            const validatedData = qrCodeDataSchema.parse(qrCodeData);
            const { userId, purchaseId } = qrCodeData;

            const result = await purchaseService.redeemMyPurchase(purchaseId);

            setResultMessage({ success: result.success, message: result.message });

            console.log("Objeto qrCodeData válido:", validatedData);
        } catch (error) {
            console.error("Erro ao validar qrCodeData:", error);
        }
    }

    function clearBarcodeData() {
        setResultMessage(null);
    }

    useFocusEffect(
        useCallback(() => {
            setScannerActive(true);

            return () => {
                setScannerActive(false);
                setResultMessage(null);
            };
        }, [])
    );

    return (
        <>

            {resultMessage && (
                <Message message={resultMessage.message} success={resultMessage.success} />
            )}
            {showScanner ? (
                <>
                    <Title style={{ textAlign: "center" }}>Aponte o QR Code para a Câmera</Title>
                    {scannerActive && (
                        <>
                            <Scanner
                                onCodeScanned={onCodeScanned}
                                clearBarcodeData={clearBarcodeData}
                                BarCodeScannerContainerStyle={{ ...globalStyles.BarCodeScannerContainerStyle }}
                                BarCodeScannerReScanButtonStyle={{ ...globalStyles.BarCodeScannerReScanButtonStyle }}
                            />
                        </>
                    )}
                </>
            ) : (
                <>
                    <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden, styles.container]}>
                        <CallToActionMD
                            style={{ marginTop: 10 }}
                            onPress={() => {
                                setScannerActive(!scannerActive);
                                setShowScanner(true);
                            }}
                        >
                            <CallToActionText>
                                {'Proxima Compra'.toUpperCase()}
                            </CallToActionText>
                        </CallToActionMD>
                    </ViewContainer>

                </>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    containerQr: {
        justifyContent: 'center',
        padding: 8,
        borderWidth: .3,
        backgroundColor: 'white',
    },
    container: {
        alignItems: 'center',
        marginTop: 8,
    },
});