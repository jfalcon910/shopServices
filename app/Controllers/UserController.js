"use strict";

const User = require("../Models/User");
const Fields = require("../../config/db_fields");

const {
	validateToken,
} = require("../../config/ServiceToken");
const CONSTANTS = require('../../config/Constants');
const {FailedReturn,SuccessReturn} = require('../../config/ReturnsRequest');

async function Show(req, res) {
	// let token = req.headers.authorization.split(" ")[1];
	// let validate = {};
	// validate = await validateToken(token);
	let countRecords = 0;

	User.estimatedDocumentCount().exec((err, count) => {
		countRecords = count;
	});
	
	try {
		const result = await User.where("state",1).select(Fields.user_fields).exec();
		return SuccessReturn(res,result,countRecords);
	} catch (error) {
		return FailedReturn(res,error);
	}
}

async function Get(req, res) {
	let id = req.params.id;
	try {
		const result = await User.findById(id);
		return SuccessReturn(res,result);
	} catch (error) {
		return FailedReturn(res,error);
	}
}

async function Save(req, res) {
	// let token = req.headers.authorization.split(" ")[1];
	// let validate = {};
	// validate = await validateToken(token);

	let email = req.body.email;
	const exist = await User.findOne({ email });
	if(exist){
		return FailedReturn(res,'El usuario ya existe');
	}

	let registro = new User();
	registro.name = req.body.name;
	registro.lastName = req.body.lastName;
	registro.email = req.body.email;
	registro.password = req.body.password;

	try {
		registro.save((error, result) => {
			if (error) return FailedReturn(res,error);
			return SuccessReturn(res,result);
		});
	} catch (error) {
		if (error) return FailedReturn(res,error);
	}
}

function Update(req, res) {
	let id = req.params.id;
	let update = req.body;
	User.findByIdAndUpdate(id, update, (error, result) => {
		if (error) return FailedReturn(res,error);
		return SuccessReturn(res,result);
	});
}

function Delete(req, res) {
	let id = req.params.id;
	User.findByIdAndUpdate(id, { state: 0 }, (error, result) => {
		if (error) {
			return FailedReturn(res,error);
		}
	});
	return SuccessReturn(res,CONSTANTS.DELETE_STATUS_SUCCESS_MESSAGE);
}

module.exports = {
	Show,
	Get,
	Save,
	Update,
	Delete
};