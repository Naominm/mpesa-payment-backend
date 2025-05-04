import express from "express"

const app=express()

app.use (express.json())

const PORT= process.env.port||5000;

app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
})