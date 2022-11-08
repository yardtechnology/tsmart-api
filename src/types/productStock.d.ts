import { ProductType } from "./product.d";
import StoreType from "./store";

export default interface ProductStockType {
  product: ProductType;
  stock: number;
  store: StoreType;
}
