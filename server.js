const express = require('express');
const mysql = require('mysql');
const path = require('path');



const app = express();
const port = 4000;

// Configuração do MySQL
const db = mysql.createConnection({
    host: '10.44.14.232',
    user: 'remoto_user',
    password: 'Cevs#1480',
    database: 'bancoCDCT',
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conectado ao banco de dados');
    }
});

// Configuração do Express para lidar com dados JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do Express para servir arquivos estáticos
app.use(express.static('public'));

// Rota para renderizar a página HTML
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/home.html'));
});

// Rota para renderizar a página de resultados HTML
app.get('/resultados.html', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/resultados.html'));
});



// Rota para pesquisa
app.post('/pesquisa', async (req, res) => {

    try {

        const { ano, patogeno, tabela, n_interno } = req.body;

        console.log('Received parameters:', { ano, patogeno, tabela, n_interno});

        let result;

        if (tabela && !patogeno && !ano){
            result = await searchByTable(tabela);
        } else if (patogeno && !tabela && !ano){
            result = await searchByPathogen(patogeno);
        } else if (ano && !tabela && !patogeno){
            result = await searchByYear(ano);
        } else if (!ano && !tabela && !patogeno && n_interno){
            result = await searchByCode(n_interno);
        } else if (tabela && patogeno && !ano){
            result=await searchByPathogenandTable(patogeno, tabela);
        } else if (tabela && !patogeno && ano){
            result=await searchByYearandTable(ano, tabela);
        } else if (!tabela && patogeno && ano){
            result=await searchByYearAndPathogen(ano, patogeno);
        } else if (tabela && patogeno && ano){
            result=await searchByYearPathogenandTable(ano, patogeno, tabela);
        } else {
            return res.status(400).send('Parâmetros de pesquisa inválidos');
        } 

        res.json(result);
        
    } catch (error) {
        console.error('Banco de Dados temporariamente indisponível', error);
        res.status(500).json({ error: 'Erro interno do servidor', details: error.message });
    }
});

// Consulta por ano
async function searchByYear(ano) {
    const connection = await connect();
    const sql = 'SELECT * FROM amostra WHERE ano = ?';
    console.log('Consulta SQL:', sql); // Verificar a consulta SQL gerada
    const rows = await query(connection, sql, [ano]);
    connection.end();
    return rows;
}

// Consulta por patógeno
async function searchByPathogen(patogeno) {
    const connection = await connect();
    const sql = 'SELECT * FROM amostra WHERE patogeno = ?';
    const rows = await query(connection, sql, [patogeno]);
    console.log('Consulta SQL:', sql); // Verificar a consulta SQL gerada
    connection.end();
    return rows;
}

// Consulta por tabela
async function searchByTable(tabela) {
    const connection = await connect();
    const sql = 'SELECT * FROM ' + tabela; 
    console.log('Consulta SQL:', sql); // Verificar a consulta SQL gerada // só vai aparecer se tiver uma tabela especifica
    const rows = await query(connection, sql);
    connection.end();
    return rows;
}

// Consulta por código
async function searchByCode(n_interno) {
    const connection = await connect();
    const sql = 'SELECT * FROM amostra WHERE n_interno = ?';
    const rows = await query(connection, sql, [n_interno]);
    console.log('Consulta SQL:', sql); // Verificar a consulta SQL gerada
    connection.end();
    return rows;
}

async function searchByYearAndPathogen(ano, patogeno) {
    const connection = await connect();
    const sql = 'SELECT * FROM amostra WHERE ano= ? && patogeno = ?';
    const rows = await query(connection, sql, [ano, patogeno]);
    console.log('Consulta SQL:', sql); // Verificar a consulta SQL gerada
    connection.end();
    return rows;
}

async function searchByYearandTable(ano, tabela) {
    const connection = await connect();
    const sql = 'SELECT * FROM ' + tabela + ' WHERE ano = ?';
    const rows = await query(connection, sql, [ano, tabela]);
    console.log('Consulta SQL:', sql); // Verificar a consulta SQL gerada
    connection.end();
    return rows;
}

async function searchByPathogenandTable(patogeno, tabela) {
    const connection = await connect();
    const sql = 'SELECT * FROM ' + tabela + ' WHERE patogeno = ?';
    const rows = await query(connection, sql, [patogeno, tabela]);
    console.log('Consulta SQL:', sql); // Verificar a consulta SQL gerada
    connection.end();
    return rows;
}

async function searchByYearPathogenandTable(ano, patogeno, tabela) {
    const connection = await connect();
    const sql = 'SELECT * FROM ' + tabela + ' WHERE ano = ? AND patogeno = ?';
    const rows = await query(connection, sql, [ano, patogeno, tabela]);
    console.log('Consulta SQL:', sql); // Verificar a consulta SQL gerada
    connection.end();
    return rows;
}



// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

// Função para conectar ao banco de dados
function connect() {
    return new Promise((resolve, reject) => {
        const connection = mysql.createConnection({
            host: '10.44.14.232',
            user: 'remoto_user',
            password: 'Cevs#1480',
            database: 'bancoCDCT',
        });

        connection.connect((err) => {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
            }
        });
    });
}

// Função para executar uma consulta SQL
function query(connection, sql, values) {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
}


