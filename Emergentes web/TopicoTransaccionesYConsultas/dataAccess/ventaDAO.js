const db = require("../config/db");

class VentaDAO {
    constructor() { }

    async insertarVenta(venta) {
        const insertQuery = 'INSERT INTO Venta(total, iva) VALUES (?, ?)';
        const values = [venta.total, venta.iva];

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

    async seleccionarVentas() {
        const selectQuery = 'SELECT * FROM Venta';

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

    async seleccionarVentaPorID(id) {
        const selectQuery = 'SELECT * FROM Venta WHERE id=?';

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

    async editarVenta(id, venta) {
        const updateQuery = 'UPDATE Venta SET total=?, iva=? WHERE id=?';
        const values = [venta.total, venta.iva, id];

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

module.exports = new VentaDAO();