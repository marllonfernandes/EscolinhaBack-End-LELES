var jwt = require('jsonwebtoken');

module.exports = function(app) {

    // app.post('/autenticar',function(req,res) {

    //     var db = app.models.escolinha;

    //     db.LiberaUso
    //         .findOne({ endHospedagem: req.body.endHospedagem })
    //         .then(function(liberauso) {
    //             if (!liberauso) {
    //                 res.status(401).json({ success: false, message: 'Falha na autenticação liberação de uso, não encontrado!' });
    //             }else{
    //                 // estou assinando com o nome do usuario e pegando a variavel de ambiente 'secret-escolinhaLeles'
    //                 var token = jwt.sign( liberauso.endHospedagem, app.get('secret-escolinhaLeles' ), {
    //                     //expiresInMinutes: 1440 //o token irá expirar em 24 horas
    //                     expiresIn: "30d" //o token irá expirar em 30 dias
    //                 });
    //                 // mandando o token do header
    //                 res.set('authorization',token);
    //                 res.end();
    //                 // res.json({
    //                 //     success: true,
    //                 //     message: 'Token criado!!!',
    //                 //     token: token
    //                 // });
    //             }
    //         },function(error) {
    //             res.status(401).json({ success: false, message: 'Falha na autenticação liberação de uso, não encontrado!' });
    //         })
        
    // })

    // toda pagina vai ser autenticada
    // app.use vai tratar qualquer verbo http (get,put,post,delete,etc...)
    app.use('/*',function(req,res,next) {
        
        var token = req.headers['authorization'];  
        if (token) {
            jwt.verify(token,app.get('secret-escolinhaLeles'),function(err,decoded) {
                if (err) {
                    res.sendStatus(401);
                } else {
                    req.usuario = decoded;
                    next(); // significa que todos os próximos middlewares podem ser acessados
                }
            })   
        }else{
            res.sendStatus(401);
        }    
    })
}