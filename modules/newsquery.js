// file to make a call to the Google books API and callback with the results

'use strict'

const request = require('request')

exports.doNewSearch = (q, callback) => {
    const Today = new Date();
    const date = Today.getFullYear() + "-" + (Today.getMonth()+1) + Today.getDate();
    const url = `http://newsapi.org/v2/everything?q=${q}&from=` + date + `&sortBy=publishedAt&apiKey=e3cdb4497f51461bbef202419bdc2b86`
    
    request.get(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const newss = []
            const results = JSON.parse(body).articles;

            for (let i = 0; i < results.length; i++) {
                const news = {
                    id: results[i].source.id,
                    name: results[i].source.name,
                    author: results[i].author,
                    title: results[i].title,
                    description: results[i].description,
                    urlToImage: results[i].urlToImage
                }
                newss.push(news)
            }
			console.log(newss)
            return callback(null, newss)
        } else {
            return callback({message: 'Problem with Google API query.', error: error, statusCode: response.statusCode})
        }
    })
}