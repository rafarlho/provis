import { useEffect } from "react";
import { useToolbarTitle } from "~/contexts/ToolbarTitleContext";
import { Categories } from "~/pages/Categories/Categories";
import Products from "~/pages/Products/Products";

export default function CatalogRoute() {

    const { setTitle } = useToolbarTitle();

    useEffect(()=> {
        setTitle("Produtos")
    },[setTitle])

    return <Products />
}