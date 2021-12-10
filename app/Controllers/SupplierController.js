"use strict";

const Supplier = require("../Models/Supplier");
const Fields = require("../../config/db_fields");

const CONSTANTS = require('../../config/ReturnsRequest');
const {FailedReturn, SuccessReturn} = require('../../config/ReturnsRequest');

async function Show(req, res) {
    let countRecords = 0;
    Supplier.estimatedDocumentCount().exec((err, count) => {
        countRecords = count;
    });
    try {
        const result = await Supplier.where("state", 1).select(Fields.supplier_fields).exec();
        return SuccessReturn(res, result, countRecords);
    } catch (error) {
        return FailedReturn(res, error);
    }
}

async function Get(req, res) {
    let id = req.params.id;
    try {
        const result = await Supplier.findById(id);
        return SuccessReturn(res, result);
    } catch (error) {
        return FailedReturn(res,error);
    }
}

async function Save(req, res){
    let resgistro = new Supplier();
    resgistro.name = req.body.name;
    resgistro.phone = req.body.phone;
    resgistro.minimum_amount = req.body.minimum_amount;
    resgistro.visit_date = req.body.visit_date;
    try {
        resgistro.save((error, result)=>{
            if(error) return FailedReturn(res, error);
            return SuccessReturn(res, result);
        });
    } catch (error) {
        if(error) return FailedReturn(res,error);
    }
}

function Update(req, res){
    let id = req.params.id;
    let update = req.body;
    Supplier.findByIdAndUpdate(id, update, (error, result) =>{
        if(error) return FailedReturn(res,error);
        return SuccessReturn(res,result);
    });
}

function Delete(req, res){
    let id = req.params.id;
    Supplier.findByIdAndUpdate(id, {state: 0}, (error, result)=>{
        if (error) {
            return FailedReturn(res,error);
        }
    });
    return SuccessReturn(res,CONSTANTS.DELETE_STATUS_SUCESS_MESSAGE);
}

module.exports = {
    Show,
    Get,
    Save,
    Update,
    Delete
}