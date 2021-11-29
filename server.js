const express          =  require('express');
const { ApolloServer}  =  require('apollo-server-express')
const dbConfig         =  require('./Config/database.config')
const Schema           =  require('././app/schema/index')
const graphqlresolver  =  require('././app/resolver/index')
const auth             =  require('./utilities/auth')
const redis =require('./config/redis')

dbConfig.dbConnection();

require('dotenv').config();

async function startserver(){ 
     
const app = express()

//working of graphql 

const apolloserver = new ApolloServer({

    typeDefs:Schema,
    resolvers:graphqlresolver,
    context:auth
   
    //context: Auth
})
await apolloserver.start();
apolloserver.applyMiddleware({app , path:"/graphql"})

// listening to the port 
 
app.listen(process.env.PORT,()=>{

    console.log("server is running on PORT 2000")})
}

 
startserver()