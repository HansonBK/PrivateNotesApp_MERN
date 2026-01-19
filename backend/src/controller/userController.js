import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"



const signToken = (userId) => {
    return jwt.sign(
        {userId},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_EXPIRES_IN || "7d"}
    );
};


export const register = async (req, res) =>{

    try {
        const {username, email, password, fullname} = req.body

        if(!username || !email || !password || !fullname)
            return res.status(400).json({msg:"Username, eamil, full Name and password are all required"})
        
        if(password.length < 6)
            return res.status(400).json({ msg: "Password must be at least 6 characters" });

        const existingUser = await User.findOne({$or: [{username}, {email}]});

        if(existingUser) 
            return res.status(409).json({msg:"Username or eamil already exists"});

        const passwordHash = await bcrypt.hash(password,10);
        const user = await User.create({username,fullname,email,passwordHash});

        const toekn =signToken(user._id.toString());

        return res.status(201).json({
            toekn,
            user:user.toJSON(),

        });

    } catch (error) {
        console.log("register error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}

export const login = async (req,res) =>{

    try {
        const {email, password, username} = req.body;
        if((!email && !username) || !password) return res.status(400).json({msg:"Eamil or Username and Password are required"});

        const user = await User.findOne({$or:[{username}, {email}]});

        if(!user) return res.status(401).json({msg:"Ivalid credentioals"});

        const ok = await bcrypt.compare(password,user.passwordHash);

        if(!ok) return res.status(401).json({msg:"Invalid credentials"});

        const token =signToken(user._id.toString());

        return  res.status(200).json({token, user:user.toJSON(),});
        

    } catch (error) {

         console.log("login error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}


export const me =async (req,res)=>{

    try {
        const user = await User.findById(req.userId);
        if(!user) return res.status(404).json({msg:"USER NOT FOUND"});

        return res.status(200).json({user:user.toJSON()});

    } catch (error) {
        console.log("me error:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }
}



// =============================================================================
//           OLD METHODE HERE BEFORE AUTH (JUST FOR PRACTICE)
//==============================================================================

export const getUser = async (req,res) =>{

    try {
        
        const userData = await User.find();
        res.status(200).json(userData);


    } catch (error) {
        console.log("Error in getUser Method", error);
        res.status(500).json({mes: "Internal server error"});
    }

}

export const getUserById = async (req,res) =>{

    try {
        
        const findUserById = await User.findById(req.params.userId);

        if(!findUserById) return res.status(404).json({msg:"USER NOT FOUND !!"});

    
        const { password: _, ...safeUser } = findUserById._doc;

        res.status(200).json(safeUser);

        


    } catch (error) {

        console.log("Error in getUser Method", error);
        res.status(500).json({mes: "Internal server error"});
    }

}

export const creatUser = async(req,res) =>{

    try {

        const {username, fullname, email , password} =  req.body;
        const user = new User({username:username, fullname:fullname, email:email, password:password});
        const savedUser = await user.save();

        const { password: _, ...safeUser } = savedUser._doc

        res.status(201).json(safeUser);
        
    } catch (error) {

        console.log("Error in createUser Method", error);
        res.status(500).json({mes: "Internal server error"});
    }
}

export const updateUser = async(request, response) =>{

    try {

        const {username, fullname, email, passwordHash} = request.body;

        const updatedUser = await User.findByIdAndUpdate(request.params.userId, {username, fullname, email, passwordHash}, {new:true, runValidators: true } );

        if(!updatedUser) return response.status(404).json({msg:"USER NOT FOUND !!"});

        
        const { password: _, ...safeUser } = updatedUser._doc;
         return response.status(200).json(safeUser);

    } catch (error) {

        console.log("Erorr in updateUser Method ", erorr);
        response.status(500).json({mes: "Internal server error"});
    }
}


export const deleteUserById = async(req,res) => {

    try {

        const findUserById = await User.findById(req.params.userId);
        if(!findUserById) return res.status(404).json({msg:"USER NOT FOUND !!"});

        await findUserById.deleteOne();

        res.status(200).json({msg:"User deleted successfully "});
        
    } catch (error) {
        
        console.log("Erorr in deleteUserById Method ", erorr);
        res.status(500).json({mes: "Internal server error"});
        
    }
}

export const deleteUserByUsername = async(req,res) => {
    
    try {
        
        const findUserByUsername = await User.findOne({ username: req.params.username });
        if(!findUserByUsername) return res.status(404).json({msg:"USER NOT FOUND !!"});
        
        await findUserByUsername.deleteOne();
        
        res.status(200).json({msg:"User deleted successfully "});
        
    } catch (error) {
        
        console.log("Erorr in findUserByUsername Method ", erorr);
        res.status(500).json({mes: "Internal server error"});
        
    }
}

