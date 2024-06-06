const express = require('express');
const router = express.Router();
const { updateUser, deleteUser, UserbyID, getAllUsers, getUserProfile,getMyAppointments } = require("../controllers/usercontroller");
const { authenticate, restrict } = require('../auth/verifyToken');

router.get('/:id', authenticate, restrict(["patient"]),UserbyID);  
router.get('/', authenticate, restrict(["admin"]),getAllUsers);  
router.put('/:id', authenticate, restrict(["patient"]), updateUser);
router.delete('/:id', authenticate, restrict(["patient"]), deleteUser);
router.get('/profile/me', authenticate, restrict(["patient"]), getUserProfile);
router.get('/appointments/my-appointments', authenticate, restrict(["patient"]),
 getMyAppointments);


module.exports = router;
