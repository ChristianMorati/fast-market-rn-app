import { StyleSheet } from "react-native";
import colors from "tailwindcss/colors";

export const globalStyles = StyleSheet.create({
    baseViewContainer: {
        marginHorizontal: 8,
        paddingVertical: 12,
        paddingHorizontal: 10,
    },
    roundedHidden: {
        overflow: "hidden",
        borderRadius: 10,
    },
    BarCodeScannerContainerStyle: {
        height: 300,
        borderRadius: 8,
        backgroundColor: colors.slate[950],
    },
    BarCodeScannerReScanButtonStyle: {
        padding: 12,
        backgroundColor: 'red',
        borderRadius: 8,
        position: 'absolute',
        right: 8,
        bottom: 8,
    },
})