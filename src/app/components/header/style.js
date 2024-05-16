import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingVertical: 16,
    paddingHorizontal: 10,
    borderTopWidth: .5,
    borderColor: '#a3a3a3',
  },
  photo: {
    width: '15%',
    aspectRatio: 1, // Mantém a proporção da imagem (largura / altura)
    borderRadius: 100, // Metade da largura da imagem
  },
  greeting: {
    width: "80%",
    fontSize: 16,
    marginRight: 4
  },
  camButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  whiteBorder: {
    borderColor: 'white',
    borderWidth: 1,
  }
});

export default styles;
