import Toast from "react-native-toast-message";

export default function showToast(type: 'success' | 'error', text1: string, text2: string): void {
    Toast.show({
        type,
        text1,
        text2,
        visibilityTime: 1000,
        autoHide: true,
        text1Style: {
            fontSize: 16,
            fontWeight: 'bold',
        },
        text2Style: {
            fontSize: 14,
            fontWeight: '500',
        },
    });
};