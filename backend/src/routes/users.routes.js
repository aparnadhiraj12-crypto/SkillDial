import { Router } from "express";

const router = Router();

router.get("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.patch("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

export default router;