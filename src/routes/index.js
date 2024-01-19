import routesConfig from "../configs";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Marketplaces from "../pages/Marketplaces";
import Home from "~/pages/Home";

const publicRouterPathComponent = [
  { path: routesConfig.home, component: Home, layout: DefaultLayout },
  { path: routesConfig.marketplace, component: Marketplaces, layout: DefaultLayout },
];

export { publicRouterPathComponent };
