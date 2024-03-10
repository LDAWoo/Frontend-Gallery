import { Route, Routes } from "react-router-dom";
import { publicRouterPathComponent } from "~/routes";
import AppTokenProvider from "./components/Contexts/AppTokenProvider";
import AppUserProvider from "./components/Contexts/AppUserProvider";

function App() {
  return (
    <AppTokenProvider>
      <AppUserProvider>
        <Routes>
          {publicRouterPathComponent.map((router, index) => {
            const path = router.path;
            const Layout = router.layout;
            const Page = router.component;

            return (
              <Route
                key={index}
                path={path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </AppUserProvider>
    </AppTokenProvider>
  );
}

export default App;
