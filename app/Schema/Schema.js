const {buildSchema} = require('graphql')

module.exports = buildSchema(` 
       type Event {
           _id:ID!
           firstName:String!
           lastName:String!
           email:String!
           Address : String!
       }
       type User{
           _id:ID!
           email:String!
           password: String
       }
       type AuthData{
           userId:ID!
           token: String!
           tokenExpiration: Int!
       }
        
       input EventInput {
           _id:ID!
           firstName:String!
           lastName:String!
           email:String!
           Address : String!
        }
        input UserInput{
            email:String!
            password:String!
        }
      
   type RootQuery{
       events : [Event!]!
       login(email:String!,password:String!):AuthData!
    }
    type RootMutation {
       createUser(eventInput: EventInput): Event
       loginuser(userInput :UserInput): User
  
    }
       schema{
           query: RootQuery
           mutation: RootMutation
       }
   `);
