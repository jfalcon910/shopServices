"use strict";

const Country = require("../Models/Country");
const Fields = require("../../config/db_fields");
const CONSTANTS = require("../../config/Constants");

async function Show(req, res) {

  let countRecords = 0;
  Country.estimatedDocumentCount().exec((err, count) => {
    countRecords = count;
  });
  Country.where("state", 1)
    .select(Fields.country_fields)
    .exec((error, result) => {
      if (error)
        return res
          .status(CONSTANTS.CODE_BAD_REQUEST)
          .send({
            message: CONSTANTS.QUERY_STATUS_ERROR_MESSAGE,
            error,
            status: false,
            request: CONSTANTS.REQUEST_FAILED,
          });
      return res
        .status(CONSTANTS.CODE_OK)
        .send({
          result,
          countRecords,
          status: true,
          request: CONSTANTS.REQUEST_SUCCESS,
        });
    });
}

async function Get(req, res) {
  let id = req.params.id;
  Country.findById(id, Fields.country_fields, (error, result) => {
    if (error)
      return res.send({
        message: CONSTANTS.QUERY_STATUS_ERROR_MESSAGE,
        error,
        status: false,
        request: CONSTANTS.REQUEST_FAILED,
      });
    return res
      .status(CONSTANTS.CODE_OK)
      .send({ result, status: true, request: CONSTANTS.REQUEST_SUCCESS });
  });
}

function Save(req, res) {
  let name = req.body.name;
  Country.findOne({ name })
    .then((exists) => {
      if (exists) {
        return res.send({
          message: CONSTANTS.DATA_EXISTS,
          status: false,
          request: CONSTANTS.REQUEST_FAILED,
        });
      } else {
        let registro = new Country();
        registro.name = req.body.name;
        registro.currency = req.body.currency;
        registro.iso = req.body.iso;
        try {
          registro.save((error, result) => {
            if (error)
              return res.send({
                message: CONSTANTS.SAVE_STATUS_ERROR_MESSAGE,
                error,
                status: false,
                request: CONSTANTS.REQUEST_FAILED,
              });
            return res
              .status(CONSTANTS.CODE_OK)
              .send({
                result,
                status: true,
                message: CONSTANTS.SAVE_STATUS_SUCCESS_MESSAGE,
                request: CONSTANTS.REQUEST_SUCCESS,
              });
          });
        } catch (error) {
          if (error)
            return res.send({
              message: CONSTANTS.SAVE_STATUS_ERROR_MESSAGE,
              error,
              status: false,
              request: CONSTANTS.REQUEST_FAILED,
            });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function Update(req, res) {
  let id = req.params.id;
  let update = req.body;
  Country.findByIdAndUpdate(id, update, (error, result) => {
    if (error)
      return res.send({
        message: CONSTANTS.UPDATE_STATUS_ERROR_MESSAGE,
        error,
        status: false,
        request: CONSTANTS.REQUEST_FAILED,
      });
    return res
      .status(CONSTANTS.CODE_OK)
      .send({
        result,
        message: CONSTANTS.UPDATE_STATUS_SUCCESS_MESSAGE,
        status: true,
        request: CONSTANTS.REQUEST_SUCCESS,
      });
  });
}

function Delete(req, res) {
  let selected = req.body.selected;
  selected.map((item, index) => {
    Country.findByIdAndUpdate(item, { state: 0 }, (error, result) => {
      if (error) {
        res.send({
          message: CONSTANTS.SERVER_ERROR,
          error,
          status: false,
          request: CONSTANTS.REQUEST_FAILED,
        });
      }
    });
  });
  return res
    .status(CONSTANTS.CODE_OK)
    .send({
      message: CONSTANTS.DELETE_STATUS_SUCCESS_MESSAGE,
      status: true,
      request: CONSTANTS.REQUEST_SUCCESS,
    });
}

module.exports = {
  Show,
  Get,
  Save,
  Update,
  Delete,
};
