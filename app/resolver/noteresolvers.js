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
           AddLabel: async (_,{path},context) =>{
            const checkinglabel = await labelModel.findOne({labelName:path.labelname})
            if(checkinglabel){
                checkinglabel.noteId.push(path.noteID)
                await checkinglabel.save();
                return({
                    labelname:path.labelname,
                })
            }
            const labelmodel = new labelModel({

                noteId: path.noteID,
                labelName:path.labelname,
                
            });
            await labelmodel.save();
            return "label added to note sucessfully"
                
            
        
                    
                
            
        }
        
    }

 }

module.exports = notereslovers;