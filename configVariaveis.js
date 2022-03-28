require('dotenv').config();

const fs = require('fs');

const environmentFile = `export const environment = {
    production: true,
    apiURL: ${process.env.API_URL}
};`;

console.log("Configurando a variável do endereço da API de back-end");

fs.writeFileSync('./src/environments/environment.prod.ts',environmentFile,
    err => {
        console.log(err);
    }
);

console.log("Configuração de variável realizada com sucesso!");