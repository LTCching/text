var http = require("http");
var fs = require("fs");
var qs = require("querystring");
var mongodb = require("mongodb");
var MongoClient = require("mongodb").MongoClient;
require("events").EventEmitter.prototype._maxListeners = 100;

var mongodbServer = new mongodb.Server("localhost", 27017, { auto_reconnect: true, poolSize: 10 });
var db = new mongodb.Db("dataB", mongodbServer);
var usersssssss="";
var isTriedLogin = false, isLoginSuccessful = false; var canRegis = true;

var server = http.createServer(function(request, response) {
    if (request.method == "POST") {
	//		console.log("post call");
        var formData = "", msg = "", obj = "";
        return request.on("data", function(data) {
			formData += data;
					
			}).on('end', function(chunk) {
					
					var user;
				user = qs.parse(formData);
				msg = JSON.stringify(user);
				console.log("305bbbcde="+msg);
			//	response.writeHead(200, {
		//		  "Content-Type": "application/json",
		//		  "Content-Length": msg.length
		//		});
				obj = JSON.parse(msg);
				console.log("567"+obj['act']);
				
				// Prevent signup page runs this part
				if (request.url == "/index.html") {
						console.log("12344"+request.url);

						
						
						
	   if(obj['act']=="signup"){
				//if (obj.signup != null) {

					console.log("SIGNUP");
					// Send obj data to dataB
			 
					db.open(function() {
						
						db.collection("user", function(err, collection) {
							
							collection.insert({

								username: obj.ac,
								password: obj.pw
							}, function(err, data) {
								
								if (data) {
									console.log("Successfully Insert");
									 //response.end(200, {'success': "apple"});
									 response.end('{"Sign up Successfully"}');
									
								} else {
									console.log("Failed to Insert");
								}
							});
						});
					});

	}else if(obj['act']=="login"){
				//if (obj.signup != null) {
//	response.end('{"success" : "Updated Successfully", "status" : 200}');
			
					console.log("LOGIN");
					// Send obj data to dataB
				//	db.open(function() {
						
				//		db.collection("user", function(err, collection) {
							
							//collection.find({

						//		username: obj.ac,
					//			password: obj.pw
					//		}, function(err, data) {
								
							//	if (data) {
									console.log("Successfullyfound");
	
		
		
		
									
									var username = obj.ac;
					        var password = obj.pw;
									
									console.log("input login="+obj.ac);
									console.log("input pass="+obj.pw);
									
									 MongoClient.connect("mongodb://localhost:27017/dataB", function (err, db) {
						db.collection("user", function (err, collection) {
							collection.find().toArray(function(err, items) {
								if(err) throw err;
								// Check whether there is data in the dataB
								console.log(items.length);
								if (items != "") {
									// Check whether the user account exists
									for (var i=0; i<items.length; i++) {
										
									//	if (username == items[i].ac && password == items[i].pw) {
										//console.log("user="+items[i].username);
									//	console.log("pass="+items[i].password);
									//	console.log("user1="+obj.ac);
									//	console.log("pass1="+obj.pw);
										if (items[i].username ==obj.ac && items[i].password == obj.pw) {
											usersssssss= items[i].username;
								
										
									//		console.log("user="+items[i].username);
									//	console.log("pass="+items[i].password);
									//		console.log("USER FOUND CONFIGURATION");
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
											isLoginSuccessful = true;
										}else{
												//response.end('{"success" : "Updated Successfully", "status" : 200}');
										}
										
										
									}
									
								
								/*	  fs.readFile('./json.html', function(error, content) {
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
											console.log("end here");
                });*/
									
									if(isLoginSuccessful == false){
										  console.log("Fail to login");
										//	response.end('LOGIN FAIL');
									}else{
										 console.log("LOGIN OK");
										
											response.end("LOGIN OK");
									
									}
								}
							});
						});	
				});
							//	} else {
								//	console.log("Failed to Insert");
							//	}
						//	});
						//});
				//	});

	}
					}//if request.url = login.html
        
  })	
    }else if(request.url == "/search2"){
			fs.readFile('./search.html', function(error, content) {
				console.log("search page");
                    response.writeHead(200, { 'Content-Type': 'text/html' });
                    response.end(content, 'utf-8');
			});
		} else {
			
		// Get
		fs.readFile("./" + request.url, function (err, data) {
			var dotoffset = request.url.lastIndexOf(".");
			var mimetype = dotoffset == -1
				? "text/plain"
				: {
					".html": "text/html",
					".ico" : "photo/x-icon",
					".jpg" : "photo/jpeg",
					".png" : "photo/png",
					".gif" : "photo/gif",
					".css" : "text/css",
					".js"  : "text/javascript"
				}[request.url.substr(dotoffset)];
			if (!err) {
				response.setHeader("Content-Type", mimetype);
				response.end(data);
				console.log(request.url, mimetype);
			} else {
				response.writeHead(302, {"Location": "/index.html"});
				response.end();
			}
		});
    }
});

// if(obj['act']=="addfav"){
				//if (obj.signup != null) {

	//				console.log("addfav");
					// Send obj data to dataB
			 
		//			db.open(function() {
						
		//				db.collection("addfav", function(err, collection) {
							
//							collection.insert({

			//					useraddfav : obj.clinics
			//				}, function(err, data) {
								
						//		if (data) {
						//			console.log("Successfully Add To Favorite List");
									 //response.end(200, {'success': "apple"});
						//			 response.end('{"success" : "Updated Successfully", "status" : 200}');
					//			} else {
						//			console.log("Failed to Insert");
					//			}
			//				});
		//				});
	//				});

//	}

//MongoClient.connect("mongodb://localhost:27017/MyDb2", function (err, db) {
    
 //   db.collection('change_password', function (err, collection) {
        
   //     collection.update({id: 1}, { $set: { password_old: '', password_1: '', password_2: ''} }, {w:1},
                                                 //   function(err, result){
                                                    //            if(err) throw err;    
                                                 //               console.log('Document Updated Successfully');
                                                    //    });
//
//        collection.remove({id:2}, {w:1}, function(err, result) {
        
    //        if(err) throw err;    
        
     //       console.log('Document Removed Successfully');
   //     });

 //   });
                
//});

//db.open(function() {
    /* Select 'contact' collection */
 //   db.collection('personal_details', function(err, collection) {
        /* Insert a data */
   //     collection.insert({
    //       firstname: '',
	//				lastname: '',
   //         company: '',
	//				address: '',
	//				city: '', 
	//				zip: '', 
	//				state: '', 
	//				country: '', 
	//				phone: '', 
	//				email_account: ''
           

   //     }, function(err, data) {
   //         if (data) {
   //             console.log('Successfully Insert');
   //         } else {
    //            console.log('Failed to Insert');
   //         }
  //     });
  //      });
	//        });



server.listen(3000);

console.log("Server running at http://127.0.0.1:3000/");

