import type { ItemType } from "./ItemType";

export interface CartItem  {
    Name: string,
    Vat: number,
    ItemType:ItemType,
    Price: number 
    Quantity:number
}
