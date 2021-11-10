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
       editLabel:async (_,{path},context) =>{

        const checkNote = await labelModel.findOne({ noteId: path.noteID });
            if (checkNote) {
                await labelModel.findByIdAndUpdate(checkLabel.id);
            }
            return ({
            newlabelname:path.newlabelname
            
            })
               
        }


       
    

    }

 }
 module.exports = labelresolvers;