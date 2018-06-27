var express = require('express'),
    router = express.Router();

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
router.post('/nearbyme', function (req, res, next) {
  var formData = [];
  formData[0] = req.body.lng;
  formData[1] = req.body.lat;
  location.findOne({
    coords: {
      '$near': {
        '$geometry': {
          type: 'Point',
          coordinates: formData
        },
        '$maxDistance': 10 * 1609.34 // 10km 이내 10 * 야드
      }
    }
  }).exec(function (err, item) {
    if (err) {
      return next(err);
    } else if (item) {
      res.json({result: true, item: item});
    } else {
      res.json({result: false});
    }
  });
});
*/
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
        "url": "https://woosungweb.herokuapp.com/"
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
