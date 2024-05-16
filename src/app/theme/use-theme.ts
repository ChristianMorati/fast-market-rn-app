import { useColorScheme } from "react-native"
import themes from './';

function useDeviceTheme() {
    const deviceTheme = useColorScheme()
    const theme = themes[deviceTheme || 'dark']
    return { theme }
}

export default useDeviceTheme;