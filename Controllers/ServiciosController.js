const Servicio = require("../Models/Servicio");


exports.GetListSer = (req,res,next) =>{

    Servicio.findAll().then(result =>{
        const Servicios = result.map((result)=> result.dataValues);

        res.render("Servicios/ListSer",{
            pageTitle:"Services List - Admin",
            servicio: Servicios,
            count: Servicios.length >0,
        })
    }).catch(err =>{
        console.log(err);
    })
}

exports.GetCreate = (req,res,next) =>{
    res.render("Servicios/CreateSer",{
        pageTitle:"Create New Services  - Admin",
    })
}

exports.PostService = (req,res,next) =>{
    const descripcion = req.body.Descripcion;
    const precio = req.body.Precio;

    Servicio.create({
        Descripcion: descripcion,
        Precio:precio
    }).then(result =>{
        res.redirect("/Services/ListSer");
    }).catch(err => {
        console.log(err);
      });
}

exports.GetEdit = (req,res,next) =>{
    const id = req.params.servicioId;
    const edit = req.query.edit;

    Servicio.findOne({
        where:{
            Id:id
        }
    }).then(result =>{
        const Servicio = result.dataValues;
        res.render("Servicios/CreateSer",{
            pageTitle:"Modify Services",
            EditMode: edit,
            Descripcion: Servicio.Descripcion,
            Precio: Servicio.Precio,
            Id: Servicio.Id
        })
    }).catch((err) => {
        console.log(err);
      });
}

exports.PostEdit = (req, res, next) => {
    const descripcion = req.body.Descripcion;
    const precio = req.body.Precio;
    const servicioId = req.body.servicioId;
    Servicio.update({
        Descripcion: descripcion,
        Precio: precio,
        Id: servicioId,
    }, {
        where: {
            Id: servicioId
        }
    }).then().then(result => {
        res.redirect("/Services/ListSer");
    }).catch(err => {
        console.log(err);
    });
}
exports.PostDelete = (req,res,next)=>{
    const servicioId = req.body.servicioId;

    Servicio.destroy({
        where:{
            Id:servicioId
        }
    }).then(result=>{
        res.redirect("/Services/ListSer")

       
    }).catch(err =>{
        console.log(err);
    })
}