import type { BoxItem, ItemType, PackageItem } from "~/types/ItemType"

export const SelectionToCartTable = (
    {headers, source, type} : 
    {
        headers: string[],
        source: BoxItem[] | PackageItem[],
        type: ItemType

    }
) => {

    return (
        <div className="overflow-x-auto overflow-y-auto">
            <table className="table table-xs table-zebra">
                <thead>
                <tr>
                    <th></th>
                    {headers.map(h =>
                        <th>{h}</th>
                    )}
                    
                </tr>
                </thead>
                <tbody>
                    {source.map(item => 
                        <tr>
                            <td>
                                <label className="swap">
                                    <input type="checkbox" />
                                    <div className="swap-off">Add to cart</div>
                                    <div className="swap-on">Item in cart</div>
                                </label>
                            </td>
                            <td>{item.Item}</td>
                            {type === "BOX" ? 
                            <>
                                <td>{(item as BoxItem).BoxQuantity}</td>
                                <td>{(item as BoxItem).UnitPrice}</td>
                                <td>{(item as BoxItem).BoxPrice}</td>
                            </>
                                :
                            <>
                                <td>{(item as PackageItem).Quantity}</td>
                                <td>{(item as PackageItem).Price}</td>
                            </>
                            }
                            <td>{item.Vat}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}