
const logger = (req, res, next) =>{
  curDate = new Date();
  console.log(
    `${curDate.toLocaleDateString()}, ${curDate.toLocaleTimeString()}
     ${req.method} ${req.url}`
  );
  next();
};

module.exports = {logger};