const express = require('express')
const { resolve } = require('path')
const path = require('path');
const app = express()

// Estáticos -> Roteamento dos Componentes
app.use('/',
  express.static(
    resolve(
      __dirname,
      './build'
    )
  )
) 

 app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(process.env.PORT || 3000, (err) => {
  err ? console.log("err", err) : console.log("Tudo Funcionando!")
});

// const path = require('path');
// const express = require('express');
// const app = express();

// const port = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, '..', 'build')));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(port, () => {
//     console.log('Server is running on port: ' + port);
// });