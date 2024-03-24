import Creator from "~/pages/Creator";
import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import Dashboard from "~/pages/Dashboard";
import DefaultLayout from "../components/layouts/DefaultLayout";
import routesConfig from "../configs";
import Marketplaces from "../pages/Marketplaces";
import CreateNFTLayout from "~/components/layouts/CreateNFTLayout";
import Reviewed from "~/pages/Reviewed";
import Owner from "~/pages/Owner";

const publicRouterPathComponent = [
  { path: routesConfig.home, component: Home, layout: DefaultLayout },
  { path: routesConfig.dashboard, component: Dashboard, layout: CreateNFTLayout },
  { path: routesConfig.creator, component: Creator, layout: CreateNFTLayout },
  { path: routesConfig.reviewed, component: Reviewed, layout: CreateNFTLayout },
  { path: routesConfig.profile, component: Profile, layout: DefaultLayout },
  { path: routesConfig.user, component: Owner, layout: DefaultLayout },
  { path: routesConfig.marketplace, component: Marketplaces, layout: DefaultLayout },
];

export { publicRouterPathComponent };
