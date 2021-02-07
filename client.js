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
        url: "http://proposal-svc:8080",  // http://proposal.ruoben.com
        headers: {
            "Content-Type": "application/json"
        },
        json: true,
        body: {text: req.body.title + '!@#' + req.body.content.replace('\n', '\\n')},
        timeout: 60000
    }, function (err, res1, json) {
        if (err) {
            console.error(err.toString());
            res.header('Content-Type', 'text/plain; charset=utf-8').status(500).end(err.toString());
        } else {
            if (res1.statusCode === 200) {
                console.log('------------------------------------------------------------------------------------------------')
                console.log(json);  //////////////
                var blank = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
                var text = "主题词：";
                var topics = json.topic.split("|");
                for(var i=0; i<topics.length; i++) {
                    var keyword_scores = topics[i].split("@");
                    text += keyword_scores[0] + blank;
                }
                var data = [];
                var scores = [];
                var topic_12s = json.topic_12.split("|");
                for(i=0; i<topic_12s.length; i++) {
                    keyword_scores = topic_12s[i].split("@");
                    data.push({keyword: keyword_scores[0], score:parseFloat(keyword_scores[1])});
                    scores.push(parseFloat(keyword_scores[1]));
                }
                var min = Math.min.apply(null, scores);
                var d = Math.max.apply(null, scores) - min;
                for(i=0; i<data.length; i++) {
                    data[i].score = (data[i].score - min) / d * 10 + 10;
                }
                text += "<br>承办单位：";
                var untis = json.unit.split("|");
                for(i=0; i<untis.length; i++) {
                    var unit_scores = untis[i].split("@");
                    text += unit_scores[0] + blank;
                }
                var data1 = [];
                scores = [];
                var unit_12s = json.unit_12.split("|");
                for(i=0; i<unit_12s.length; i++) {
                    unit_scores = unit_12s[i].split("@");
                    data1.push({unit: unit_scores[0], score:parseFloat(unit_scores[1])});
                    scores.push(parseFloat(unit_scores[1]));
                }
                min = Math.min.apply(null, scores);
                d = Math.max.apply(null, scores) - min;
                for(i=0; i<data1.length; i++) {
                    data1[i].score = (data1[i].score - min) / d * 10 + 10;
                }
                res.header('Content-Type', 'text/plain; charset=utf-8').status(200).json({text: text, data: data, data1: data1});
            } else {
                console.error("调用proposal接口报错");
                res.header('Content-Type', 'text/plain; charset=utf-8').status(500).end("调用proposal接口报错");
            }
        }
    });
});
app.listen(2080, '0.0.0.0');
