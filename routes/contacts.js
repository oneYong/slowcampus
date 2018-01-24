var express = require('express');
var router = express.Router();

var ContactsModel = require('../models/ContactsModel');


// 목록
router.get('/', function(req,res){
    ContactsModel.find(function(err,lists){
       res.render('contacts/lists',
           {lists : lists} //
       );
    });
});

// 상세페이지
router.get('/detail/:id' , function(req, res){
    //url 에서 변수 값을 받아올떈 req.params.id 로 받아온다
    ContactsModel.findOne( { 'id' :  req.params.id } , function(err ,list){
        res.render('contacts/listsDetail', { list: list });
    });
});

// 입력 페이지 및 입력하기
router.get('/write', function(req,res){
    res.render( 'contacts/form', { list : "" });
});

router.post('/write', function(req,res){
    var list = new ContactsModel({
        name : req.body.name,
        phoneNumber : req.body.phoneNumber,
        description : req.body.description,
    });
    list.save(function(err){
        res.redirect('/contacts');
    });
});

// 수정폼
router.get('/edit/:id' ,function(req, res){
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    ContactsModel.findOne({ id : req.params.id } , function(err, list){
        res.render('contacts/form', { list : list });
    });
});

// 수정하기
router.post('/edit/:id', function(req, res){
    //넣을 변수 값을 셋팅한다
    var query = {
        name : req.body.name,
        phoneNumber : req.body.phoneNumber,
        description : req.body.description,
    };

    //update의 첫번째 인자는 조건, 두번째 인자는 바뀔 값들
    ContactsModel.update({ id : req.params.id }, { $set : query }, function(err){
        res.redirect('/contacts/detail/' + req.params.id ); //수정후 본래보던 상세페이지로 이동
    });
});

// 삭제하기
router.get('/delete/:id', function(req, res){
    ContactsModel.remove({ id : req.params.id }, function(err){
        res.redirect('/contacts');
    });
});

module.exports = router;