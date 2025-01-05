import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { IKContext } from "imagekitio-react";
import { authenticator } from "./utils/authenticator";

export const App = () => {
  return (
    <IKContext
      urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL_ENDPOINT}
      publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
      authenticator={authenticator}
    >
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </IKContext>
  );
};
