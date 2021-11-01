
const path = require("path");
const  express = require("express");
const expressHbs = require("express-handlebars");
const multer = require("multer");
const session =  require("express-session");
const bcrypt = require("bcryptjs");
const {v4: uuidv4} = require("uuid");

/*Impplementando las rutas */
const homerouter = require("./Routes/Home");
const adminrouter = require("./Routes/Admin");
const empleadorouter = require("./Routes/Empleado");
const serviciorouter = require("./Routes/Servicios");
const vehiculorouter = require("./Routes/Vehiculos");

/*Implementando los modelos 
const Admin = require("./Models/Admin");
const Empleado = require("./Models/Empleado");
const Factura = require("./Models/Factura");
const Servicio = require("./Models/Servicio");
const vehiculo = require("./Models/Vehiculo");
*/


/* Implementando la base de datos*/ 
const sequelize = require("./Util/database");

/*Error Controller */
const ErrorController = require("./Controllers/ErrorController");

const app = express();



/*Implementando el Motor de Vista de la aplicacion*/
app.engine("hbs", expressHbs({
    
    layoutsDir: "Views/Layout/",
    defaultLayout: "main-layout",
    extname: "hbs",
}));
app.set("view engine", "hbs");
app.set("Views", "views");


/* */
app.use(express.urlencoded({
    extended: false
}));



/*Configuracion de Archivos de Imagenes*/
const fileStorage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,"Images")
    },
    filename: (req,file,cb)=>{
        cb(null,uuidv4() + "-"+ file.originalname) 
    }
});
app.use(multer({storage: fileStorage }).single("imagen"));

app.use(express.static(path.join(__dirname, "Public")));
app.use("/Images",express.static(path.join(__dirname, "Images")));



/*Creando Session */
app.use(session({secret: "AutoCare",resave: true, saveUninitialized: false}));


/*Llamando el Correo De la Session Actual */
app.use((req,res,next)=>{

    
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.correo = req.session.correo;
    next();
});



app.use(homerouter);
app.use("/Admin", adminrouter);
app.use("/Services", serviciorouter);
app.use("/Vehicules", vehiculorouter);
app.use("/Employer", empleadorouter);

app.use(ErrorController.Get404);
/*LLamando Sequelize */
sequelize.sync(/*{force: true}*/).then(result => {
    app.listen(5001);


}).catch(err => {
    console.log(err);
});




