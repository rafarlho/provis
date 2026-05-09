import React, { useCallback, useEffect, useState } from 'react'
import client from '~/api/client'
import { useCart } from '~/contexts/CartContext'
import type { CartItem } from '~/types/CartItemModel'
import type { Product } from '~/types/ProductModel'

const Products = () => {
    const [items , setItems] = useState<Product[]>([])

    const getData = useCallback(async ()=> {
        const products = await client.from('Product').select(`*,Category (id,name)`)
        if(products.error) console.error(products.error)
        setItems(products.data ?? [])
        const categories = await client.from('Category').select(`*`)
        if(categories.error) console.error(products.error)
    },[])

    useEffect(()=> {
        getData()
    },[getData])
    
    const cartContext = useCart();

    const handleAddToCart = (item: Product) => {
        // const cartItem = {
        //     Name: item.,
        //     Price: item.Price,
        //     Quantity: 1,
        //     ProductId: item.Id,
        //     Vat: item.VatRate
        // } as CartItem;
        // cartContext.addItem(cartItem);
    };

    const verifyItemInCart = (itemId: number) => {
        const foundItem = cartContext.items.find(item => item.ProductId == itemId)
        if(foundItem) 
            return foundItem.Quantity
        return 0
    }

    const changeItemQuantity = (itemId: number, signal: '+' | '-' ) => {
        const foundItem = cartContext.items.find(item => item.ProductId == itemId)
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
        <div className='flex flex-col gap-2 min-h-0 overflow-auto'>
            {items.map(item => (
                <div className="card  bg-base-100 shadow-sm" key={item.name}>
                    <div className="card-body">
                        <div className="flex justify-between">
                            <h2 className="text-3xl font-bold">{item.name}</h2>
                            <span className="text-xl">IVA: {item.tax}%</span>
                        </div>
                            {item.quantity && (<p>Quantidade: <b>{item.quantity}</b></p>)}
                        <div className="flex w-full flex-col lg:flex-row">
                            <div className="card bg-base-300 rounded-box grid grow place-items-center">
                                <h3 className='text-xl'>Unitário</h3>
                                <p>Preço: <b>{item.price}€</b></p>
                                    {/* {verifyItemInCart(item.Name, "PACKAGE") ? 
                                        <div className='flex items-center rounded-4xl bg-(--color-primary) text-white p-1 gap-2' >
                                            <button className="btn btn-circle text-(--color-primary) bg-white border-0" onClick={() => changeItemQuantity(item.Name,'PACKAGE','-')}>
                                                <FaMinusCircle/>
                                            </button>
                                            <p className='font-bold'>{verifyItemInCart(item.Name, "PACKAGE")}</p>
                                            <button className="btn btn-circle text-(--color-primary) bg-white border-0" onClick={() => changeItemQuantity(item.Name,'PACKAGE','+')}>
                                                <FaPlusCircle/>
                                            </button>
                                        </div>
                                    :
                                        <button className="btn rounded-4xl bg-(--color-primary) text-white" onClick={()=>handleAddToCart(item,"PACKAGE")}>
                                            <FaCartPlus/>Adicionar ao carrinho
                                        </button>
                                    } */}
                            </div>
                            {/* {item.BoxPrice && item.BoxQuantity && (<>
                                <div className="divider lg:divider-horizontal">Ou</div>
                                <div className="card bg-base-300 rounded-box grid grow place-items-center">
                                    <h3 className='text-xl'>Caixa</h3>
                                    <p>Quantidade: <b>{item.BoxQuantity}</b></p>
                                    <p>Preço: <b>{item.BoxPrice}€</b></p>
                                    {verifyItemInCart(item.Name, "BOX") ? 
                                        <div className='flex items-center rounded-4xl bg-(--color-primary) text-white p-1 gap-2' >
                                            <button className="btn btn-circle text-(--color-primary) bg-white border-0" onClick={() => changeItemQuantity(item.Name,'BOX','-')}>
                                                <FaMinusCircle/>
                                            </button>
                                            <p className='font-bold'>{verifyItemInCart(item.Name, "BOX")}</p>
                                            <button className="btn btn-circle text-(--color-primary) bg-white border-0" onClick={() => changeItemQuantity(item.Name,'BOX','+')}>
                                                <FaPlusCircle/>
                                            </button>
                                        </div>
                                    :
                                        <button className="btn rounded-4xl bg-(--color-primary) text-white" onClick={()=>handleAddToCart(item,"BOX")}>
                                            <FaCartPlus/>Adicionar ao carrinho
                                        </button>
                                    }
                                </div>
                            </>)} */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </>)
}

export default Products
