const {User} = require("../models/UserSchema");
const {Booking} = require("../models/BookingSchema");
const {Doctor} = require("../models/DoctorSchema");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();


///Update user Info

 const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, {$set:req.body}, {new:true})
        res.status(200).json({success:true, message:"Successfully Updated", data:updatedUser})
    } catch (error) {
        res.status(500).json({success:false, message:"Update Failed"})
        
    }
}

///Delete User

 const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id)
        res.status(200).json({success:true, message:"Successfully Deleted"})
    } catch (error) {
        res.status(500).json({success:false, message:"Deletion Failed"})
        
    }
}

///Get user by ID

 const UserbyID = async (req, res) => {
    const id = req.params.id;

    try {
        const UserwithID = await User.findById(id).select("-password")
        res.status(200).json({success:true, message:"User found", data:UserwithID})
    } catch (error) {
        res.status(404).json({success:false, message:"User Not found"})
        
    }
}

///Get allUsers

 const getAllUsers = asyncHandler(async (req, res) => {
        try {
            const users = await User.find().select("-password");
            console.log("The request body is " + req.body);
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    });

    const getUserProfile = asyncHandler(async (req, res) => {

        const userId = req.userId

        try {
            
            const user = await User.findById(userId)

            if (!user) {
                return res.status(404).json({success:false, message:'User not found'})
            }

            const {password, ...rest} = user._doc

            res.status(200).json({success:true, message:'Profile Info receiving..', data:{...rest}})

        } catch (error) {   
            res.status(500).json({success:true, message:'Something went wrong'})

        }
    });

    const getMyAppointments = async(req,res) => {

        try {
            // step 1 retrieve appointments from booking for specific user
                const bookings = await Booking.find({user:req.userId});


            // step 2 Extract doctor ID from appointment booking
                const doctorIds = bookings.map(el=>el.doctor.id);


            // step 3 retrieve doctors using doctor ID
                const doctors = await Doctor.find({_id: {$in:doctorIds}}).select('-password')
                res.status(200).json({success:true, message:'Appointments are getting', data:doctors})
        } catch (error) {
            res.status(500).json({success:true, message:'Something went wrong'})
        }
    }

    module.exports = {getAllUsers,UserbyID,deleteUser,updateUser,getUserProfile,getMyAppointments}