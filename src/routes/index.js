import routesConfig from "../configs";
import DefaultLayout from "../components/layouts/DefauleLayout";
import Home from "../pages/Home";

const publicRouterPathComponent = [{ path: routesConfig.home, component: Home, layout: DefaultLayout }];

export { publicRouterPathComponent };
