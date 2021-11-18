const Note  =  require('../../models/model.note')

const userModel = require('../../models/usermodel')
const labelModel = require('../../models/lable.model')

const notereslovers={

    Query:{
        getAllnotes: async ()=>{
            return await Note.find()
         },  
         getnotes: async(_,{id})=>{
            return await Note.findById(id);
       }

    },

    Mutation:{
        createnote: async(_,{post})=>{
            const notes = new Note({
                userId: post.userId,
                title: post.title,
                description: post.description,
                message:"added"
            })
            const existingUser = await userModel.findOne({ email: post.email });
            if(existingUser){
                return 'user id already EXIST'
            }
            await notes.save();
            return notes
 
         },

         editnote: async(parent,args,context,info)=>{

             const {id} =args

            const {title, description} =args.post

            const note = await Note.findByIdAndUpdate(id,{title,description},{new :true})

            return note
         },

        deletenote: async(parent,args,context,info)=>{

        const { id } = args

        await Note.findByIdAndDelete(id)

        return 'notes is deleted sucessfully'

        },
        addLabelToNote: async (_,params) =>{
            //find labelID from noteModel Schema
        var id = await Note.find({ labelID: params.label_ID })

        if (id.length > 0) {
            return { "message": "This label is not present in notes" }
        }
        var note = await Note.findOneAndUpdate({ _id: params.noteID },
            {
                $push: {
                    labelID: params.label_ID
                }

            })

            return "added"


            
        },
        deleteLabelToNote: async (_,params) =>{
            //find labelID from noteModel Schema
        var id = await Note.find({ labelID: params.label_ID })

        if (!id.length > 0) {
            return { "message": "This label is not present in notes" }
        }
        var note = await Note.findOneAndUpdate({ _id: params.noteID },
            {
                $pull: {
                    labelID: params.label_ID
                }

            })

            return "deleted"


            
        }
            



        
                  
            
        
                
        
    }

 }

module.exports = notereslovers;