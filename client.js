const express = require('express');
const request = require('request');
const adaro = require('adaro');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
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
                var tree = {"name": "root", "children": [{"name": "综合经济", "children": [{"name": "财政与金融", "children": [{"name": "审计", "value": 1}, {"name": "收费", "value": 1}, {"name": "拨款", "value": 1}, {"name": "税务", "value": 1}, {"name": "经费", "value": 1}, {"name": "资金", "value": 1}, {"name": "采购", "value": 1}, {"name": "预决算", "value": 1}, {"name": "补贴", "value": 1}]}, {"name": "经济", "children": [{"name": "开发", "value": 1}, {"name": "土地", "value": 1}, {"name": "物价", "value": 1}, {"name": "招投标", "value": 1}, {"name": "资产", "value": 1}, {"name": "投资", "value": 1}, {"name": "国有", "value": 1}, {"name": "企业", "value": 1}, {"name": "外贸", "value": 1}, {"name": "非公有制", "value": 1}, {"name": "质量监督", "value": 1}, {"name": "商业街", "value": 1}, {"name": "市场", "value": 1}, {"name": "能源", "value": 1}, {"name": "产业", "value": 1}, {"name": "宏观经济", "value": 1}, {"name": "消费者", "value": 1}, {"name": "业态调整", "value": 1}]}, {"name": "旅游", "children": [{"name": "餐饮", "value": 1}, {"name": "产业", "value": 1}, {"name": "市场", "value": 1}, {"name": "宾馆", "value": 1}]}]}, {"name": "法制建设", "children": [{"name": "劳动保障", "children": [{"name": "就业", "value": 1}, {"name": "失业", "value": 1}, {"name": "保护", "value": 1}, {"name": "劳务", "value": 1}, {"name": "社会保障", "value": 1}, {"name": "安全生产", "value": 1}]}, {"name": "社区建设与居民", "children": [{"name": "社区管理", "value": 1}, {"name": "服务咨询", "value": 1}, {"name": "物业", "value": 1}, {"name": "社工", "value": 1}]}, {"name": "民政", "children": [{"name": "社团", "value": 1}, {"name": "优抚", "value": 1}, {"name": "人口", "value": 1}, {"name": "募捐", "value": 1}, {"name": "老龄", "value": 1}, {"name": "婚姻", "value": 1}, {"name": "救灾", "value": 1}, {"name": "双拥", "value": 1}, {"name": "社会福利", "value": 1}]}, {"name": "机构与服务", "children": [{"name": "机构", "value": 1}, {"name": "职能", "value": 1}, {"name": "编制", "value": 1}, {"name": "政务", "value": 1}, {"name": "公务员", "value": 1}, {"name": "外事", "value": 1}, {"name": "信息公开", "value": 1}, {"name": "服务", "value": 1}, {"name": "培训", "value": 1}]}, {"name": "政法", "children": [{"name": "人大", "value": 1}, {"name": "法律法规", "value": 1}, {"name": "法院", "value": 1}, {"name": "检察院", "value": 1}, {"name": "治安", "value": 1}, {"name": "禁毒", "value": 1}, {"name": "户籍", "value": 1}, {"name": "外来人口", "value": 1}, {"name": "扫黄", "value": 1}, {"name": "消防", "value": 1}, {"name": "养犬", "value": 1}, {"name": "普法", "value": 1}, {"name": "律师", "value": 1}, {"name": "法律援助", "value": 1}, {"name": "信访", "value": 1}]}]}, {"name": "城建环保", "children": [{"name": "城建", "children": [{"name": "建筑", "value": 1}, {"name": "施工", "value": 1}, {"name": "物业", "value": 1}, {"name": "修缮", "value": 1}, {"name": "房屋", "value": 1}, {"name": "危改", "value": 1}, {"name": "规划", "value": 1}, {"name": "拆迁", "value": 1}, {"name": "改造", "value": 1}, {"name": "道路", "value": 1}]}, {"name": "城管", "children": [{"name": "市政", "value": 1}, {"name": "市容", "value": 1}, {"name": "水电气热", "value": 1}, {"name": "公用事业", "value": 1}, {"name": "应急", "value": 1}, {"name": "民防", "value": 1}, {"name": "环境卫生", "value": 1}, {"name": "绿化", "value": 1}, {"name": "爱国卫生", "value": 1}, {"name": "车位", "value": 1}, {"name": "公厕", "value": 1}, {"name": "停车费", "value": 1}, {"name": "路灯", "value": 1}, {"name": "物业", "value": 1}, {"name": "垃圾", "value": 1}, {"name": "地锁", "value": 1}, {"name": "无照", "value": 1}]}, {"name": "环境保护", "children": [{"name": "污染", "value": 1}, {"name": "废弃物", "value": 1}, {"name": "环境", "value": 1}, {"name": "监督", "value": 1}]}]}, {"name": "科学技术", "children": [{"name": "科技", "children": [{"name": "科学", "value": 1}, {"name": "科普", "value": 1}, {"name": "科研", "value": 1}, {"name": "知识产权", "value": 1}, {"name": "可持续发展", "value": 1}, {"name": "信息化", "value": 1}, {"name": "高新技术", "value": 1}, {"name": "网络", "value": 1}]}]}, {"name": "教文卫体", "children": [{"name": "教育", "children": [{"name": "学校", "value": 1}, {"name": "民办", "value": 1}, {"name": "招生", "value": 1}, {"name": "幼教", "value": 1}, {"name": "培训", "value": 1}, {"name": "师资", "value": 1}, {"name": "素质教育", "value": 1}, {"name": "义务教育", "value": 1}, {"name": "成教", "value": 1}]}, {"name": "文化", "children": [{"name": "文化", "value": 1}, {"name": "文化市场", "value": 1}, {"name": "文物", "value": 1}]}, {"name": "卫生", "children": [{"name": "医院", "value": 1}, {"name": "医疗", "value": 1}, {"name": "药品监督", "value": 1}, {"name": "疾病控制", "value": 1}, {"name": "计划生育", "value": 1}, {"name": "妇幼保健", "value": 1}, {"name": "检疫", "value": 1}, {"name": "应急管理", "value": 1}, {"name": "食品卫生", "value": 1}, {"name": "失独", "value": 1}]}, {"name": "体育", "children": [{"name": "群众体育", "value": 1}, {"name": "竞技体育", "value": 1}, {"name": "场馆设施", "value": 1}, {"name": "体育设施", "value": 1}]}]}, {"name": "交通管理", "children": [{"name": "交通管理", "children": [{"name": "道路", "value": 1}, {"name": "交通标志", "value": 1}, {"name": "车辆管理", "value": 1}, {"name": "车位", "value": 1}, {"name": "交通管理", "value": 1}, {"name": "交通疏导", "value": 1}]}]}, {"name": "综合党团", "children": [{"name": "团体", "children": [{"name": "纪律检查", "value": 1}, {"name": "统战", "value": 1}, {"name": "精神文明", "value": 1}, {"name": "廉政建设", "value": 1}, {"name": "民主人士", "value": 1}, {"name": "爱国人士", "value": 1}, {"name": "港澳台", "value": 1}, {"name": "侨务", "value": 1}, {"name": "民主党派", "value": 1}, {"name": "共青团", "value": 1}, {"name": "工会", "value": 1}, {"name": "妇女", "value": 1}, {"name": "儿童", "value": 1}, {"name": "残联", "value": 1}]}, {"name": "军事", "children": [{"name": "军队", "value": 1}, {"name": "征兵", "value": 1}, {"name": "训练", "value": 1}, {"name": "转业", "value": 1}, {"name": "民兵", "value": 1}, {"name": "预备役", "value": 1}, {"name": "防空", "value": 1}, {"name": "复员", "value": 1}, {"name": "人武", "value": 1}, {"name": "培训", "value": 1}]}, {"name": "统战", "children": [{"name": "政协", "value": 1}, {"name": "民主人士", "value": 1}, {"name": "爱国人士", "value": 1}, {"name": "台湾", "value": 1}, {"name": "港澳", "value": 1}]}, {"name": "民族与宗教与侨务", "children": [{"name": "民族", "value": 1}, {"name": "宗教", "value": 1}, {"name": "宗教场所", "value": 1}, {"name": "侨务", "value": 1}]}, {"name": "党务", "children": [{"name": "组织", "value": 1}, {"name": "宣传", "value": 1}, {"name": "纪检监察", "value": 1}, {"name": "统战", "value": 1}, {"name": "群团", "value": 1}]}]}]};
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
                    var part = data[i].keyword.split(".");
                    for(var x=0; x<tree.children.length; x++) {
                        var first_class = tree.children[x];
                        if (first_class.name === part[0]) {
                            for(var y = 0; y<first_class.children.length; y++) {
                                var second_class = first_class.children[y];
                                if (second_class.name === part[1]) {
                                    for(var z = 0; z<second_class.children.length; z++) {
                                        var third_class = second_class.children[z];
                                        if (third_class.name === part[2]) {
                                            third_class.value = data[i].score;
                                            break;
                                        }
                                    }
                                    break;
                                }
                            }
                            break;
                        }
                    }
                }
                fs.writeFileSync('./public/data.json', JSON.stringify(tree));

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
app.listen(1080, '0.0.0.0');
