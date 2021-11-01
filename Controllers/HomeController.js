const Servicio = require("../Models/Servicio");
const Vehiculo = require("../Models/Vehiculo");

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "JandJAutoCareCustomer@gmail.com",
        pass: "j&jAutoCare"
    }
});
const transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "JandJAutoCareInc@gmail.com",
        pass: "j&jAutoCare"
    }
});


exports.GetIndex = (req, res, next) => {


    res.render("Home/Index", {
        pageTitle: "J&J AutoCare Inc",
        HomeActive: true,

    });
};

exports.GetServices = (req, res, next) => {

 Servicio.findAll().then(result =>{
     const servicio = result.map((result)=> result.dataValues)


     res.render("Home/Services", {
         pageTitle: "J&J AutoCare  - Services",
         ServicesActive: true,
         Servicio: servicio,
 
     });
 }).catch(err =>{
     console.log(err);
 })
};

exports.GetVehicules = (req, res, next) => {

    Vehiculo.findAll().then(result =>{
        const vehiculo = result.map((result) => result.dataValues);
        res.render("Home/Vehicules", {
            pageTitle: "J&J AutoCare - Vehicules - Admin",
            Vehiculo: vehiculo,
            count: vehiculo.length > 0,
    
        })

    }).catch(err =>{
        console.log(err);
    });
    
};

exports.GetAbout = (req, res, next) => {


    res.render("Home/About", {
        pageTitle: "J&J AutoCare  - About",
        AboutActive: true,

    });
};
exports.GetExample = (req, res, next) => {


    res.render("Home/PageNotAviable", {
        pageTitle: "J&J AutoCare - Page Not Aviable",
        

    });
};


exports.PostRequestService = (req,res,next) =>{
    const nombre = req.body.nombre;
    const apellido  = req.body.apellido;
    const service = req.body.servicio;
    const correo = req.body.correo;
    const descripcion = req.body.descripcion;
    

    if(nombre ===""|| apellido ==="" || service===""|| correo===""|| descripcion===""){
        res.render("Home/Services", {
            pageTitle: "J&J AutoCare - Services",
            Nombre: nombre,
            Apellido: apellido,
            Correo: correo,
            Service: service,
            Descripcion: descripcion,
            Message: "*this field is obligatory*",
            MessageT: "*You Must Accept Our Terms and Conditions*"
        });
    }else{
        transporter2.sendMail({
            from: "JandJAutoCareInc@gmail.com",
            to: `${correo} `,
            subject: `${nombre} ${apellido}`,
            html: `<div style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#ffffff;color:#333232;height:100%;line-height:1.4;margin:0;padding:0;width:100%!important">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#edf2f7;margin:0;padding:0;width:100%"><tbody><tr>
            <td align="center" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:0;padding:0;width:100%">
            <tbody><tr>
            <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';padding:25px 0;text-align:center">
            <a href="http://wwww.jandjautocareinc.com/" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#ffffff;font-size:19px;font-weight:bold;text-decoration:none;display:inline-block" target="_blank" data-saferedirecturl="https://www.google.com/url?hl=es-419&amp;q=http://url7910.slashdev.io/ls/click?upn%3DH-2FjuPtbTukczt-2F8UoxWmV83dfGPfKuUvAbGd8Sh3fWo-3DzJY5_UuOo57ogDvRZE8Jw1AL-2BScOq9P3pu2-2FF8Cusb0AFeNKqX924fnBJXcSUIA4K0ZgNYm-2FbjY77cOymk2XCqI-2FtYDcWylmwzX0kxX9AZBwttMmQqyRz-2FAOEacLqGCa6w38RX-2FvsgVhDUvS41E0bwX2gfk78-2FRnzBX5eLN4Ylnk3Y4DgmCmMRVAGVWrC2aih5JgAKkC7qhSvSqqVjH7Q2UuyQA-3D-3D&amp;source=gmail&amp;ust=1635690601030000&amp;usg=AFQjCNHI7m3SaUJdEZsLK69eWNvaydyueA">
            <img src="https://scontent-lga3-1.xx.fbcdn.net/v/t39.30808-6/250092564_100904569071079_6352569799622308655_n.jpg?_nc_cat=103&_nc_rgb565=1&ccb=1-5&_nc_sid=730e14&_nc_ohc=7O3Dfe0MLIgAX_B8Lia&_nc_ht=scontent-lga3-1.xx&oh=6759b39a9d704cffb1d4134dd0819e5d&oe=6182D266" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';max-width:100%;border:none"></a>
            </td>
            </tr>
            <tr>
            <td width="100%" cellpadding="0" cellspacing="0" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#edf2f7;border-bottom:1px solid #edf2f7;border-top:1px solid #edf2f7;margin:0;padding:0;width:100%">
            <table class="m_8557350916016440749inner-body" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';background-color:#ffffff;border-color:#e8e5ef;border-radius:2px;border-width:1px;margin:0 auto;padding:0;width:570px">
            <tbody><tr>
            <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';max-width:100vw;padding:32px">
            <h1 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:18px;font-weight:bold;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Hi, ${nombre} ${apellido}</font></font></h1>
            <h2 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Thank you for taking the time to request a service with us. </font><font style="vertical-align: inherit;"> You will be attended as soon as possible.</font></font></h2>
            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">You request for a <font style="vertical-align: inherit;"> ${service} </font></font><font style="vertical-align: inherit;">You will get a  feedback to <font style="vertical-align: inherit;">${correo} </font></font></font></p>
            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Otherwise, you can contact us directly at <a href="tel:13479321440">347-9321-440</a>!</font></font></p>
            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Have a Good Day, </font></font><br><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">
            J &amp; J AutoCare - Asistant.</font></font></p>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr>
            <tr>
            <td style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol'">
            <table class="m_8557350916016440749footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';margin:0 auto;padding:0;text-align:center;width:570px"><tbody><tr>
            <td align="center" style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';max-width:100vw;padding:32px">
            <p style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';line-height:1.5em;margin-top:0;color:#b0adc5;font-size:12px;text-align:center"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">© 2021 J&J AutoCare Inc.</font></font></p>
            </td>
            </tr></tbody></table>
            </td>
            </tr>
            </tbody></table>
            </td>
            </tr></tbody></table>
            <img src="https://ci6.googleusercontent.com/proxy/8qG0s87KX_c444mYjOHamFNEzsYztVLeHXmWk9oNLHRmzspvC9Oq1gP1UWISiMj84BVQRPUHl2oNzUSW1_oc-ZlI7yLpWKjQqoWZeplH9M9WMzeRh5aj5iK3FnShpuq6GqAEu6PODK_uOK-n0bewAD5IaM7bjvqqgoKepFcBIiAXx2IIatY_7DDCjtKiEbjH2-r6lar3CgDZJaQ4OVlv5SVU89rh-9xQ8pl8XqD0D0Lwyr1E4Hr6tslmJUfcsH4jJZr2eXPHTKUaItdTmWSpsvDzZJwMneBtjTIjjBr2QpLDDCdsZ4_Ge0SAPOL_Hw4y-PxcKtQWQiH9sVrLEREe4Nj2kpn7MBdTMbhxILXBiXCT0nMvVQuloQ7_CI9QXveEBCFNbZKlvXwEfO-JXrmARV8a4B9bIVs=s0-d-e1-ft#http://url7910.slashdev.io/wf/open?upn=gRpZJYAqMWm5rdYmxmQomOdfUDoNx-2BO-2FdKsAolCJRO7MpJIA5AaebXv9pU7r1syjl4xzqyZ8vkthg6PVBmzNI-2B93VJSd-2F-2FpUmdjgnNp2bRORNgpNgBK73fuejkG3hV-2BqaV7GiC9EPy-2FbXx11AuYfAG34lKxRYm0ojHu8BUxxn02D07dBNFBb9g7DykaC70I2Wdgp0Fs7QSLqYkHKgFd12QSVOmXXlY8sW7tIdjYrYcM-3D" alt="" width="1" height="1" border="0" style="height:1px!important;width:1px!important;border-width:0!important;margin-top:0!important;margin-bottom:0!important;margin-right:0!important;margin-left:0!important;padding-top:0!important;padding-bottom:0!important;padding-right:0!important;padding-left:0!important"></div>`
        });
        res.render("Home/Services", {
            pageTitle: "J&J AutoCare - Services",
            Answer: "Thanks for the request, our agents will attend to your request as soon as possible."
        });
        
        return transporter.sendMail({
           from: "JandJAutoCareCustomer@gmail.com",
           to: `JandJAutoCareInc@gmail.com`,
           subject: `${nombre}`,
           html: `<div class="container">
           <div class="card-body">
               <div class="card-header">
                   <h1>New Customer</h1>
               </div>
               <h2>Name: ${nombre}</h2>
               <h2>Last Name:${apellido}</h2>
               <h2>Service Requested: ${service}</h2>
               <h2>Email: ${correo}</h2>
               <h2>${descripcion}</h2>
       
           </div>
       </div>`
       });
        
    }
}