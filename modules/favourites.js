// file to do CRUD operations of users' favourites (saving, updating, etc.)

'use strict'
const db = require('./db')
let dbConnection = db.dbConnection  // use 'let' so we can override it in testing

exports.validate = (fav, callback) => {

    // check that fav matches our criteria

    if (!fav) return callback({message: 'Need to send some data'})
    if (!fav.id || !fav.name || !fav.description || !fav.title || !fav.author || !fav.description || !fav.urlToImage) return callback({message: 'ID, title, authors, description: REQUIRED'})
    if (fav.review && typeof fav.review !== 'string') return callback({message: 'Review must be a string'})
    if (fav.stars && fav.stars < 0) return callback({message: 'Stars must be over 0'})

    // all the checks passed!
    return callback(null, true)

}


exports.list = (username, callback) => {

    // connect to db and return all of its values

    dbConnection(`favourites/${username}`, (err, db) => {
        if (err) return callback(err)
        return callback(null, db.values())
    })

}


exports.add = (username, news, callback) => {

    // connect to db and save new news, unless ID is already taken

    dbConnection(`favourites/${username}`, (err, db) => {
        if (err) return callback(err)
        
        if (db.getItemSync(news.id)) return callback({message: 'id already exists', id: news.id})

        db.setItem(news.id, news, err => {
            if (err) {
                return callback({message: 'Could not save news', news: news})
            } else {
                return callback(null, {message: 'Saved news', news: news})
            }
        })

    })
}

exports.get = (username, newsid, callback) => {

    // connect to db and look up the news by ID

    dbConnection(`favourites/${username}`, (err, db) => {
        if (err) return callback(err)
        
        db.getItem(newsid, (err, news) => {
            if (err) {
                return callback({message: 'Could not access list of newss'})
            } else if (!news) {
                return callback({message: 'news not found', id: newsid})
            } else {
                return callback(null, {message: 'news found', news: news})
            }
        })

    })
}

exports.delete = (username, newsid, callback) => {

    // connect to db and look up the news by ID

    dbConnection(`favourites/${username}`, (err, db) => {
        if (err) return callback(err)
        
        db.removeItem(newsid, (err, news) => {
            if (err) {
                return callback({message: 'Could not access list of newss'})
            } else if (!news) {
                return callback({message: 'news not found', id: newsid})
            } else {
                return callback(null, {message: 'news found', news: news})
            }
        })

    })
}
