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



export const updateMessage = async (req,res)=>{

    try {
        
        const {title, messagebody} = req.body;

        const messageId = req.params.id;

        const message = await Message.findById(messageId);

        

        if(!message) return res.status(404).json({msg:"MESSAGE NOT FOUND!"});

        if(message.owner.toString() !== req.userId){

            return res.status(403).json({msg:"Not allowed to update this message"});
        }

        message.title = title ?? message.title;
        message.messagebody = messagebody ?? message.messagebody;

        const updatedMessage = await message.save();



        res.status(200).json(updatedMessage);



    } catch (error) {
        console.log("Error in updating message method ", error);
        res.status(500).json({msg:"internal server error"});
        
    }
}


export const deleteMessage = async (req,res)=>{

    try {

        const messageId = req.params.id;
        const message = await Message.findById(messageId);

        if(!message) return res.status(404).json({msg:"MESSAGE NOT FOUND!"});


        if(message.owner.toString() !== req.userId){

            return res.status(403).json({msg:"Not allowed to delete this message"});
        }

        await message.deleteOne();

        res.status(200).json({msg:"message deleted successfully"});

    } catch (error) {

        console.log("Error in delete message method ", error);
        res.status(500).json({msg:"internal server error"});
        
    }
}

