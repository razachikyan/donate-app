import { Router } from "express";
import Imagekit from "imagekit";

const router = Router();

const imagekit = new Imagekit({
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT ?? "",
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY ?? "",
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ?? "",
});

router.get("/auth", (_, res) => {
  res.send(imagekit.getAuthenticationParameters());
});

export default router;
