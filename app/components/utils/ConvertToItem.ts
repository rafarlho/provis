import type { BoxItem, PackageItem } from "~/types/ItemModel"

export const ConvertObjectsToBoxItems = (objects : any[]) => {
    const boxItems = objects.map(object => ({
        Item: object.item ?? "",
        BoxPrice: object.box_price ?? null,
        UnitPrice: object.unit_price ?? null ,
        Vat: object.vat ??"",
        BoxQuantity: object.box_quantity ?? null,
    } as BoxItem))
    return boxItems
} 

export const ConvertObjectsToPackageItems = (objects : any[]) => {
    const boxItems = objects.map(object => ({
        Item: object.item ?? "",
        Quantity: object.quantity ?? null,
        Vat: object.vat ??"",
        Price: object.price ?? null,
    } as PackageItem))
    return boxItems
} 