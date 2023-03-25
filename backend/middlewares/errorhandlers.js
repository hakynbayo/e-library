const errorHandler = (err, req, res, next) => {
    // error status code 
    const errorStatusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(errorStatusCode);
    res.json({
        success: false,
        message: err.message,
    });
        
};

module.exports = {errorHandler};
