import express from "express";
import getClientIndexPath from "../config/getClientIndexPath.js";

const router = new express.Router();

const clientRoutes = ["/", "/restaurants", "/user-sessions/new", "/users/new", "/restaurants/:id"];
router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath());
});

export default router;
