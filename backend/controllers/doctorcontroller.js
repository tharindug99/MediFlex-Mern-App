const {Doctor} = require("../models/DoctorSchema");
const {Booking} = require("../models/BookingSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


///Update Doctor Info

 const updateDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success:true, message:"Successfully Updated", data:updatedDoctor})
    } catch (error) {
        res.status(500).json({success:false, message:"Update Failed"})
        
    }
}

///Delete DoctorDoctor

 const deleteDoctor = async (req, res) => {Doctor
    const id = req.params.id;

    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id)
        res.status(200).json({success:true, message:"Successfully Deleted"})
    } catch (error) {
        res.status(500).json({success:false, message:"Deletion Failed"})
        
    }
}

///Get Doctor by ID

 const DoctorbyID = async (req, res) => {
    const id = req.params.id;

    try {
        const DoctorwithID = await Doctor.findById(id)
        .populate("reviews")
        .select("-password")
        res.status(200).json({success:true, message:"User found", data:DoctorwithID})
    } catch (error) {
        res.status(404).json({success:false, message:"User Not found"})
        
    }
}

///Get allDoctors

const getAllDoctors = asyncHandler(async (req, res) => {
    try {
        const { query } = req.query;
        let doctors;

        if (query) {
            doctors = await Doctor.find({
                role: "doctor",
                $or: [
                    { name: { $regex: query, $options: "i" } },
                    { specialization: { $regex: query, $options: "i" } },
                ],
            }).select("-password");
        } else {
            doctors = await Doctor.find({ role: "doctor" }).select("-password");
        }

        res.status(200).json({
            success: true,
            message: 'Users Found',
            data: doctors
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


const getDoctorProfile = async (req, res)=> {
    const doctorId = req.userId

    try {
        
        const doctor = await Doctor.findById(doctorId)

        if (!doctor) {
            return res.status(404).json({success:false, message:'Doctor not found'})
        }

        const {password, ...rest} = doctor._doc;
        const appointments = await Booking.find({doctor:doctorId})

        res.status(200).json({success:true, 
                              message:'Profile Info receiving..', 
                              data:{...rest, appointments}})

    } catch (error) {   
        res.status(500).json({success:true, message:'Something went wrong'})

    }
}


module.exports = {getAllDoctors,DoctorbyID,deleteDoctor,updateDoctor, getDoctorProfile}