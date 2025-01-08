import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/page";
import { Layout } from "./components/feature/layout";
import { AboutUs } from "./pages/about-us";
import { Auth } from "./pages/auth/page";
import { Verify } from "./pages/verify/page";
import { Charity } from "./pages/charity/page";
import { AccountPage } from "./pages/account/page";
import { ProductPage } from "./pages/product/page";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Layout background>
          <HomePage />
        </Layout>
      ),
    },
    {
      path: "/about-us",
      element: (
        <Layout>
          {" "}
          <AboutUs />{" "}
        </Layout>
      ),
    },
    {
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
    {
      path: "/charity",
      element: (
        <Layout>
          <Charity />
        </Layout>
      ),
    },
    {
      path: "/me",
      element: (
        <Layout>
          <AccountPage />
        </Layout>
      ),
    },
    {
      path: "/products/:id",
      element: (
        <Layout>
          <ProductPage />
        </Layout>
      ),
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);
