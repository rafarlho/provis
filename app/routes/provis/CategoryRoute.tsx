import { useParams } from "react-router";
import { useEffect } from 'react';
import { useToolbarTitle } from "~/contexts/ToolbarTitleContext";
import { CategoryList } from "~/pages/Categories/CategoryList";
import { categoryNames } from "~/types/ItemType";

export default function CategoryRoute() {

    const { categoryId } = useParams()
    const { setTitle } = useToolbarTitle()
    
    useEffect(() => {
        setTitle(categoryNames[categoryId || ''] || 'Categoria');
    }, [categoryId, setTitle]);

    return (
        <CategoryList categoryName={categoryId??'confectionery'}/>
    );
}