import { useEffect } from "react";
import { useCart } from "~/contexts/CartContext";
import { useToolbarTitle } from "~/contexts/ToolbarTitleContext";

export default function CartRoute() {
    const { setTitle } = useToolbarTitle();
    const cartContext = useCart();
    useEffect(()=> {
        setTitle("Carrinho")
    },[setTitle])

    return (<>
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Tipo</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                        <th>Iva</th>
                        <th>Alterar</th>
                        <th>Remover</th>
                    </tr>
                </thead>
                <tbody>
                    {cartContext.items.map(item =>(
                        <tr>
                            <td>{item.Item}</td>
                            <td>{item.ItemType === 'BOX' ? "Caixa" : 'Unitário'}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.Price * item.Quantity}</td>
                            <td>{item.Vat}</td>
                            <td><button>Change</button></td>
                            <td><button>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </>);
}