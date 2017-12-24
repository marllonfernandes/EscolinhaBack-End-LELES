var app = require('./config/custom-express')();

app.listen(3000,function() {
    console.log('Servidor rodando porta 3000');
});

