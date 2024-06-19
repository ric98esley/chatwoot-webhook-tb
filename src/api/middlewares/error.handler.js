export function errorHandler(err, req, res, next) {
  console.error('error handler');
  console.log(JSON.stringify(err, null, 2));
  res.status(500).json({
    message: 'Ha ocurrido un error interno',
  });
}