const express = require('express');
const Productos = require ('../desafio-2/Productos.js')

const app = express();
const msg = new Productos();

app.get('/', (req, res)=>{
    res.send(msg.generarPlantillaMsg(3, "img", "art","price"))
});

const PORT = 8080;
const server = app.listen (PORT, ()=>{
    console.log(`Server on http://localhost:${PORT}/`)
})