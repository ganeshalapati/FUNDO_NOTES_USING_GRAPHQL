const labelModel = require('../../models/lable.model')
 const Apolloerror = require('apollo-server-errors')

 const labelresolvers = {

    Query:{
        getLabel : async () =>{
            const lables = await labelModel.find()
            return lables
        }
    },
    Mutation:{
        createLabel: async (_,{path},context) =>{
            const checkNote = await labelModel.findOne({noteId: path.noteID})
            if(checkNote){
                return new Apolloerror.UserInputError('note is already exist ')
            }
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
            return ({
                labelName: path.labelName
            })
        },
        deleteLabel: async(_,args)=>{

            const { id } = args
    
            await labelModel.findByIdAndDelete(id)
    
            return 'Label deleted successfully'
 
        },
        editLabel: async(_,args)=>{

            const {id} =args

           const {labelname} =args.path

           const label = await labelModel.findByIdAndUpdate(id,{labelname},{new :true})

           return label
            
               
        },
        // AddLabel:async(_,{path},context)=>{
        //     const checkNote = await labelModel.findOne({noteId: path.noteID})
        //     if(!checkNote){
        //         return new Apolloerror.UserInputError('note is not exist ')}
        //     const checkinglabel = await labelModel.findOne({labelName:path.labelname})
        //     if(checkinglabel){
        //         checkinglabel.noteId.push(path.noteID)
        //         await checkinglabel.save();
        //         return 'note added succesfully'
                    
               
           
        


       
    

    }

 }
 module.exports = labelresolvers;