var cors = require('cors');
var express = require('express'),
    router = express.Router();
var request=require('request');
var xml = require('xml');
var xmlparser = require('express-xml-bodyparser');
const convert = require('xml-js');
module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

    res.render('index', {
      title: 'AED 위치 리스트',
    });
});
/*
router.get('/add', function (req, res, next) {
  res.render('add', {
    title: 'AED 위치 추가'
  });
});

router.post('/add', function (req, res, next) {
  var add = new location({
    title: req.body.title,
    address: req.body.address,
    coords: [req.body.lat, req.body.lng]
  });

  add.save(function (err) {
    if (err) {
      return next(err);
    } else {
      res.json(true);
    }
  });

});
*/
router.post('/nearbyme', function (req, res, next) {
  var formData = [];
  formData[0] = req.body.lng;
  formData[1] = req.body.lat;
  var url='http://apis.data.go.kr/B552657/AEDInfoInqireService/getAedLcinfoInqire';
  var queryParams='?'+encodeURIComponent('ServiceKey')+'='+'gJ%2FGBmwaviWrn8ZSx0eOt745BOy5J51ZReBd%2F44r73veUNOjqE0vgQhfleuV7WuU5%2Bos3IuLV5tivlhQ99eO1A%3D%3D';
  queryParams+='&'+encodeURIComponent('WGS84_LON')+'='+req.body.lng+'&'+encodeURIComponent('WGS84_LAT')+'='+req.body.lat;
  queryParams+='&'+encodeURIComponent('pageNo')+'='+'1';
  queryParams+='&'+encodeURIComponent("numberOfRows")+'='+'1';
  request({
    url: url + queryParams,
    method: 'GET',

}, function (error, response, body) {
  if(error){
    console.log(error);
  }else if(body){
    var xmlToJson=convert.xml2json(body,{compact:true, spaces:4});
    res.json({
      result:true,
      item:xmlToJson
    });
  }

});

});

router.get('/keyboard', (req, res) => {
  var menu = {
      type: 'buttons',
      buttons: ["AED 위치 찾기"]
  };
  res.send(menu);
});

router.post('/message', (req,res) =>{
  var msg = req.body.content;
  if(msg=="AED 위치 찾기"){
    let message= {
    "message": {
      "text": "아래 버튼을 눌러 현재 위치와 가장 가까운 AED를 알아내세요.",
      "message_button": {
        "label": "현 위치에서 가장 가까운 AED",
        "url": "https://c71a628de3f64770b04a49d4ffde88ab.vfs.cloud9.us-east-1.amazonaws.com/"
      }
    },
    "keyboard": {
      "type": "buttons",
      "buttons": [
        "처음으로"
      ]
    }
  }
    res.send(message);
  }else if(msg=="처음으로"){
    let message = {
    "message": {
      "text": "처음으로 돌아갑니다."
    },
    "keyboard": {
      "type": "buttons",
      "buttons": [
        "AED 위치 찾기"
      ]
    }
  }
    res.send(message);
  }


});
