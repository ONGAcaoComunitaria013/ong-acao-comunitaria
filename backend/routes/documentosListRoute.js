const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const uploadsDir = path.join(__dirname, '..', 'uploads');

router.get('/lista', (req, res) => {
  fs.readdir(uploadsDir, (err, files) => {
    if (err) {
      return res.status(500).send('Erro ao listar arquivos.');
    }

    // Filtrar PDFs, mas se quiser todos os arquivos só comenta essa linha
    const pdfFiles = files.filter(file => file.endsWith('.pdf'));

    let html = `
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>Documentos da ONG</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background: #f5f5f5;
        padding: 20px;
        max-width: 600px;
        margin: auto;
      }
      h1 {
        color: #004080;
      }
      ul {
        list-style-type: none;
        padding: 0;
      }
      li {
        background: #fff;
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      a {
        text-decoration: none;
        color: #d40000;
        font-weight: bold;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <h1>📄 Documentos disponíveis</h1>
    <ul>
`;

pdfFiles.forEach(file => {
  html += `<li><a href="/uploads/${file}" target="_blank">${file}</a></li>`;
});

html += `
    </ul>
  </body>
  </html>
`;

res.send(html);


    res.send(html);
  });
});

module.exports = router;
