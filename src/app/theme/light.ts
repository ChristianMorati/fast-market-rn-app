import colors from "tailwindcss/colors"

const primary = 'fuchsia'
const secondary = 'zinc'

const white = '#ffffff'

export default {
    bottomTabColor: white,
    pageBackgroundColor: colors.neutral[100],
    containerBackgroundColor: white,
    containerBackgroundColorSecondary: colors[secondary][100],
    color: colors.neutral[900],
    secondaryColor: colors.neutral[700],
    titleColor: colors.neutral[900],
    callToActionBackground: colors[primary][500],
    secondaryCallToActionBackground: colors[secondary][400],
    callToActionTextColor: white,
    borderColor: colors[secondary][300],
}
