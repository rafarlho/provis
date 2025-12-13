import Cleaning from '../../products/cleaning.json'
import Confectionary from '../../products/confectionery.json'
import Consumables from '../../products/consumables.json'
import Drinks from '../../products/drinks.json'
import Snacks from '../../products/snacks.json'
import TobaccoItems from '../../products/tobacco_items.json'
import { FaCartPlus } from "react-icons/fa";
import { type ItemType } from '~/types/ItemType';
import { useCart } from '~/contexts/CartContext';
import type { CartItem } from '~/types/CartItemModel';
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import type { Product } from '~/types/ProductModel';
import { useEffect, useState } from 'react';
export const CategoryList = ({categoryName}: {categoryName: string}) => {

    const cartContext = useCart();

    const [items , setItems] = useState<Product[]>([])
    useEffect(() => {
        switch(categoryName) {
            case 'cleaning': setItems([...Cleaning.cleaning_products]);break;
            case 'confectionery': setItems([...Confectionary.chocolates, ...Confectionary.candies, ...Confectionary.gums]);break;
            case 'consumables': setItems([...Consumables.paper_and_napkins,...Consumables.disposables_and_packaging,...Consumables.garbage_bags]);break;
            case 'drinks': setItems([...Drinks.juices_and_sodas,...Drinks.energy_drinks,...Drinks.milk,...Drinks.water, ...Drinks.beers, ...Drinks.wines_and_spirits]);break;
            case 'snacks': setItems([...Snacks.chips, ...Snacks.bars_and_biscuits]);break;
            case 'tobacco': setItems([...TobaccoItems.lighters,...TobaccoItems.accessories, ...TobaccoItems.filters,...TobaccoItems.rolling_papers]);break;
            default: console.error("Categoria desconhecida ou sem correspondência:", categoryName); break;
        }
    },[categoryName])

    const handleAddToCart = (item: Product, type: ItemType) => {
        const cartItem = {
            Name: item.Name,
            ItemType: type,
            Price: type === "BOX" ? item.BoxPrice : item.UnitPrice,
            Quantity: 1,
            Vat: item.VatRate
        } as CartItem;
        cartContext.addItem(cartItem);
    };

    const verifyItemInCart = (itemName: string, type: ItemType) => {
        const foundItem = cartContext.items.find(item => item.Name == itemName && item.ItemType == type)
        if(foundItem) 
            return foundItem.Quantity
        return 0
    }

    const changeItemQuantity = (itemName: string, type: ItemType , signal: '+' | '-' ) => {
        const foundItem = cartContext.items.find(item => item.Name == itemName && item.ItemType == type)
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
            <div className="card  bg-base-100 shadow-sm" key={item.Name}>
                <div className="card-body">
                    <div className="flex justify-between">
                        <h2 className="text-3xl font-bold">{item.Name}</h2>
                        <span className="text-xl">IVA: {item.VatRate}%</span>
                    </div>
                        {item.QuantityDescription && (<p>Quantidade: <b>{item.QuantityDescription}</b></p>)}
                    <div className="flex w-full flex-col lg:flex-row">
                        <div className="card bg-base-300 rounded-box grid grow place-items-center">
                            <h3 className='text-xl'>Unitário</h3>
                            <p>Preço: <b>{item.UnitPrice}€</b></p>
                                {verifyItemInCart(item.Name, "PACKAGE") ? 
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
                                }
                        </div>
                        {item.BoxPrice && item.BoxQuantity && (<>
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
                        </>)}
                    </div>
                </div>
            </div>
        ))}
    </div>
    </>)
}