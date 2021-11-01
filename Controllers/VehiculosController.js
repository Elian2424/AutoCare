
const isAuthenticated = require("../middleware/isAuthenticated");
const Vehiculo = require("../Models/Vehiculo");


exports.GetList = (req,res,next) =>{
    
    Vehiculo.findAll().then(result =>{
        const vehiculo = result.map((result) => result.dataValues);
        res.render("Vehiculos/ListVe", {
            pageTitle: "J&J AutoCare Vehicules - Admin",
            Vehiculo: vehiculo,
            count: vehiculo.length > 0,
    
        })

    }).catch(err =>{
        console.log(err);
    });
    
};

exports.GetCreateVe =(req,res,next) =>{
    res.render("Vehiculos/CreateVe",{
        pageTitle: "J&J AutoCare Vehiculos - Admin",
    })
}

exports.PostCar =(req,res,next) =>{
    const marca = req.body.Marca;
    const Modelo = req.body.Modelo
    const Año = req.body.Año;
    const Precio = req.body.Precio;
    const imagen1 = req.file;
   

    Vehiculo.create({
        Marca: marca,
        Modelo: Modelo,
        Año:  Año,
        Precio: Precio,
        Image1: "/" + imagen1.path,
        
    }).then(result =>{
        res.redirect("/Vehicules/ListVe");
    }).catch(err => {
        console.log(err);
    });

}

exports.GetEdit =(req,res,next) =>{
    const edit = req.query.edit;
    const carId = req.params.carId;

    Vehiculo.findOne({
        where:{
            Id:carId
        }
    }).then(result =>{
        const car = result.dataValues;
        res.render("Vehiculos/CreateVe",{
            pageTitle: "J&J AutoCare Vehiculos - Admin",
            EditMode: edit,
            Vehicule: car

        })
    }).catch(err => {
        console.log(err);
    });
}

exports.PostEdit = (req,res,next) =>{
    const marca = req.body.Marca;
    const Modelo = req.body.Modelo
    const Año = req.body.Año;
    const Precio = req.body.Precio;
    const imagen1 = req.file;

    const carId = req.body.carId;
    Vehiculo.update({
        Marca: marca,
        Modelo: Modelo,
        Año: Año,
        Precio: Precio,
        Imagen1: "/" + imagen1.path,

    },{
        where:{
            Id:carId
        }
    }).then(result =>{
        return res.redirect("/Vehicules/ListVe");
    }).catch(err => {
        console.log(err);
    });

}



exports.PostDelete = (req, res, next) => {
    const carId = req.body.carId;
    


    Vehiculo.findOne({
        where:{
            Id:carId
        }
    }).then(result => {
        const car = result.dataValues;

        
        
        Vehiculo.destroy({
            where:{
                Id: carId
            }
        }).then(result => {
            return res.redirect("/Vehicules/ListVe");
        }).catch(err => {
            console.log(err);
            
        });
      


        
    }).catch(err =>{
        console.log(err);
    })
}