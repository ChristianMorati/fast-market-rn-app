import { View, Button } from "react-native";


export const SettingsScreen = () => {
    const handleLogout = () => {
        signOut(auth).catch((error) => console.log("Error logging out: ", error));
    };


    return (
        <View>
            <Button title="Sair da conta" onPress={handleLogout} />
        </View>
    )
} 