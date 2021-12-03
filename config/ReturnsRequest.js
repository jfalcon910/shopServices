const CONSTANTS = require('./Constants');

const FailedReturn = (res,error,message=null) => {
	return res
		.status(CONSTANTS.CODE_BAD_REQUEST)
		.send(
			{
				message: message===null ? CONSTANTS.QUERY_STATUS_ERROR_MESSAGE : message,
				error,
				status: false, 
				request:CONSTANTS.REQUEST_FAILED
			}
		);
}

const SuccessReturn = (res,result,countRecords=null) => {
	res
	.status(CONSTANTS.CODE_OK)
	.send(countRecords ===null ? { result, status: true, request:CONSTANTS.REQUEST_SUCCESS } : { result, countRecords, status: true, request:CONSTANTS.REQUEST_SUCCESS });
}

module.exports = {
	FailedReturn,
	SuccessReturn
};