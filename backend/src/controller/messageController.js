import Message from "../model/messageModel.js";




export const getAllMessages = async (req,res) => {

    try {
        
        const msg =  await Message.find({
            owner: req.userId
        });
        
        res.status(200).json(msg);

    } catch (error) {

        console.log("Error in getAllMessages method ", error);
        res.status(500).json({msg:"internal server errro"});

        
    }



}

export const createMessage = async(req,res)=>{

    try {
        
        const { title, messagebody} = req.body;

        const message  = await Message.create({

            title:title,
            messagebody:messagebody,
            owner: req.userId
        });

        res.status(201).json(message);


    } catch (error) {

        console.log("Error in creating message method ", error);
        res.status(500).json({msg:"internal server error"});
        
    }
}


export const updateMessage = async ()=>{

    
}

