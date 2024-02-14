const db = require('./config/db');
const productDAO = require('./dataAccess/productDAO');

//Conectandonos a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos');
        return;
    }
    console.log('Conexion exitosa a la base de datos');

    productDAO.insertProduct(newProduct,(err, result)=>{
      if(err){
        console.error(`error al insertar producto`,err)
    }else{
      console.log(`producto insertado con exito`,result)
    }
    })

    //Cierra la conexion a la base de datos
    db.end((err) => {
        if (err) {
            console.error('Error al desconectar de la base de datos', err)
        } else {
            console.log('Desconexion de la base de datos exitosa')
        }
    })
})

