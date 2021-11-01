const Admin = require("../Models/Admin")
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
var codigo = "0000";
let correoU = "";
let nombreU = "";


const transporter2 = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "JandJAutoCareInc@gmail.com",
        pass: "j&jAutoCare"
    }
});

exports.GetMenu = (req,res,next) =>{
    res.render("Admin/Menu", {
        pageTitle: "J&J AutoCare  - Admin",
        

    })
}


exports.GetLogin = (req, res, next) => {


    res.render("Admin/Login", {
        pageTitle: "J&J AutoCare Login - Admin",
        

    })
};
exports.PostLogin = (req, res, next) => {

    const correoQ = req.body.Correo;
    const passQ = req.body.Pass;

    if (correoQ === "" || passQ === "") {

        res.render("Admin/Login", {
            pageTitle: "J&J AutoCare  Login - Admin",
            User: correoQ,
            Pass: passQ,
            Message: "*All fields are required*"
        })


    } else {
        Admin.findOne({
            where: {
                Correo: correoQ
            }
        }).then((user) => {
            
            if(!user){

                res.render("Admin/Login", {
                    pageTitle: "J&J AutoCare  Login - Admin",
                    User: correoQ,
                    Pass: passQ,
                    Message: "Email or Password are incorrect"
                })
            }else{
                bcrypt.compare(passQ, user.Contraseña).then((Upass)=>{
                    if(Upass){
                         req.session.isLoggedIn = true;
                         req.session.correo = correoQ;
                         res.redirect("/Admin/Menu")
                    }else{
                        res.render("Admin/Login", {
                            pageTitle: "J&J AutoCare  Login - Admin",
                            User: correoQ,
                            Message: "Wrong  Password"
                        })

                    }
                })
                
               
            }


            

        }).catch((err) => {
            console.log(err);
        });
    }


}

exports.GetRestorePass = (req, res, next) => {

    res.render("Admin/RestorePass", {
        pageTitle: "J&J AutoCare - Forget my password",
        CodeVisible: true,
    })
}

exports.PostRestorePass = (req, res, next) => {
    const correo = req.body.correo;
    if (correo === "") {
        res.render("Admin/RestorePass", {
            pageTitle: "J&J AutoCare - Forget my password",
            Message: "*The field is empty*"
        })

    } else {

        Admin.findOne({
            Where: {
                Correo: correo
            }
        }).then((result) => {


            const user = result.dataValues;

            if (user.Correo != correo) {
                res.render("Admin/RestorePass", {
                    pageTitle: "J&J AutoCare - Confirm de Email",
                    Message: "Do not exits any account registred with this email",
                })
            } else {
                correoU = user.Correo;
                nombreU = user.Nombre;

                codigo = Math.floor(Math.random() * (9999 - 1000) + 1000);
                console.log(codigo);

                res.render("Admin/Confirm", {
                    pageTitle: "J&J AutoCare - Confirm de Email",
                    correo: correoU,

                })
                return transporter2.sendMail({
                    from: "JandJAutoCareInc@gmail.com",
                    to: `${user.Correo}`,
                    subject: `Hi ${user.Nombre} You Verification Code `,
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
                    <h1 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:18px;font-weight:bold;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Hi, ${user.Nombre} ${user.Apellido}</font></font></h1>
                    <h2 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Your verification Code is:</font></font></h2>
                    <h1 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:18px;font-weight:bold;margin-top:0;text-align:center"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">${codigo}</font></font></h1>
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
            }




        }).catch((err) => {
            console.log(err);
        })
    }

}
exports.PostVerify = (req, res, next) => {
    let code = req.body.codigo;
    console.log(codigo);
    console.log(code);

    if (code == codigo) {
        res.render("Admin/NewPass", {
            pageTitle: "J&J AutoCare - New Password",
        })
    } else {
        res.render("Admin/Confirm", {
            pageTitle: "J&J AutoCare - Forget my password",
            correo: correoU,
            Code: code,
            Message: "Wrong Code",

        })
    }


}

exports.PostNewPass = (req, res, next) => {
    const pass1 = req.body.Pass1;
    const pass2 = req.body.Pass2;

    if (pass1 === pass2) {

        Admin.findOne({
            where: {
                Correo: correoU
            }
        }).then((result) => {
            const user = result.dataValues;
            bcrypt.hash(pass1,12).then(hashedPass =>{
    
                Admin.update(

                    {
                        Nombre: user.Nombre,
                        Apellido: user.apellido,
                        Correo: user.Correo,
                        Contraseña: hashedPass,
                        id: user.id
                    }, {
                        where: {
                            Correo: correoU
                        }
                    })
                .then((result) => {
                    res.redirect("/Admin/Login");

                    return transporter2.sendMail({
                        from: "JandJAutoCareInc@gmail.com",
                        to: `${correoU}`,
                        subject: `Hey! ${user.Nombre} Change Password`,
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
                        <h1 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';color:#3d4852;font-size:18px;font-weight:bold;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Hi, ${user.Nombre} ${user.Apellido}</font></font></h1>
                        <h2 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">Your update  password was successful!! </font></font></h2>
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


                }).catch((error) => {
                    console.log(error);
                })

            }).catch(err =>{
                console.log(err);
                return res.redirect("/Admin/Login");
            })
           
        })



    } else {
        res.render("Admin/NewPass", {
            pageTitle: "J&J AutoCare - Change you Password",
            Message: "The Password do not match",

        })
    }


}
exports.GetAddUsuario = (req, res, next) => {

    res.render("Admin/CreateUser", {
        pageTitle: "J&J AutoCare - Login - Admin",
    })
}

exports.PostAddUsuario = (req, res, next) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const correo = req.body.correo;
    const pass = req.body.contraseña;
    const passC = req.body.contraseña1;

    if (nombre === "" || apellido === "" || correo == "" ||  pass === "") {
        res.render("Admin/CreateUser", {
            pageTitle: "Create Account - Admin",
            Nombre: nombre,
            Apellido: apellido,
            Correo: correo,
            Contraseña: pass,
            Message: "*All fields are required*",
        });

    } else {
        if (pass != passC) {
            res.render("Admin/CreateUser", {
                pageTitle: "Create Account - Admin",
                Nombre: nombre,
                Apellido: apellido,
                Correo: correo,
                Contraseña: pass,
                Contraseña1: passC,
                Message: "*Passwords do not match*",
            });

        } else {
            Admin.findOne({where: {Correo: correo}}).then((user)=>{

                if(user){
                    res.render("Admin/CreateUser", {
                        pageTitle: "Create Account - Admin",
                        Nombre: nombre,
                        Apellido: apellido,
                        Correo: correo,
                        Contraseña: pass,
                        Contraseña1: passC,
                        Message: "*there is already an account registered with this email*",
                    });
                }else{
                    bcrypt.hash(pass,12).then(hashedPass =>{
    
                        Admin.create(
                            {
                               Nombre: nombre,
                               Apellido: apellido,
                               Correo: correo,
                               Contraseña: hashedPass,
                                
                            }).then(result=>{
        
                                 res.redirect("/Admin/Login");
                                 return transporter2.sendMail({
                                    from: "JandJAutoCareInc@gmail.com",
                                    to: `${correo}`,
                                    subject: `Welcome ${nombre}`,
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
                                    <h2 style="box-sizing:border-box;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif,'Apple Color Emoji','Segoe UI Emoji','Segoe UI Symbol';font-size:16px;line-height:1.5em;margin-top:0;text-align:left"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">You have successfully registered as an administrator on our J&J AutoCare website</font></font></h2>
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
                                   
                            
                               }).catch(err =>{
                                   console.log(err);
                               });

                    }).catch(err =>{
                        console.log(err);
                        return res.redirect("/Admin/Login");
                    })
                }
               
                

            }).catch(err => {
                console.log(err);
            });
           

        }


    }


}

exports.PostLogout = (req,res,next)=>{

    req.session.destroy( err =>{
        console.log(err);
        res.redirect("/")
    });
};