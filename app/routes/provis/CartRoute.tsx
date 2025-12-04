import { useEffect } from "react";
import { useToolbarTitle } from "~/contexts/ToolbarTitleContext";

export default function CartRoute() {
    const { setTitle } = useToolbarTitle();

    useEffect(()=> {
        setTitle("Carrinho")
    },[setTitle])

    return <h1>Página do Carrinho</h1>;
}