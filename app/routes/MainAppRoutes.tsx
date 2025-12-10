import { Outlet, useLocation, useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { GrCart, GrCatalog } from "react-icons/gr";
import type { ReactElement } from "react";
import { useEffect, useState } from 'react';
import { ToolbarTitleContext } from "~/contexts/ToolbarTitleContext";
import { CartContext } from "~/contexts/CartContext";
import type { CartItem } from "~/types/CartItemModel";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Provis Global" },
    ];
}

export default function MainAppRoutes() {

    const navigate = useNavigate()
    const location = useLocation();

    const [toolbarTitle, setToolbarTitle] = useState("Provis");

    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);
    
    const addItem = (item: CartItem) => {
        setCartItems(prev => [...prev, item]);
    };

    const removeItem = (currentItem: CartItem) => {
        setCartItems(prev => prev.filter(item => !(item.Name === currentItem.Name && item.ItemType === currentItem.ItemType)));
    };

    const isInCart = (currentItem: CartItem) => {
        return cartItems.filter(item => item.Name === currentItem.Name && item.ItemType == currentItem.ItemType).length ?? 0;
    };

    const changeQuantity = (currentItem: CartItem, newQuantity: number) => {
        setCartItems(prev => prev.filter((item: CartItem) => {
            if(item.Name !== currentItem.Name && item.ItemType === currentItem.ItemType)
                return {...item, Quantity: newQuantity}
            return item
        }));
    };
    

    useEffect(()=> {
        if(isHydrated) localStorage.setItem('cart',JSON.stringify(cartItems))
    },[cartItems,isHydrated])

    useEffect(()=> {
        const  cartItems = localStorage.getItem("cart");
        if(cartItems) {
            setCartItems(JSON.parse(cartItems))
            setIsHydrated(true)
        }
    },[])

    const cartContextValue = {
        items: cartItems,
        addItem,
        removeItem,
        isInCart,
        changeQuantity,
    };

    const navigation : {name: string, redirectTo: string, icon: ReactElement}[] = [
        {name: "Catálogo", redirectTo: '/provis', icon: <GrCatalog/>},
        {name: "Carrinho", redirectTo: '/provis/cart', icon: <GrCart/>},
    ]

    return (
        <ToolbarTitleContext.Provider value={{ title: toolbarTitle, setTitle: setToolbarTitle }}>
        <CartContext.Provider value={cartContextValue}>
            <div className="absolute h-16 w-[10dvw] right-0 bg-(--color-secondary) z-49 rounded-bl-[100%]"></div>
            <div className="absolute h-10 w-[20dvw] -top-3 right-0 bg-(--color-primary) z-50 rounded-bl-[100%]"></div>    

            <div className=" md:hidden flex flex-col h-dvh min-h-0">
                <nav className="navbar w-full bg-base-300 ">
                    <div className="px-4 text-xl font-bold">{toolbarTitle}</div>
                </nav>
                <div className="p-4 flex-1 min-h-0 overflow-auto">
                    <Outlet></Outlet>
                </div>
                <div className="dock relative!">
                    {navigation.map(nav => (
                        <button className={ location.pathname === nav.redirectTo? "dock-active":''}  onClick={()=>navigate(nav.redirectTo)} >
                            {nav.name ==="Carrinho" && cartItems.length > 0 ?
                                <div className="avatar indicator">
                                <span className="indicator-item badge badge-primary p-1">{cartItems.length}</span>
                                    {nav.icon}
                                </div>
                            :   
                                (nav.icon)
                            }
                            <p className="dock-label">{nav.name}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="hidden md:grid drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle tex" />
                <div className="drawer-content flex flex-col h-dvh min-h-0">
                    <nav className="navbar w-full bg-base-300 ">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4 text-xl font-bold">{toolbarTitle}</div>
                    </nav>
                    <div className="p-4 flex-1 min-h-0 overflow-auto">
                        <Outlet></Outlet>
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        <ul className="menu w-full grow">

                            <img src="/logo.png" height="90%" width='auto' className="mt-1 h-10 mx-auto is-drawer-close:hidden" />
                            <img src="/icon.png" height="90%" width='auto' className="mt-1 h-10 mx-auto is-drawer-open:hidden" />
                            <div className="divider m-1"></div>
                            {navigation.map(nav => (
                                <li className="mt-2">
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl h-10" onClick={()=>navigate(nav.redirectTo)} >
                                        {nav.name ==="Carrinho" && cartItems.length > 0 ?
                                            <div className="avatar indicator">
                                            <span className="indicator-item badge badge-primary p-1">{cartItems.length}</span>
                                                {nav.icon}
                                            </div>
                                        :   
                                            (nav.icon)
                                        }
                                        <p className="is-drawer-close:hidden ml-3">{nav.name}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </CartContext.Provider>
        </ToolbarTitleContext.Provider>
    );
}