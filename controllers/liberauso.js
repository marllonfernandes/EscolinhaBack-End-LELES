var jwt = require('jsonwebtoken');

module.exports = function (app,router) {

    // lista liberacao de usos
    router.get('/liberauso', function (req, res) {

        var db = app.models.escolinha;

        db.Escola.find({}, function (error, liberausos) {
            if (error) {
                res.status(500).json(error);
            } else {
                res.status(200).json(liberausos);
            }

        });

    })

    // cria liberacao de uso
    router.post('/liberauso', function (req, res) {

        req.assert("enderecohospeda","Endereço de Hospedagem obrigatório!").notEmpty();

        var erros = req.validationErrors();

        if (erros) {
            res.status(500).send(erros);
            return 
        }else{
            var db = app.models.escolinha;
            var addDias = 30;
            var dtVig = getData(addDias).data;

            var objetoJson = {
                // token: req.body.token,
                enderecohospeda: req.body.enderecohospeda,
                mensalidade: req.body.mensalidade,
                vigencia: dtVig
            };
            
            if ( req.body.hasOwnProperty("escolas") ) {
                objetoJson.escolas = req.body.escolas.slice();   
            }

            if ( req.body.hasOwnProperty("alunos") ) {
                objetoJson.alunos = req.body.alunos.slice();
            }
            
            // estou assinando com o nome do usuario e pegando a variavel de ambiente 'secret-escolinhaLeles'
            var token = jwt.sign(objetoJson.enderecohospeda, app.get('secret-escolinhaLeles'), {
                //expiresInMinutes: 1440 //o token irá expirar em 24 horas
                expiresIn: addDias + "d" //o token irá expirar em 30 dias
            });

            objetoJson.token = token;

            new db.Escola(objetoJson).save(function (error, liberauso) {
                if (error) {
                    res.status(400).json({ success: false, message: "Falha na liberação de uso!", object: null });
                } else {
                    res.status(201).json({ success: true, message: "Liberação de uso criado com sucesso...", object: liberauso });
                }
            });
        }
    })

}

function getData(adicionaDias){
    // Obtãm a data/hora atual
    var data = new Date();

    // Guarda cada pedaão em uma variãvel
    var dia     = data.getDate();           // 1-31
    var dia_sem = data.getDay();            // 0-6 (zero=domingo)
    var mes     = data.getMonth();          // 0-11 (zero=janeiro)
    var ano2    = data.getYear();           // 2 dãgitos
    var ano4    = data.getFullYear();       // 4 dãgitos
    var hora    = data.getHours();          // 0-23
    var min     = data.getMinutes();        // 0-59
    var seg     = data.getSeconds();        // 0-59
    var mseg    = data.getMilliseconds();   // 0-999
    var tz      = data.getTimezoneOffset(); // em minutos

    if (adicionaDias > 0) {
        var outraData = new Date();
        outraData.setDate(data.getDate() + adicionaDias);
        dia = outraData.getDate();
        mes = outraData.getMonth();
        ano4= outraData.getFullYear();
    } 
    
    if (dia < 10) {
        dia = '0' + dia
    }
    
    if ((mes+1) < 10) {
        mes = '0' + (mes+1)
    }else{
        mes =  (mes+1)
    }
    
    if (hora < 10) {
        hora = '0' + hora
    } 

    if (min < 10) {
        min = '0' + min
    } 
    
    var str_data = dia + '/' + mes + '/' + ano4;
    var str_hora = hora + ':' + min + ':' + seg;

    // Mostra o resultado
    return {data: str_data, hora: str_hora};
};