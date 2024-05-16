import { ViewContainer } from "../styled-components/view";
import useDeviceTheme from "../theme/use-theme";
import { ActivityIndicator } from "react-native";

export function Loading() {
    const { theme } = useDeviceTheme()
    return (
        <ViewContainer className="items-center justify-center bg-white rounded-md">
            <ActivityIndicator style={{ height: '100%' }} color={theme.callToActionBackground}/>
        </ViewContainer>
    )
}