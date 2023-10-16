const asyncHandler=require("express-async-handler");
const Contact=require("../mondel/contactModels");

const getContacts=asyncHandler(async(req,res)=>{
        const contacts=await Contact.find({user_id:req.user._id});
        res.status(200).json(contacts);
});
const getContact=asyncHandler(async(req,res)=>{
        const contact=await Contact.findById(req.params.id)
        if(!contact){
                res.status(404)
                throw new Error("No field found")
        }
        else
        res.status(200).json(contact);
});
const createContact=asyncHandler(async(req,res)=>{
        
        const {name,email,phone}=req.body;
        console.log("Please check ");
        if(!name||!email||!phone)
        {
                res.status(400);
                throw new Error("All fields are mandatory");
        }
        try{

                const contact = await Contact.create({
                        user_id: req.user._id,
                        name,
                        email,
                        phone,
                    });
                
                res.status(201).json(contact);
        }
        catch (error) {
                
                console.error(req.user.id); // Log the error for debugging
                res.status(500); // Use a 500 status code for server errors
                throw new Error("Internal Server Error");
            }
       
})
const deleteContact = asyncHandler(async (req, res) => {
        // Find the contact by ID
        const contact = await Contact.findById(req.params.id);
      
        if (!contact) {
          // If the contact is not found, return a 404 response
          return res.status(404).json({ message: "Contact not found" });
        }
        console.log(contact.user_id.toString())
        if(contact.user_id.toString() !== req.user._id)
        {
                res.status(403)
                throw new Error("You are not authorized to do so!!")
        }
      
        // Use the deleteOne method to remove the contact
        await Contact.deleteOne({ _id: req.params.id });
      
        // Return a success response
        res.status(200).json({ message: `Deleted the Info of ${req.params.id}` });
      });
      
const updatecontact=asyncHandler(async(req,res)=>{
        const contact=await Contact.findById(req.params.id)
        if(!contact){
                res.status(404)
                throw new Error("No field found")
        }
        console.log(contact.user_id.toString())
        if(contact.user_id.toString() !== req.user._id)
        {
                res.status(403)
                throw new Error("You are not authorized to do so!!")
        }
        const updatedcontact=await Contact.findByIdAndUpdate(
                req.params.id,
                req.body,
                {new:true}
        )
        res.status(200).json(updatedcontact);
    })
module.exports={getContact,getContacts,createContact,deleteContact,updatecontact};