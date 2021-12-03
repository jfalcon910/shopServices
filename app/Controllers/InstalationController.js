"use strict";

const User = require("../Models/User");

async function Install(req, res) {
	let user = new User();
	user.name = "John";
	user.lastName = "Falcón";
	user.email = "jfalcon0910@gmail.com";
	user.password = "123456";
	user.save((error, userStored) => {
		return res.status(200).send({loaded: false,status: true,statusInstalation: true});
	});
}

function Verify(req, res) {
	User.count()
    .where("state", 1)
    .exec((err, count) => {
		if (count > 0) {
        	return res.status(200).send({loaded: false,status: true,statusInstalation: true});
		} else {
        	return res.status(200).send({loaded: false,status: false,statusInstalation: null});
		}
    });
}

module.exports = {
	Install,
	Verify
};