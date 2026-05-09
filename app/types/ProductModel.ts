import type { Category } from "./CategoryModel"

export interface Product {
    id?: number
    created_at?: Date
    name:string
    tax: number
    description?:string
    category_id?:number
    Category?: Category
    quantity?:number
    price?: number,
}