const successResponse = (res, status, message, data) => {
    const response = { status: true, message, data }
    return res.json(response);
};

const errorResponse = (res, status, message) => {
    const response = {status: false, message}
    return res.json(response);
};

module.exports = { successResponse, errorResponse };