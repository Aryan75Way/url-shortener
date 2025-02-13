import express from "express";
import userRoutes from "./url/url.route";

const router = express.Router();

router.use("/url", userRoutes);

export default router;
