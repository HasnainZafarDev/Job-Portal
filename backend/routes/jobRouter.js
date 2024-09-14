import express from "express";
import { deleteJob, getAllJobs, getMyJobs, getSingleJob, postJob, updateJob } from "../controllers/jobController.js";
import { isAuthorized } from "../middlewares/auth.js";
const router = express.Router();

router.get("/getall", getAllJobs);
router.post("/createjob",isAuthorized,postJob);
router.get("/getmyjobs",isAuthorized,getMyJobs)
router.put("/updatejob/:id",isAuthorized,updateJob)
router.delete("/delete/:id",isAuthorized,deleteJob)
router.get("/getsinglejob/:id",isAuthorized,getSingleJob)

export default router;
