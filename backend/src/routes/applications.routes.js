import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.get("/job/:jobId", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

router.patch("/:id", (req, res) => {
  res.status(501).json({ message: "Not implemented yet" });
});

export default router;