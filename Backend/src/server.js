const app=require('./app')
const http=require('http');
const env=require('dotenv');
env.config({path:'./.env'})
const port=process.env.PORT;

const mongoose=require('mongoose')

mongoose.connect(process.env.DB_URL,{dbName:"Blog"})
.then(()=>{
    console.log('Db is connected');
    
})
.catch((err)=>{
    console.log('db error',err);
    
})
const server=http.createServer(app);

server.listen(port,()=>{
    console.log(`server is listening on:${port}`);
    
})

