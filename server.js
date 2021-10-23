const express = require('express');
const { ApolloServer} = require('apollo-server-express')
const dbConfig =  require('./config/database.config')
const Schema = require('././app/schema/index')
const graphqlresolver =require('././app/resolver/index')
const dotenv = require('dotenv').config()

dbConfig.dbConnection();

async function startserver(){  

const app = express()
//working of graphql 
const apolloserver = new ApolloServer({
    typeDefs:Schema,
    resolvers:graphqlresolver,
})
await apolloserver.start();
apolloserver.applyMiddleware({app , path:"/graphql"})

app.listen(process.env.PORT,()=>{
    console.log("server is running on PORT 2000")})

}

 
startserver()
 