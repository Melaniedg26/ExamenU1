const db = require("../config/db");

class ProductoVentaDAO {
    constructor() { }

    async insertarProductoVenta(productoVenta) {
        const insertQuery = 'INSERT INTO ProductoVenta(idVenta, idProducto, cantidadVendida, subtotal, precioVenta) VALUES (?, ?, ?, ?, ?)';
        const values = [productoVenta.idVenta, productoVenta.idProducto, productoVenta.cantidadVendida, productoVenta.subtotal, productoVenta.precioVenta];

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

    async seleccionarProductoVentaPorID(id) {
        const selectQuery = 'SELECT * FROM ProductoVenta WHERE id=?';

        return await new Promise((resolve, reject) => {
            db.query(selectQuery, [id], (err, result, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result, fields)
                }
            })
        })
    }

    async seleccionarProductoVentaPorVenta(idVenta) {
        const selectQuery = 'SELECT * FROM ProductoVenta WHERE idVenta=?';

        return await new Promise((resolve, reject) => {
            db.query(selectQuery, [idVenta], (err, result, fields) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(result, fields)
                }
            })
        })
    }
}

module.exports = new ProductoVentaDAO();