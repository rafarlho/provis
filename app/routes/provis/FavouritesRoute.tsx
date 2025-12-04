import { useEffect } from "react";
import { useToolbarTitle } from "~/contexts/ToolbarTitleContext";

export default function FavoritesRoute() {
    const { setTitle } = useToolbarTitle();

    useEffect(()=> {
        setTitle("Favoritos")
    },[setTitle])
    
    return <h1>Página de Favoritos</h1>;
}