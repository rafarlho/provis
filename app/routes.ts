import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/LandingPageRoute.tsx"),
    route("catalog", "routes/CatalogRoutes.tsx"),
] satisfies RouteConfig;


