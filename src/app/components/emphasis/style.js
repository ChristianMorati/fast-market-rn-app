import { StyleSheet } from "react-native";
import colors from "tailwindcss/colors";

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    gap: 8,
    paddingVertical: 8,
  },
  produtosEmDestaques: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
  },
  descricao: {
    width: '100%',
    height: 50,
    backgroundColor: colors.fuchsia[800],
    paddingHorizontal: 4,
  },
  text: {
    paddingTop: 2,
    fontSize: 11,
    color: 'white',
    textAlign: 'center',
  },
  preco: {
    fontSize: 14,
    color: 'white',
    marginTop: 5,
  },
});

