import { createContext, useContext } from "react";
import type { ToolbarContextType } from "~/types/ToolbarContextType";

export const ToolbarTitleContext = createContext<ToolbarContextType>({
    title: 'Provis',
    setTitle: () => {}
});

export const useToolbarTitle = () => {
    const context = useContext(ToolbarTitleContext)
    if (!context) {
        throw new Error('useToolbarTitle must be used within ToolbarTitleProvider, please re-evaluate')
    }
    return context;
};