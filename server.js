const PORT = process.env.PORT || 4200;

const express = require('express');
const app = new express();

app.use(express.static(`${__dirname}/dist/sistema-controle-financeiro`));

app.get('/**',(req,resp) => {
    resp.sendFile(`${__dirname}/dist/sistema-controle-financeiro/index.html`);
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT} - Sistema Controle Financeiro`);
});