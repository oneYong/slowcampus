var express = require('express');
var router = express.Router();

var ProductsModel = require('../models/ProductsModel');
var CommentsModel = require('../models/CommentsModel');

// 목록
router.get('/products', function(req,res){
    ProductsModel.find(function(err,products){
       res.render('admin/products',
           {products : products} // DB에서 받은 products를 products변수명으로 내보냄
       );
    });
});

// 상세페이지
router.get('/products/detail/:id' , function(req, res){
    //url 에서 변수 값을 받아올떈 req.params.id 로 받아온다
    ProductsModel.findOne( { 'id' :  req.params.id } , function(err ,product){
        //제품정보를 받고 그안에서 댓글을 받아온다.
        CommentsModel.find({ product_id : req.params.id } , function(err, comments){
            res.render('admin/productsDetail', { product: product , comments : comments });
        });
    });
});

// 입력 페이지 및 입력하기
router.get('/products/write', function(req,res){
    res.render( 'admin/form', { product : "" });
});

router.post('/products/write', function(req,res){
    var product = new ProductsModel({
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
    });
    var validationError = product.validateSync();
    if(validationError){
        res.redirect('/admin/products/write');
    }else{
        product.save(function(err){
            res.redirect('/admin/products');
        });
    }
});

// 수정폼
router.get('/products/edit/:id' ,function(req, res){
    //기존에 폼에 value안에 값을 셋팅하기 위해 만든다.
    ProductsModel.findOne({ id : req.params.id } , function(err, product){
        res.render('admin/form', { product : product });
    });
});

// 수정하기
router.post('/products/edit/:id', function(req, res){
    //넣을 변수 값을 셋팅한다
    var query = {
        name : req.body.name,
        price : req.body.price,
        description : req.body.description,
    };

    //update의 첫번째 인자는 조건, 두번째 인자는 바뀔 값들
    ProductsModel.update({ id : req.params.id }, { $set : query }, function(err){
        res.redirect('/admin/products/detail/' + req.params.id ); //수정후 본래보던 상세페이지로 이동
    });
});

// 삭제하기
router.get('/products/delete/:id', function(req, res){
    ProductsModel.remove({ id : req.params.id }, function(err){
        res.redirect('/admin/products');
    });
});

router.post('/products/ajax_comment/insert', function(req,res){
    var comment = new CommentsModel({
        content : req.body.content,
        product_id : parseInt(req.body.product_id)
    });
    comment.save(function(err, comment){
        res.json({
            id : comment.id,
            content : comment.content,
            message : "success"
        });
    });
});

router.post('/products/ajax_comment/delete', function(req, res){
    CommentsModel.remove({ id : req.body.comment_id } , function(err){
        res.json({ message : "success" });
    });
});

module.exports = router;