const express = require('express');
const multer = require('multer');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

/*CONFIGURAÇÃO DE STORAGE: onde e como será gravado*/
const storage = multer.diskStorage(
    {
        destination:(req, file, cb)=>{
            cb(null, './uploads');
        },
        filename:(req, file, cb)=>{
            cb(null, Date.now().toString() + '_' + file.originalname);
        }
    }
);

/*CONFIGURAÇÃO DE FILTER: filtragem de arquivos*/
const fileFilter = (req, file, cb) =>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
cb(null, true);
    } else {
        cb(null, false);
    }
}

/* UPLOAD */
const upload = multer({
    //regra de storage
    storage:storage,
    //regra de tamanho
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    //regra de filter
    fileFilter:fileFilter
});

/*ROTA DE UPLOAD DE ARQUIVO*/
app.post('/upload', upload.array('imagens_livro', 2),(req, res) =>{
    console.log(req.files);//upload dos arquivos de imagem
    console.log(req.body);//upload dos arquivos de texto
    res.send('OK!🤓');
});

app.listen(3000, ()=>{
    console.log('SERVIDOR RODANDO EM http://localhost:3000')
});