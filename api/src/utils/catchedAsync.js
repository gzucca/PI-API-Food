module.exports = (fn) => {
  return function (req, res, next) {
    fn(req, res).catch((err) => next(err));
  };
};

// Version resumida (más dificl de leer):
// (fn) => (req, res, next) => fn(req, res).catch((err) => next(err))