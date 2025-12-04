import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/LandingPageRoute.tsx"),
    route("provis", "routes/MainAppRoutes.tsx", [
        index("routes/provis/CatalogRoute.tsx"),
        route("category/:categoryId", "routes/provis/CategoryRoute.tsx"),
        route("cart", "routes/provis/CartRoute.tsx"),
        route("favourites", "routes/provis/FavouritesRoute.tsx"),
    ]),
] satisfies RouteConfig;


