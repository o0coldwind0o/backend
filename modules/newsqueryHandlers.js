// file to handle requests to make a call to the Google books API and callback with the results

'use strict'

const newsquery = require('./newsquery')

exports.doNewSearch = (req, res, next) => {

	const q = req.query.q  // get the search term from the URL querystring

	newsquery.doNewSearch(q, (err, result) => {
		if (err) return  res.send(501, err)
		return  res.send(result)
		 		
	})
}