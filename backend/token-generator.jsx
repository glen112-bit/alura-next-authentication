const jwt = require('jsonwebtoken');

const SECRET_KEY = 'hjkgukhyp89py789678rtifgk0'

const ourToken = jwt.sign(
  {
      name:'Glen',
  },
  SECRET_KEY,
  {
    subject: '1'
  }

);

console.log(ourToken);
