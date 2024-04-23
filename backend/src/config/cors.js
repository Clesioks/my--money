export const allowCors = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept ')
    next()
}

