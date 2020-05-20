// file to handle requests to do CRUD operations of users' favourites (saving, updating, etc.)

'use strict'



exports.check = (req, res) => {
	const username = req.authorization.basic.username
	//console.log(username) 
      res.send(` Welcome ${username} ! `)
	
}