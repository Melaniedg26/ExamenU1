const db = require('./config/db');
const Producto = require('./models/producto')
const ProductoDAO = require('./dataAccess/productoDAO');
const ProductoVentaDAO = require('./dataAccess/productoventaDAO');
const VentaDAO = require('./dataAccess/ventaDAO');
const Venta = require('./models/venta')
const ProductoVenta = require('./models/productoventa')

async function main() {
    //Conectarnos a la base de datos
    db.connect(async (err) => {
        if (err) {
            console.error('Error al conectarnos a la base de datos', err);
            return;
        }

        console.log('Conexión exitosa a la base de datos');

        try {
            // Crear tres productos
            const productos = [];
            productos.push(new Producto(null, 'Coca cola', 20, 10));
            productos.push(new Producto(null, 'Pizza', 50, 5));
            productos.push(new Producto(null, 'Helado', 10, 20));

            // Insertar los tres productos en la base de datos
            const insertPromises = productos.map(producto => ProductoDAO.insertarProducto(producto));
            const productosInsertados = await Promise.all(insertPromises);
            console.log('Productos insertados:', productosInsertados);

            // Crear una nueva venta
            const nuevaVenta = new Venta(null, 0, 0);

            // Guardar la venta en la base de datos y obtener su ID
            const ventaInsertada = await VentaDAO.insertarVenta(nuevaVenta);
            const ventaId = ventaInsertada.insertId;
            console.log('ID de la venta:', ventaId);

            // Añadir los productos a la venta y relacionarlos con la venta en la base de datos
            const productoVentaPromises = productos.map((producto, index) => {
                const subtotal = producto.precio * producto.cantidad;
                nuevaVenta.total += subtotal;
                nuevaVenta.iva += subtotal * 0.16;
                const productoVenta = new ProductoVenta(null, ventaId, productosInsertados[index].insertId, producto.cantidad, subtotal, producto.precio);
                return ProductoVentaDAO.insertarProductoVenta(productoVenta);
            });

            await Promise.all(productoVentaPromises);
            console.log('Productos relacionados con la venta correctamente');

            // Actualizar los datos de la venta en la base de datos
            await VentaDAO.editarVenta(ventaId, nuevaVenta);
            console.log('Datos de la venta actualizados correctamente');

            // Desconectar de la base de datos
            db.end((err) => {
                if (err) {
                    console.error('Error al desconectar de la base de datos:', err);
                } else {
                    console.log('Desconexión de la base de datos exitosa');
                }
            });
        } catch (error) {
            console.error('Error en el proceso principal:', error);
            // Desconectar de la base de datos en caso de error
            db.end((err) => {
                if (err) {
                    console.error('Error al desconectar de la base de datos:', err);
                } else {
                    console.log('Desconexión de la base de datos exitosa');
                }
            });
        }
    });
}

main();