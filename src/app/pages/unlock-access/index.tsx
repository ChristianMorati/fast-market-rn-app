import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { ParagraphSemibold, Title } from "../../styled-components/text";
import { ViewContainer } from '../../styled-components/view';
import { globalStyles } from '../../global-styles';
import useDeviceTheme from "../../theme/use-theme";
import { BasePage } from '../../components/base-page';
import React from 'react';
import { usePurchaseContext } from '../../contexts/purchase-context';

export default function UnlockAccessScreen() {
    const { theme } = useDeviceTheme();
    const { lastPurchase } = usePurchaseContext();

    const qrCodeData = JSON.stringify({
        purchaseId: lastPurchase?.id
    })

    console.log(qrCodeData);

    return (
        <BasePage children={
            <>
                <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden, styles.container]}>
                    <View className='my-2'>
                        <Title style={{ marginBottom: 8 }}>Siga para a Área de Finalização Fast Market</Title>
                        <ParagraphSemibold>1 - Apresente o QR code ao Totem para liberar acesso.</ParagraphSemibold>
                    </View>
                    <View className='my-2' style={
                        [styles.containerQr,
                        {
                            borderColor: theme.borderColor
                        }
                        ]}
                    >
                        <QRCode
                            value={qrCodeData ? qrCodeData : 'NA'}
                            size={200}
                            color="black"
                            backgroundColor="white"
                            logoSize={20}
                            logoMargin={2}
                            logoBorderRadius={15}
                            logoBackgroundColor="yellow"
                        />
                    </View>
                </ViewContainer>
            </>
        }
        />
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
        marginTop: 8,
        alignItems: 'center',
    },
});