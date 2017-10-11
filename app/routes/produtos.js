module.exports = function(app){

    /**
     * Lista os produtos
     */
    app.get('/produtos', function(request, response, next){

        var connection = app.database.connection();
		var produtosDAO = new app.database.ProdutosDAO(connection);

        produtosDAO.listar(function(error, result){

            if (error) {
                return next(error);
            }
//            response.send(result);
            response.render('produtos', {produtos: result});
        });

        connection.end();
    });

    /**
     * Adiciona um novo produto
     */
    app.post('/produtos', function(request, response, next){
        
        var connection = app.database.connection();
		var produtosDAO = new app.database.ProdutosDAO(connection);
        var produto = request.body;
        
        request.assert('nome', 'O título deve ser preenchido').notEmpty();
        request.assert('preco', 'Formato inválido').isFloat();
        
        var erros = request.validationErrors();
        
        if (erros) {
            response.status(400).render('produtos', {errosValidacao: erros, produto: produto});
        }
        
        produtosDAO.salvar(produto, function(error, result){
            response.redirect('/produtos');
        });
        
        connection.end();        
    });
    
    /**
     * Altera um produto
     */
    app.put('/produtos', function(request, response, next){
        
        var connection = app.database.connectionFactory();
		var produtosDAO = new app.database.ProdutosDAO(connection);
        
        connection.end();        
    });
    
    /**
     * Deleta um produto
     */
    app.delete('/produtos', function(request, response, next){
        
        var connection = app.database.connectionFactory();
		var produtosDAO = new app.database.ProdutosDAO(connection);
        
        connection.end();        
    });
}