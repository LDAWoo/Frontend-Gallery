import routesConfig from "../configs";
import DefaultLayout from "../components/layouts/DefaultLayout";
import Marketplaces from "../pages/Marketplaces";
import Home from "~/pages/Home";
import Profile from "~/pages/Profile";

const publicRouterPathComponent = [
  { path: routesConfig.home, component: Home, layout: DefaultLayout },
  { path: routesConfig.profile, component: Profile, layout: DefaultLayout },
  { path: routesConfig.marketplace, component: Marketplaces, layout: DefaultLayout },
];

export { publicRouterPathComponent };
