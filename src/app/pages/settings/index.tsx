import { CallToAction, CallToActionText } from "../../styled-components/buttons";
import { ViewContainer, ViewContainerSecondary } from "../../styled-components/view";
import React, { useContext } from 'react'
import { BasePage } from "../../components/base-page";
import { View } from "react-native";
import { globalStyles } from "../../global-styles";
import { auth } from "../../config";
import { signOut } from "firebase/auth";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserProvider";

const Settings = () => {
    const { user, setUser } = useContext(AuthenticatedUserContext);

    const handleLogout = () => {
        signOut(auth).catch((error) => console.log("Error logging out: ", error));
    };

    return (
        <BasePage children={
            <>
                <ViewContainer style={[globalStyles.baseViewContainer, globalStyles.roundedHidden, {
                    marginTop: 8,
                    gap: 8,
                }]}>
                    <ViewContainerSecondary>
                        <View className='p-2'>
                            <View className="flex mt-3">
                                <CallToAction
                                    onPress={handleLogout}
                                >
                                    <CallToActionText className="font-bold text-lg text-center text-white">Sair</CallToActionText>
                                </CallToAction>
                            </View>
                        </View>
                    </ViewContainerSecondary>
                </ViewContainer>
            </>
        } />
    );
}

export default Settings;