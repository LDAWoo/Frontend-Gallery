import { Route, Routes } from "react-router-dom";
import { publicRouterPathComponent } from "~/routes";
import AppUserProvider from "./components/Contexts/AppUserProvider";

function App() {
  return (
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
  );
}

export default App;
