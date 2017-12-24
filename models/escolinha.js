var mongoose = require('mongoose');

// SCHEMA ESCOLA
var escolaSchema = mongoose.Schema({
        token: String,
        enderecohospeda: String,
        mensalidade: Number,
        vigencia: Date,
        escolas: [{
                codEscola: String,
                nomeEscola: String,
                criacao: Date
        }],
        alunos: [{
                nome: String,
                telefone: String,
                nascimento: Date,
                endereco: String,
                RG: String,
                avatar: String
        }]
});

// MODEL ESCOLA
exports.Escola = mongoose.model('Escola',escolaSchema);