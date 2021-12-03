const {
	validateToken,
} = require("../../config/ServiceToken");
  
let verificaToken = async function(req, res, next) {
    if (req.method != "OPTIONS") {
		if (req.path != `${process.env.PREFIX_ROUTE}/auth/auth-login`) {
			if (req.path != `${process.env.PREFIX_ROUTE}/auth/verify-auth`) {
				if (req.path != `${process.env.PREFIX_ROUTE}/auth/auth-logout`) {
					if (req.path != `${process.env.PREFIX_ROUTE}/auth/get-tokens`) {
						if (req.path != `${process.env.PREFIX_ROUTE}/auth/del-token`) {
							if (req.path != `${process.env.PREFIX_ROUTE}/auth/recover-get-user`) {
								if (req.path != `${process.env.PREFIX_ROUTE}/auth/recover-change-pass`) {
									if(req.path != `${process.env.PREFIX_ROUTE}/instalation/set`){
										if(req.path != `${process.env.PREFIX_ROUTE}/instalation/verify`){
											if (req.headers.authorization == undefined)
											return res.status(403).send({
												message: "Acceso no autorizado *** no seas payaso, logeate"
											});
											let token = req.headers.authorization.split(" ")[1];
											let validate = {};
											validate = await validateToken(token);
											if (!validate.status)
												return res.status(403).send({ message: "Acceso no autorizado *** no seas payaso, logeate"});
											next();
										}else next();
									}else next();
								}else next();
							}else next();
						} else next();
					} else next();
				} else next();
			} else next();
		} else next();
	} else next();
};
///frontend/assets/img/company_logo/
  
module.exports = {
    verificaToken
};