import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobModel.js";

export const getAllJobs = catchAsyncError(async (req, res, next) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });
});

export const postJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker Can't Post Job", 404));
  }
  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
  } = req.body;
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please Provide full job details", 404));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("Either Provide fixed salary or ranged salary"),
      404
    );
  }
  if ((salaryFrom || salaryTo) && fixedSalary) {
    return next(
      new ErrorHandler(
        "Can not Provide fixed salary and ranged salary together"
      ),
      404
    );
  }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: "Job Posted successfully",
    job,
  });
});

export const getMyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker Can't Access these resources", 404)
    );
  }
  const myJobs = await Job.find({ postedBy: req.user.id });
  res.status(200).json({
    success: true,
    myJobs,
  });
});

export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role, id: userId } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker Can't Access these resources", 404)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(
      new ErrorHandler("The Job Has been deleted or removed. Can't Access", 404)
    );
  }
  if (job.postedBy.toString() !== userId.toString()) {
    return next(
      new ErrorHandler("You are not authorized to update this job", 403)
    );
  }

  const updateData = { ...req.body };

  if (updateData.fixedSalary) {
    updateData.salaryFrom = undefined;
    updateData.salaryTo = undefined;
  }
  if (
    updateData.salaryFrom !== undefined ||
    updateData.salaryTo !== undefined
  ) {
    updateData.fixedSalary = undefined;
  }

  job = await Job.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    job,
    message: "Job Details Updated Successfully",
  });
});

export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker Can't Access these resources", 404)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(
      new ErrorHandler("The Job Has been deleted or removed. Can't Access", 404)
    );
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted Successfully",
  });
});

export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job Not Found", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler("Invalid ID/ CastError", 400));
  }
});
