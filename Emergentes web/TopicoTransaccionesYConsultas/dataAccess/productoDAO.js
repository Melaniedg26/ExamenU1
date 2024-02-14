const db = require("../config/db")

class ProductoDAO {
    constructor() { };

    // Inserta Producto
    async insertarProducto(producto) {
        const insertQuery = 'INSERT INTO Producto(nombre, precio, cantidad) VALUES (?, ? ,?)';
        const values = [producto.nombre, producto.precio, producto.cantidad];

        return await new Promise((resolve, reject) => {
            db.beginTransaction((err) => {
                if (err) { reject(err) }

                db.query(insertQuery, values, (err, result) => {
                    if (err) {
                        db.rollback(() => {
                            reject(err);
                        })
                    } else {
                        db.commit((err) => {
                            if (err) {
                                db.rollback(() => {
                                    reject(err);
                                })
                            } else {
                                resolve(result);
                            }
                        })
                    }
                })
            })
        })
    }

    async seleccionarProductos() {
        const selectQuery = 'SELECT * FROM producto';

        return await new Promise((resolve, reject) => {
            db.query(selectQuery, (err, result, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result, fields)
                }
            })
        })
    }

    async seleccionarProductosPorID(tabla, id) {
        const selectQuery = 'SELECT * FROM ?? WHERE id=?';

        return await new Promise((resolve, reject) => {
            db.query(selectQuery, [tabla, id], (err, result, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result, fields)
                }
            })
        })
    }

    // editar Producto
    async editarProducto(id, producto) {
        const updateQuery = 'UPDATE Producto SET nombre=?, precio=?, cantidad=? WHERE id=?';
        const values = [producto.nombre, producto.precio, producto.cantidad, id];

        const sqlObj = {
            sql: updateQuery,
            timeout: 40000,
            values: values
        }

        return await new Promise((resolve, reject) => {
            db.beginTransaction((err) => {
                if (err) { reject(err) }

                db.query(sqlObj, (err, result) => {
                    if (err) {
                        db.rollback(() => {
                            reject(err);
                        })
                    } else {
                        db.commit((err) => {
                            if (err) {
                                db.rollback(() => {
                                    reject(err);
                                })
                            } else {
                                resolve(result);
                            }
                        })
                    }
                })
            })
        })
    }


}

module.exports = new ProductoDAO();