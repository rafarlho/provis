import { useEffect } from "react";
import { useToolbarTitle } from "~/contexts/ToolbarTitleContext";
import { Categories } from "~/pages/Categories/Categories";

export default function CatalogRoute() {

    const { setTitle } = useToolbarTitle();

    useEffect(()=> {
        setTitle("Categorias")
    },[setTitle])

    return <Categories />
}