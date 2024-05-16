import { Token } from "src/auth/entity/token.entity"
import { Product } from "src/products/entity/product.entity"
import { PurchaseItem } from "src/purchase/entity/purchase-items.entity"
import { Purchase } from "src/purchase/entity/purchase.entity"
import { User } from "src/user/entity/user.entity"
import { DataSource } from "typeorm"

// export const AppDataSource = new DataSource({
//     type: 'mysql',
//     host: process.env.HOST,
//     port: parseInt(process.env.DB_PORT),
//     username: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     entities: [User, Token, Product, Purchase, PurchaseItem],
//     synchronize: true,
// })

// AppDataSource.initialize()
//     .then(() => {
//         console.log("Data Source has been initialized!")
//     })
//     .catch((err) => {
//         console.error("Error during Data Source initialization", err)
//     })