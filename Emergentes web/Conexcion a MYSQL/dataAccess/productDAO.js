const db=require('../config/db')

class ProductDAO{
    constructor(){}

  //Insertar un nuevo producto en nuestra base de datos
  insertProduct(product, callback){
    const insertQuery = `INSERT INTO products(name, price, description) VALUES ('${product.name}', ${product.price}, '${product.description}')`;

    db.query(insertQuery, (err, result) =>{
        if(err){
            callback(err);
        }else{
            callback(nuresult);
        }
    })

}
}
module.exports= new ProductDAO();