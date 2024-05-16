import { View, Text, Image } from "react-native"
import { styles } from "./style"
import { ParagraphBold, ParagraphSemibold } from "../../styled-components/text"

export default function Destaque() {

    const products = [
        {
            description: "MUCILON NESTLE SACHE 180G AVEIA TRIGO",
            img_url: "https://tdc0wy.vteximg.com.br/arquivos/ids/157153-1000-1000/MUCILON-NESTLE-SACHE-180G-AVEIA-TRIGO.png?v=637929951570230000",
            unit_price: 22.45
        },

        {
            description: "SABÃO DE COCO",
            img_url: "https://superprix.vteximg.com.br/arquivos/ids/178997-600-600/Sabao-Pedra-Barra-Coco-100g-Flow-Pack-518948.png?v=636936096853970000",
            unit_price: 2.50
        },
        {
            description: "SABÃO DE COCO",
            img_url: "https://superprix.vteximg.com.br/arquivos/ids/178997-600-600/Sabao-Pedra-Barra-Coco-100g-Flow-Pack-518948.png?v=636936096853970000",
            unit_price: 2.50
        },
        {
            description: "MUCILON NESTLE SACHE 180G AVEIA TRIGO",
            img_url: "https://tdc0wy.vteximg.com.br/arquivos/ids/157153-1000-1000/MUCILON-NESTLE-SACHE-180G-AVEIA-TRIGO.png?v=637929951570230000",
            unit_price: 22.45
        },
    ]


    return (

        <View style={styles.container}>
            {products.map((product, index) => {
                return (
                    <View style={styles.produtosEmDestaques} key={index}>
                        <Image width={170} height={160} source={{ uri: product.img_url }}></Image>
                        <View style={styles.descricao}>
                            <ParagraphSemibold numberOfLines={1} style={styles.text}>{product.description}</ParagraphSemibold>
                            <ParagraphBold numberOfLines={1} style={styles.preco}>R$ {product.unit_price}</ParagraphBold>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}
