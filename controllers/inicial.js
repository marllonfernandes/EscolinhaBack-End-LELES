module.exports = function(app) {
    
    app.get('/',function(req,res) {
        res.status(200).send('Serviço no ar!');
    })
    
}