import { Outlet, useNavigate } from "react-router";
import type { Route } from "../+types/root";
import { GrCart, GrCatalog, GrFavorite } from "react-icons/gr";
import type { ReactElement } from "react";
import { useState } from 'react';
import { ToolbarTitleContext } from "~/contexts/ToolbarTitleContext";
export function meta({}: Route.MetaArgs) {
    return [
        { title: "Provis Global" },
    ];
}

export default function MainAppRoutes() {

    const navigate = useNavigate()

    const [toolbarTitle, setToolbarTitle] = useState("Provis");

    const navigation : {name: string, redirectTo: string, icon: ReactElement}[] = [
        {name: "Catálogo", redirectTo: '/provis', icon: <GrCatalog/>},
        {name: "Favoritos", redirectTo: 'favourites', icon: <GrFavorite/>},
        {name: "Carrinho", redirectTo: 'cart', icon: <GrCart/>},
    ]

    return (
        <ToolbarTitleContext.Provider value={{ title: toolbarTitle, setTitle: setToolbarTitle }}>
            <div className="absolute h-16 w-[10dvw] right-0 bg-(--color-secondary) z-49 rounded-bl-[100%]"></div>
            <div className="absolute h-10 w-[20dvw] -top-3 right-0 bg-(--color-primary) z-50 rounded-bl-[100%]"></div>    
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-4" type="checkbox" className="drawer-toggle tex" />
                <div className="drawer-content flex flex-col">
                    <nav className="navbar w-full bg-base-300">
                        <label htmlFor="my-drawer-4" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            {/* Sidebar toggle icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor" className="my-1.5 inline-block size-4"><path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path><path d="M9 4v16"></path><path d="M14 10l2 2l-2 2"></path></svg>
                        </label>
                        <div className="px-4 text-xl font-bold">{toolbarTitle}</div>
                    </nav>
                    {/* Page content here */}
                    <div className="p-4 flex-1 min-h-0">
                        <Outlet></Outlet>
                    </div>
                </div>

                <div className="drawer-side is-drawer-close:overflow-visible">
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
                        {/* Sidebar content here */}
                        <ul className="menu w-full grow">

                            <img src="/logo.png" height="90%" width='auto' className="mt-1 h-10 mx-auto is-drawer-close:hidden" />
                            <img src="/icon.png" height="90%" width='auto' className="mt-1 h-10 mx-auto is-drawer-open:hidden" />
                            <div className="divider m-1"></div>
                            {/* List item */}
                            {navigation.map(nav => (
                                <li className="mt-2">
                                    <button className="is-drawer-close:tooltip is-drawer-close:tooltip-right text-xl h-10" onClick={()=>navigate(nav.redirectTo)} >
                                        {/* Home icon */}
                                        {nav.icon}
                                        <p className="is-drawer-close:hidden ml-3">{nav.name}</p>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </ToolbarTitleContext.Provider>
    );
}