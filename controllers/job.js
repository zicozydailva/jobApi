const Job = require("../models/Job")


const getAllJobs = async (req, res) => {
    try {
        const job = await Job.find({createdBy: req.user.userId}).sort("createdAt")
        res.status(200).json({count: job.length, job})
    } catch (error) {
        res.status(500).json(error)
    }
}



const getJob = async (req, res) => {
    try {
        const job = await Job.findById({_id: req.params.id, createdBy: req.user.userId})
        !job && res.status(404).json("Job not found")

        res.status(200).json({job})
    } catch (error) {
        res.status(500).json(error)
    }
}



const createJob = async (req, res) => {
   try {
       req.body.createdBy = req.user.userId
       const job = await Job.create(req.body)
       res.status(200).json(job)
   } catch (error) {
       res.status(500).json(error)
   }
}


const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate({_id: req.params.id, createdBy: req.user.userId}, req.body, {new:true, runValidators: true})
        !job && res.status(404).json("Job not found")

        res.status(200).json({job})
    } catch (error) {
        res.status(500).json(error)
    }
}


const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete({_id: req.params.id, createdBy: req.user.userId}, {new: true})

        !job && res.status(404).json("Job not found")
        
        res.status(200).json({job})
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}
