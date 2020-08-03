const express = require('express');
const request = require('request');
const adaro = require('adaro');
const path = require('path');
const bodyParser = require('body-parser');
/** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- **/
var app = express();
app.engine('dust', adaro.dust({
    helpers: ['dustjs-helpers']
}));
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'dust');
app.use(bodyParser.text({limit: '10mb'}));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
/** ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- **/
// 测试页
app.get("/", function (req, res) {
    res.status(200).render('proposal');
});

app.post("/", function (req, res) {
    request.post({
        url: "http://proposal-svc:8080",
        headers: {
            "Content-Type": "application/json"
        },
        json: true,
        body: {text: req.body.title + '!@#' + req.body.content.replace('\n', '\\n')},
        timeout: 60000
    }, function (err, res1, text) {
        if (err) {
            console.error(err.toString());
            res.header('Content-Type', 'text/plain; charset=utf-8').status(500).end(err.toString());
        } else {
            if (res1.statusCode === 200) {
                console.log('------------------------------------------------------------------------------------------------')
                console.log(text);
                res.header('Content-Type', 'text/plain; charset=utf-8').status(200).end(text.replace(/\n/g, '<br>'));
            } else {
                console.error("调用proposal接口报错");
                res.header('Content-Type', 'text/plain; charset=utf-8').status(500).end("调用proposal接口报错");
            }
        }
    });
});
app.listen(1080, '0.0.0.0');
