import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "./pages/home/page";
import { Layout } from "./components/feature/layout";
import { AboutUs } from "./pages/about-us";
import { Auth } from "./pages/auth/page";
import { Verify } from "./pages/verify/page";
import { Charity } from "./pages/charity/page";
import { AccountPage } from "./pages/Account/page";

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
      element: <AboutUs />,
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
      element: <Charity />,
    },
    {
      path: "/me",
      element: <AccountPage />,
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
