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
            let userNote = await notesModel.findById({ _id: path.noteId });
            let userLabel = await labelsModel.findById({ _id: path.labelId });
            if (userNote.userId != userLabel.userId) {
                throw new Error('No such label found.');
            }
            if (userLabel) {
                let putlabel = await userNote.updateOne({ label: userLabel });
                if (putlabel) {
                    return {
                        message: 'Label has been added to your note.',
                        success: true
                    };
                } else {
                    return {
                        message: 'Note id not found. Unable to put label.',
                        success: false
        
               }   }   }   
                
            
        }
        
    }

 }

module.exports = notereslovers;