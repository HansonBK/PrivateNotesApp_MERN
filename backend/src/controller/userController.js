import User from "../model/userModel.js";


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

        const {username, fullname, email, password} = request.body;

        const updatedUser = await User.findByIdAndUpdate(request.params.userId, {username, fullname, email, password}, {new:true, runValidators: true } );

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

