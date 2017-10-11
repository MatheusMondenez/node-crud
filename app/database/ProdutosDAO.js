function ProdutosDAO(connection){
    this._connection = connection;
}

ProdutosDAO.prototype.listar = function(callback){
    this._connection.query('SELECT * FROM produtos', callback);
}

ProdutosDAO.prototype.salvar = function(produto, callback){
    this._connection.query('INSERT INTO produtos SET ?',produto, callback);
}

module.exports = function(){
    return ProdutosDAO;
}