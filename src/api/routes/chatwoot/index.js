import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("This can be post");
})

router.post("/", (req, res, next) => {
  console.log("body",JSON.stringify(req.body));

  res.status(200).json({
    success: true,
    message: "Post request successful"
  })
})


export default router;