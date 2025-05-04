import express from "express"

const app=express()

app.use (express.json())

const PORT= process.env.port||4000;

app.listen(PORT, ()=>{
    console.log(`App running on port ${PORT}`)
})