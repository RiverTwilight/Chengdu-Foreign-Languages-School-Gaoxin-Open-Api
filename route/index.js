const Nightmare = require('nightmare');  
var nightmare = Nightmare({ 
    show: true,
    gotoTimeout: 60000,
    waitTimeout: 1000
});
const express = require('express');
const router = express.Router();
const url = require('url');
const fs = require('fs');
const path = require('path');

//新闻动态列表
router.get('/newsList', async (req, res)=>{
    var htmlRes = await nightmare
        .goto('https://www.cflsgx.com/h-col-133.html')
        .evaluate(function(){
            var NewsList = [];
            var HtmlList = document.querySelectorAll('.J_newsListLine');
            for(let i = 0; i < HtmlList.length; i++){
                let newsLine = HtmlList[i]
                let news = {
                    cover: newsLine.getElementsByTagName("img")[0].src,
                    title: newsLine.getElementsByClassName("fk-newsListTitle")[0].innerHTML,
                    href: newsLine.getElementsByTagName("a")[0].href,
                    summary: newsLine.getElementsByClassName("fk-newsListSummary")[0].innerHTML
                }
                NewsList.push(news)
            }
            return NewsList
        })    
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.error('Search failed:', error);
        })
    res.send(htmlRes)
})

//文章全文
router.get('/newsDetail', async (req, res)=>{
    var params = url.parse(req.url, true).query
    var newsLink = params.link;
    var htmlRes = await nightmare
        .goto(newsLink)
        .evaluate(function(){
            var NewsDetail = {
                    title: document.getElementsByClassName("title")[0].innerHTML,
                    hit: document.getElementsByClassName("newsViewCount")[0].innerHTML,
                    date: document.getElementsByClassName("sourceInfoContent")[0].innerHTML,
                    content: document.getElementsByClassName("jz_fix_ue_img")[0].innerHTML
                }
            return NewsDetail
        })    
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.error('Search failed:', error);
        })
    res.send(htmlRes)
})

//所有文章
router.get('/AllPassages', async (req, res)=>{
    var params = url.parse(req.url, true).query
    var { pageNum, channel } = params.page;
    var htmlRes = await nightmare
        .goto(`https://www.cflsgx.com/h-nr--0_830_${channel}.html?complexStaticUrl=true&m31pageno=${pageNum}`)
        .evaluate(function(){
            var NoticeList = [];
            var HtmlList = document.querySelectorAll('.J_newsResultLine');
            for(let i = 0; i < HtmlList.length; i++){
                let newsLine = HtmlList[i]
                let news = {
                    title: newsLine.getElementsByTagName('a')[0].innerHTML,
                    href: newsLine.querySelectorAll(".newsCalendar a")[0].href,
                    date: newsLine.querySelectorAll(".newsCalendar a")[0].innerHTML
                }
                NoticeList.push(news)
            }
            return NoticeList
        })    
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.error('Search failed:', error);
        })
    res.send(htmlRes)
})

//师资队伍
router.get('/TeachersTeam', async (req, res)=>{
    var params = url.parse(req.url, true).query
    var { pageNum, channel } = params.page;
    var htmlRes = await nightmare
        .goto(`https://www.cflsgx.com/h-col-158.html`)
        .evaluate(function(){
            var NoticeList = [];
            var HtmlList = document.querySelectorAll('.productTileForm');
            for(let i = 0; i < HtmlList.length; i++){
                let newsLine = HtmlList[i]
                let news = {
                    name: newsLine.getElementsByTagName('a')[0].innerHTML,
                    photo: /url\((\.+)\)/.exec(newsLine.querySelectorAll(".imageEffects")[0].style.background)[0]
                }
                NoticeList.push(news)
            }
            return NoticeList
        })    
        .then(function (result) {
            return result;
        })
        .catch(function (error) {
            console.error('Search failed:', error);
        })
    res.send(htmlRes)
})
module.exports = router;
