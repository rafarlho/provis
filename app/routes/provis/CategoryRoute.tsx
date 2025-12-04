import { useParams } from "react-router";
import { useEffect } from 'react';
import { useToolbarTitle } from "~/contexts/ToolbarTitleContext";

export default function CategoryRoute() {

    const { categoryId } = useParams();
    const { setTitle } = useToolbarTitle();
    
    // Mapear IDs para nomes
    const categoryNames: Record<string, string> = {
        'confectionery': 'Confeitaria',
        'snacks': 'Snacks',
        'drinks': 'Bebidas',
        'tobacco': 'Tabacaria',
        'consumables': 'Consumíveis',
        'cleaning': 'Limpezas'      
    };
    
    useEffect(() => {
        setTitle(categoryNames[categoryId || ''] || 'Categoria');
    }, [categoryId, setTitle]);

    return (
        <div>
            <h1>Categoria: {categoryNames[categoryId || '']}</h1>
            
        </div>
    );
}