const {gql} =require('apollo-server-express')


const typeDefs = gql`
 
type Users{
    id:ID
    firstName:String
    lastName:String
    email:String
    password:String
}
type Authuser{
    userId:ID
    firstName:String
    lastName:String
    email:String
    token:String
    tokenExpiration: Int!
}
type Forgot{
    email:String
    message:String
}
type Reset{
    email:String
    message:String
    newpassword:String
}
type Post{
    title:String
    description:String
    message:String
}
type Label{
    labelname:String
}
 
input userInput{
    firstName:String
    lastName:String
    email:String
    password:String
} 

type GetLabels{
    _id:ID
    userId:String
    noteId:[String]
    labelName:String
}
input loginUser{
    email:String
    password:String
}
input forgotPassword{
    email:String
}
input resetPassword{
    email:String
    Code:String
    newpassword:String
}
input postInput{
    title:String
    description:String
}
input LabelInput{
    noteID:ID
    labelName:String
}
input addLabelInput{
    noteID:ID
    labelID:ID
}
input editLabel
    {
        noteID:ID
        labelName:String
        newLabelName:String
    }
input deleteLabel{
    noteID:ID
    labelname:String
}
type Label {
    id: ID!
    labelName: String!
    userId: String!
}


type Query {
    users:[Users]
    getAllnotes:[Post]
    getnotes(id:ID):Post
    getLabel:[GetLabels]
}
type Mutation{
    createuser(path:userInput):Users
    loginuser(path:loginUser):Authuser
    forgotpassword(path:forgotPassword):Forgot
    resetpassword(path:resetPassword):Reset
    
    createnote(post:postInput):Post
    deletenote(id:ID):String
    editnote(id:ID,post:postInput):Post
    createLabel(path:LabelInput):Label
    deleteLabel(id:ID):Label
    editLabel(path :editLabel):Label

    addLabelToNote(noteID: ID, label_ID: ID): String
    deleteLabelToNote(noteID: ID, label_ID: ID): String

} 
`
module.exports = typeDefs;