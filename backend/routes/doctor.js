const express = require('express');
const router = express.Router();
const {getAllDoctors,DoctorbyID,deleteDoctor,updateDoctor,getDoctorProfile} = require("../controllers/doctorcontroller");
const { authenticate, restrict } = require('../auth/verifyToken');
const reviewRouter = require('./review')

//nested route
router.use("/:doctorId/reviews", reviewRouter);

router.get('/:id', DoctorbyID);  
router.get('', getAllDoctors);  
router.put('/:id',authenticate,restrict(["doctor"]), updateDoctor);
router.delete('/:id',authenticate,restrict(["doctor"]), deleteDoctor);
router.get('/profile/me',authenticate,restrict(["doctor"]), getDoctorProfile);

module.exports = router;