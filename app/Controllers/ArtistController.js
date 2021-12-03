"use strict";

const AWS = require("aws-sdk");
const path = require("path");
const fs = require("fs");

const s3 = new AWS.S3({
  accessKeyId: process.env.NODE_S3_ID,
  secretAccessKey: process.env.NODE_S3_KEY,
});

const Artist = require("../Models/Artist");
const Fields = require("../../config/db_fields");
const CONSTANTS = require("../../config/Constants");
const ba64 = require("ba64");
const moment = require("moment");
const slugify = require("slug-generator");

async function Show(req, res) {
  let countRecords = 0;
  Artist.estimatedDocumentCount().exec((err, count) => {
    countRecords = count;
  });

  Artist.where("state", 1)
    .select(Fields.artist_fields)
    .exec((error, result) => {
      if (error)
        return res.send({
          message: CONSTANTS.QUERY_STATUS_ERROR_MESSAGE,
          error,
          status: false,
          request: CONSTANTS.REQUEST_FAILED,
        });
      return res.status(CONSTANTS.CODE_OK).send({
        result,
        countRecords,
        status: true,
        request: CONSTANTS.REQUEST_SUCCESS,
      });
    });
}

async function Get(req, res) {
  let id = req.params.id;
  Artist.findById(id, Fields.artist_fields, (error, result) => {
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

async function Save(req, res) {
  let name = req.body.name;
  let lastName = req.body.lastName;
  Artist.findOne({ name, lastName })
    .then((exists) => {
      if (exists) {
        return res.status(CONSTANTS.CODE_BAD_REQUEST).send({
          message: CONSTANTS.DATA_EXISTS,
          status: false,
          request: CONSTANTS.REQUEST_FAILED,
        });
      } else {
        let registro = new Artist();
        registro.name = req.body.name;
        registro.lastName = req.body.lastName;
        registro.photo = req.body.photo;
        // const data_url = req.body.photo;
        // const ext = data_url.substring("data:image/".length, data_url.indexOf(";base64"));
        // const timeCreation = moment().unix();
        // const image_name = `${slugify(req.body.name)}-${timeCreation}`;
        // const directory = "assets/artist_photo/";
        // ba64.writeImageSync(`${directory}${image_name}`, data_url);
        // const targetPath = path.join(__dirname, `../../${directory}/${image_name}.${ext}`);
        // var params = {
        // 	Bucket: process.env.NODE_S3_BUCKET,
        // 	Body: fs.createReadStream(targetPath),
        // 	Key: `${process.env.NODE_S3_BUCKET_DIRECTORY_ARTIST_PHOTO}/${image_name}.${ext}`,
        // 	ACL: "public-read"
        // };
        // s3.upload(params, function(err, data) {
        // 	if (err) {
        // 		console.log("No se pudo subir el archivo")
        // 	}
        // 	if (data) {
        // 		console.log("Archivo subido correctamente.")
        // 	}
        // });
        // registro.photo = `${image_name}.${ext}`;
        registro.country = req.body.country;
        try {
          registro.save((error, result) => {
            if (error)
              return res.status(CONSTANTS.CODE_BAD_REQUEST).send({
                message: CONSTANTS.SAVE_STATUS_ERROR_MESSAGE,
                error,
                status: false,
                request: CONSTANTS.REQUEST_FAILED,
              });
            return res.status(CONSTANTS.CODE_OK).send({
              result,
              status: true,
              message: CONSTANTS.SAVE_STATUS_SUCCESS_MESSAGE,
              request: CONSTANTS.REQUEST_SUCCESS,
            });
          });
        } catch (error) {
          if (error)
            return res.status(CONSTANTS.CODE_BAD_REQUEST).send({
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
  Artist.findByIdAndUpdate(id, update, (error, result) => {
    if (error)
      return res.send({
        message: CONSTANTS.UPDATE_STATUS_ERROR_MESSAGE,
        error,
        status: false,
        request: CONSTANTS.REQUEST_FAILED,
      });
    return res.status(CONSTANTS.CODE_OK).send({
      result,
      message: CONSTANTS.UPDATE_STATUS_SUCCESS_MESSAGE,
      status: true,
      request: CONSTANTS.REQUEST_SUCCESS,
    });
  });
}

// function Delete(req, res) {
//   let selected = req.body.selected;
//   // console.log(selected)
//   // let arraySelected = selected.split(",");
//   selected.map((item, index) => {
//     Artist.findByIdAndUpdate(item, { state: 0 }, (error, result) => {
//       if (error) {
//         res.send({
//           message: CONSTANTS.SERVER_ERROR,
//           error,
//           status: false,
//           request: CONSTANTS.REQUEST_FAILED,
//         });
//       }
//     });
//   });
//   return res.status(CONSTANTS.CODE_OK).send({
//     message: CONSTANTS.DELETE_STATUS_SUCCESS_MESSAGE,
//     status: true,
//     request: CONSTANTS.REQUEST_SUCCESS,
//   });
// }

function Delete(req, res) {
  let id = req.params.id;
  // console.log(selected)
  // let arraySelected = selected.split(",");
  Artist.findByIdAndUpdate(id, { state: 0 }, (error, result) => {
    if (error) {
      res.status(CONSTANTS.CODE_BAD_REQUEST).send({
        message: CONSTANTS.SERVER_ERROR,
        error,
        status: false,
        request: CONSTANTS.REQUEST_FAILED,
      });
    }
  });
  return res.status(CONSTANTS.CODE_OK).send({
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
