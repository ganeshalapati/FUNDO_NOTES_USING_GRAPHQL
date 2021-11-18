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

            const labelmodel = new labelModel({

                noteId: path.noteID,
                labelName:path.labelName,
                
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
       
           
        


       
    

    }

 }
 module.exports = labelresolvers;