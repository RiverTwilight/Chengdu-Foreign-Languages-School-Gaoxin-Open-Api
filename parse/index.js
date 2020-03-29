const cheerio = require('cheerio');

const getNewsList = (html) => {
    var NewsList = [];
    //let $ = cheerio.load(html);
    console.log(html)
    /*$(".J_newsListLine").each((index, ele)=>{
        let news = {
            title:ele.find(".g_news_title").text,
            date:ele.find(".ne_newsTime").text,
            href:ele.find(".lineBodyLink").attr('href')
        }
        NewsList.push(news)
    })*/
    return NewsList
}

exports.parse = getNewsList