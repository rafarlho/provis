export interface BaseItem {
    Item: string,
    Vat: string
}

export interface BoxItem  extends BaseItem{
    BoxQuantity: number,
    UnitPrice: number,
    BoxPrice: number,
}

export interface PackageItem extends BaseItem {
    Quantity: number,
    Price: number,
}


export type ItemType = "BOX" | "PACKAGE"