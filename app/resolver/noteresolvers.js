const Note  =  require('../../models/model.note')

const userModel = require('../../models/usermodel')
const labelModel = require('../../models/lable.model')
const checkAuth = require('../../utilities/auth')
const ApolloError = require('apollo-server-errors')




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
        createnote: async(_,{post},context)=>{

            if(!context.id){
                
                return new ApolloError.AuthenticationError('UnAuthenticated');

            }
            const notes = new Note({
                title: post.title,
                description: post.description,
                userId: context.id,

                
            })
            const existingUser = await userModel.findOne({ email: post.email });
            if(existingUser){
                return 'user id already EXIST'
            }
            await notes.save();
            return notes
 
         },

         editnote: async(parent,args,context,info)=>{
            if(!context.id){
                return new ApolloError.AuthenticationError('UnAuthenticated');

            }

             const {id} =args

            const {title, description} =args.post

            const note = await Note.findByIdAndUpdate(id,{title,description},{new :true})

            return note
         },

        deletenote: async(parent,args,context,info)=>{
            if(!context.id){
                return new ApolloError.AuthenticationError('UnAuthenticated');

            }

        const { id } = args

        await Note.findByIdAndDelete(id)

        return 'notes is deleted sucessfully'

        },
        addLabelToNote: async (_,params,context) =>{
            if(!context.id){
                return new ApolloError.AuthenticationError('UnAuthenticated');

            }
            //find labelID from noteModel Schema
        const id = await Note.find({ labelID: params.label_ID })

        if (id.length > 0) {
            return { "message": "This label is not present in notes" }
        }
        const note = await Note.findOneAndUpdate({ _id: params.noteID },
            {
                $addToSet:{
                    labelID: params.label_ID
                }

            })

            return "added label to the note"
            
        },
        deleteLabelToNote: async (_,params,context) =>{
            if(!context.id){
                return new ApolloError.AuthenticationError('UnAuthenticated');

            }
            //find labelID from noteModel Schema
        const id = await Note.find({ labelID: params.label_ID })

        if (!id.length > 0) {
            return { "message": "This label is not present in notes" }
        }
        const note = await Note.findOneAndUpdate({ _id: params.noteID },
            {
                $pull: {
                    labelID: params.label_ID
                }

            })

            return "deleted label from the note"


            
        }
            



        
                  
            
        
                
        
    }

 }

module.exports = notereslovers;