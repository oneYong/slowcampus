/**
 * Created by wonyongkim on 2018. 1. 24..
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var CommentsSchema = new Schema({
    content : String,
    created_at : {
        type : Date,
        default : Date.now()
    },
    product_id : Number
});

CommentsSchema.virtual('getDate').get(function(){
    var date = new Date(this.created_at);

    var v_month = date.getMonth() + 1;
    v_month = v_month < 10 ? "0" + v_month : v_month;
    var v_day = date.getDate();
    v_day = v_day < 10 ? "0" + v_day : v_day;

    return {
        year : date.getFullYear(),
        month : v_month,
        day : v_day,
        hour : date.getHours(),
        minute : date.getMinutes()
    };
});

CommentsSchema.plugin( autoIncrement.plugin , { model: "comments", field : "id", startAt : 1 });
module.exports = mongoose.model( "comments", CommentsSchema);