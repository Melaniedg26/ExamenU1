const db=require('../config/db')

class productPromiseDAO{
    constructor(){};
    insertProduct(product){
        const insertQuery = `INSERT INTO products(name, price, description) VALUES ('${product.name}', ${product.price}, '${product.description}')`;
        return new Promise((resolve,reject)=>{
            db.query(insertQuery,(err,result)=>{
                if(err){
                    reject(err)
                }else{
                    resolve(result)
                }
            })
        })
    }

    
}