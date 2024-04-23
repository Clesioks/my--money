
const notFound = (req, res, next) => {
    const error = new Error (`Não encontrado - ${req.originaUrl}`)
    res.status(404)
    next(error)
}



export { notFound }