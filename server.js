const express = require('express');
const { ApolloServer} = require('apollo-server-express')
const dbConfig =  require('./config/database.config')
const Schema = require('././app/schema/index')
const graphqlresolver =require('././app/resolver/index')


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

app.listen(2000,()=>{
    console.log("server is runnig 2000")})

}
 
startserver()
