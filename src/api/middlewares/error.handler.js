export function errorHandler(err, req, res, next) {
  console.error('error handler');
  console.log(err);
  res.status(500).json({
    message: 'Ha ocurrido un error interno',
  });
}