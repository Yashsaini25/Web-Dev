import express from "express"

const app=express()
app.use(express.json())
const port=3004

let teaData=[]
let nextId=1

app.post('/teas', (req,res) => {
    const {name, price}=req.body
    const newTea={id:nextId++, name, price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get("/", (req, res) => {
    res.send("Welcome to the Tea API")
})

app.get("/teas", (req, res) => {
    res.status(200).send(teaData)
})

app.get("/teas/:id", (req,res) => {
    const tea=teaData.find(t => t.id===parseInt(req.params.id))
    if(!tea)
        res.status(404).send("Tea not found")
    else res.status(200).send(tea)
})

app.put("/teas/:id", (req, res) => {
    const tea=teaData.find(t => t.id===parseInt(req.params.id))
    if(!tea)
        res.status(404).send("Tea not found")
    
    else{
        const {name, price}=req.body
        tea.name=name
        tea.price=price
        res.status(200).send("Tea updated successfully")
    }
})

app.delete("/teas/:id", (req,res) => {
    const index=teaData.findIndex(t => t.id===parseInt(req.params.id))
    if(index==-1)
        res.status(404).send("Tea not found")
    else{
        teaData.splice(index, 1)
        res.status(200).send("Tea deleted successfully")
    }
})

app.listen(port, () => {
    console.log(`Server is listening at the port: ${port}`)
})