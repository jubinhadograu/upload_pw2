const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//CONFIGURAÇÃO DE STORAGE
const storage = multer.diskStorage(
    {
        destination:(req, file, cb)=>{
            cb(null, './uploads')
        },
        filename:(req, file, cb)=>{
            cb(null, Date.now().toString() + '_' + file.originalname)
        }
    }
);

//CONFIGURAÇÃO DE FILTER

app.listen(3000, ()=>{
    console.log('SERVIDOR RODANDO EM http://localhost:3000')
});