import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    },
    filho: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        marginBottom: 2,
        gap: 2
    },
    headerDetails: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    product: {
        aspectRatio: 1 / 1,
        borderRadius: 8,
        backgroundColor: 'white',
        objectFit: 'contain',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 8,
    },
    button: {
        backgroundColor: '',
        borderRadius: 5,
        paddingVertical: 8,
        paddingHorizontal: 16,
        alignSelf: 'flex-end',
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
    },
    description: {
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 30
    },
    image: {
        borderRadius: 5,
    },
});
