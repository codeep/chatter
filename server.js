const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());

app.post('/auth/sign-in', (req, res) => {
  res.send({authToken: 'Aaaa1234'}, 200);
  res.end();
})

app.post('/auth/sign-up', (req, res) => {
  res.end();
})

app.get('/users/current', (req, res) => {
  res.send({
    id: 1234,
    first_name: 'Sergey',
    last_name: 'Papayan',
    email_or_phone: 'sergey_p94@mail.ru',
    gender: 'male',
    birth_day: '04/15/1994',
  });
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something broke!');
})

app.listen(3000);