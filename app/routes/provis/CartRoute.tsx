import { useEffect } from "react";
import { FaMinusCircle, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { MdOutlineSchedule } from "react-icons/md";
import { useNavigate } from "react-router";
import { useCart } from "~/contexts/CartContext";
import { useToolbarTitle } from "~/contexts/ToolbarTitleContext";
import type { CartItem } from "~/types/CartItemModel";

export default function CartRoute() {
    const { setTitle } = useToolbarTitle()
    const navigate = useNavigate()
    const cartContext = useCart()

    useEffect(()=> {
        setTitle("Carrinho")
    },[setTitle])

    const verifyItemInCart = (cartItem: CartItem) => {
        const foundItem = cartContext.items.find(item => item.Name == cartItem.Name && item.ItemType == cartItem.ItemType)
        if(foundItem) 
            return foundItem.Quantity
        return 0
    }

    const changeItemQuantity = (cartItem: CartItem , signal: '+' | '-' ) => {
        const foundItem = cartContext.items.find(item => item.Name == cartItem.Name && item.ItemType == cartItem.ItemType)
        if(foundItem) {
            if(signal === '-' && foundItem.Quantity === 1) 
            {
                cartContext.removeItem(foundItem)
                return
            }
            cartContext.changeQuantity(foundItem, signal === '-' ? --foundItem.Quantity: ++foundItem.Quantity)
        }
    }

    return (<>
        <div className="h-full flex items-center justify-center flex-col gap-2">
            {cartContext.items.length > 0 ? (<>
                <div className="flex justify-end w-full">
                    <button className="btn btn-success"><MdOutlineSchedule /> Encomendar produtos</button>
                </div>
                <div className="overflow-x-auto h-full w-full">
                    <table className="table table-zebra table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Tipo</th>
                                <th>Quantidade</th>
                                <th>Preço<small> (sem Iva)</small></th>
                                <th>Iva</th>
                                <th>Alterar</th>
                                <th>Remover</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartContext.items.map(item =>(
                                <tr>
                                    <td>{item.Name}</td>
                                    <td>{item.ItemType === 'BOX' ? "Caixa" : 'Unitário'}</td>
                                    <td>{item.Quantity}</td>
                                    <td>{(item.Price * item.Quantity).toFixed(2)}€</td>
                                    <td>{item.Vat}%</td>
                                    <td>

                                        <div className='flex items-center rounded-4xl bg-(--color-primary) text-white p-1 gap-2 w-min'  >
                                            <button className="btn btn-circle text-(--color-primary) bg-white border-0" onClick={() => changeItemQuantity(item,'-')}>
                                                <FaMinusCircle/>
                                            </button>
                                            <p className='font-bold'>{verifyItemInCart(item)}</p>
                                            <button className="btn btn-circle text-(--color-primary) bg-white border-0" onClick={() => changeItemQuantity(item,'+')}>
                                                <FaPlusCircle/>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <button className="btn btn-circle bg-(--color-warning) text-white border-0" onClick={() => cartContext.removeItem(item)}>
                                            <FaTrashAlt/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>) : 
                <>
                    <p className="text-xl">Não existem itens no carrinho...</p>
                    <button className="btn bg-(--color-custom-teal) border-0 text-white" onClick={()=>navigate("/provis")}>Ver catálogo</button>
                </>
            }
            </div>
    </>);
}