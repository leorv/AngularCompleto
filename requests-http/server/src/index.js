const express = require('express');
// const cors = require('cors');
const bodyParser = require('body-parser');
const multipart = require('connect-multiparty');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const corsOptions = {
//     // Se você estiver usando o node, com microserviços, geralmente a gente especifica a origin, 
//     // se você souber o domínio que vai acessar. Como aqui é desenvolvimento, vamos deixar liberado.
//     origin: '*',
//     optionsSuccessStatus: 200
// };
//
// app.use(cors(corsOptions));

const multipartMiddleware = multipart({
    uploadDir: './uploads'
})
app.post('/upload', multipartMiddleware, (req, res) => {
    const files = req.files;
    console.log('POST: dentro do server.', files);
    res.json({
        message: files
    });
});

app.get('/downloadExcel', (req, res) => {
    res.download('./uploads/planilha.xls');
});

app.get('/downloadPDF', (req, res) => {
    res.download('./uploads/projeto.pdf');
});

app.use((err, req, res, next) => res.json({error: err.message}));


app.listen(8000, () => {
    console.log('Servidor porta 8000');
});