import { Catalog } from "~/pages/Catalog";
import type { Route } from "../+types/root";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Catálogo - Provis Global" },
        { name: "description", content: "Our catalog" },
    ];
}

export default function CatalogRoutes() {
    return <Catalog/>;
}