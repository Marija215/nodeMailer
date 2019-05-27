const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Staticki folder
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');
});

app.post('/send', (req, res) => {
  const output = `
    <p>Imate novu poruku</p>
    <h3>Detalji poruke</h3>
    <ul>  
      <li>Ime i prezime: ${req.body.name}</li>
      <li>Kompanija: ${req.body.company}</li>
      <li>E-mail Adresa: ${req.body.email}</li>
      <li>Broj Telefona: ${req.body.phone}</li>
    </ul>
    <h3>Poruka</h3>
    <p>${req.body.message}</p>
  `;

  // transporter
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // T 465
    auth: {
        user: 'marijaaaa5rovic@gmail.com',
        pass: 'marijapetrovic93' 
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
      from: '"Nodemailer Kontakt" <marijaaa5rovic@gmail.com>', // sender address
      to: 'marijaaaa5rovic@gmail.com',
	  // milos.kosanovic@vtsnis.edu.rs
      subject: 'Node kontakt zahtev', 
      html: output // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Poruka je uspešno poslata!: %s', info.messageId);   
      console.log('Pregled URL-a: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email je poslat'});
  });
  });

app.listen(3000, () => console.log('Server je pokrenut...'));

//E:\faks\3. godina\Nodemailer
//http://localhost:3000
//milos.kosanovic@vtsnis.edu.rs
