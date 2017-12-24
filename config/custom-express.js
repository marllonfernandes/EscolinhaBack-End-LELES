var express          = require('express'),
    consign          = require('consign'),
    bodyParser       = require('body-parser'),
    expressValidator = require('express-validator'),
    morgan           = require('morgan'),
    mongoose         = require('mongoose'),
    expressValidator = require('express-validator'),
    config           = require('../models/config');
    
module.exports = function() {
    var app = express();
    var router = express.Router();   
    
    //aqui iremos conectar a base de dados
    mongoose.connect(config.database);

    //variável de ambiente que criamos no arquivo 'config'
    app.set('secret-escolinhaLeles', config.configName); 

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(expressValidator());    
    app.use(morgan('dev'));
    
    // aplicar as rotas para a nossa aplicação com o prefixo: /api:
    app.use('/api',router);

    consign()
    .include('models')
    .then('controllers/liberauso.js') // essa rota eu nao preciso autenticar
    .then('controllers/auth.js') // pode escolher qual arquivo vai carregar primeiro, isso pq o consign carrega por odem alfabetica
    .then('controllers')
    .into(app,router);

    return app;
}