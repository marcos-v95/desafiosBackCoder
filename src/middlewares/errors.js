import EnumErrors from '../services/errors/enums.js'

export default (error, req, res, next) => {
  console.log(error.cause)
  switch (error.code) {
    case EnumErrors.INVALID_TYPES_ERROR:
      res.send({ status: 'error', error: error.name })
      break;

    case EnumErrors.ROUTING_ERROR:
      res.send({ status: 'error', error: error.name })
      break;

    default:
      res.send({ status: 'error', error: 'Unhandled error' });
  }
}