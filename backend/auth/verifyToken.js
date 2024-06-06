const jwt = require('jsonwebtoken');

const { Doctor } = require('../models/DoctorSchema');
const { User } = require('../models/UserSchema');


//next will pass over to the next middleware
 const authenticate = async(req, res, next)=>{

    //get token from headers
    const authToken = req.headers.authorization

    //check whether token exists or not
    if(!authToken){
        return res.status(401).json({success:false, message:'No token, authorization denied'})
        

    }

    try{
        const  token = authToken.split(" ")[1];

        //verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_STRING)

        req.userId = decoded.id;
        req.role = decoded.role;
        next();

    }catch(err){

        if (err.name == 'TokenExpiredError') {
            return res.status(401).json({message:'Token is expired'})
        }

        return res.status(401).json({success:false, message:'Invalid Token'})
    }
}

 
const restrict = roles => async (req, res, next) => {
    const userId = req.userId;

    try {
        let user;

        const patient = await User.findById(userId);
        const doctor = await Doctor.findById(userId);

        if (patient) {
            user = patient;
        } else if (doctor) {
            user = doctor;
        } else {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!roles.includes(user.role)) {
            return res.status(401).json({ success: false, message: 'You are not authorized' });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

module.exports = { authenticate, restrict };
