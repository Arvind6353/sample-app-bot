var express = require('express');  
var bodyParser = require('body-parser');  
var request = require('request');  
var app = express();

app.use(bodyParser.urlencoded({extended: false}));  
app.use(bodyParser.json());  
app.listen((process.env.PORT || 3000));

// Server frontpage
app.get('/', function (req, res) {  
    res.send('This is TestBot Server');
});

// Facebook Webhook
app.get('/webhook', function (req, res) {  
    if (req.query['hub.verify_token'] === 'sample_bot_token') {
        res.send(req.query['hub.challenge']);
    } else {
        res.send('Invalid verify token');
    }
});

// handler receiving messages
app.post('/webhook', function (req, res) {  

    var events = req.body.entry[0].messaging;
    for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.message && event.message.text) {  
        	if(event.message.text && event.message.text.indexOf("location")!=-1){
              var message={
                  "text":"Please share your location:",
                  "quick_replies":[
                    {
                      "content_type":"location",
                    }
                  ]
                }

            sendMessage(event.sender.id, message);			  
            console.log("location part")
			  }
 		    else if (!picMessage(event.sender.id, event.message.text)) {
            if(!nmlMessage(event.sender.id, event.message.text)){
                sendMessage(event.sender.id, {text: event.message.text +" :) "});
            }
    		}
		  }
    }
    res.sendStatus(200);
});

function sendMessage(recipientId, message) {  
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token: 'EAAN3s3DTH3sBALO66QmZC5ZBWi84dlacSIswselak01NC4fB9WZB8L4tfCjH455QqabDqsjzzldqgEj5Lq0GjOpyMnICCOUHm0lLwF49f6u3iiltvyVSo1oHZAEUGo1Cofza9Xvtr9bCVCiHR31ZAV9n6Y6gBn2Mwg6y7LzbYgAZDZD'},
        method: 'POST',
        json: {
            recipient: {id: recipientId},
            message: message
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending message: ', error);
        } else if (response.body.error) {
            console.log('Error: ', response.body.error);
        }
    });
};

// send rich message with kitten
function picMessage(recipientId, text) {

    text = text || "";
    var values = text.split(' ');
    var flag=false;

    if(values[0].toLowerCase()=='sadness'){

    	var imageUrl = "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTMEkUULON4O5WwmVius4C6DTJvH2NC2spQFhtWVL5jx8rFdvPH3p655pc";
    	flag=true;
    }

   else if(values[0].toLowerCase()=='pizza' || values[0].toLowerCase()=='dominos'){

    	var imageUrl = "http://martinionheels.com/wp-content/uploads/2016/12/15196070_10154507564607745_8533070322777242582_o-1140x596.jpg";
    	flag=true;
    }


   else if(values[0].toLowerCase()=='chinchan' || values[0].toLowerCase()=='shinchan' || values[0].toLowerCase()=='sinchan'){

    	var imageUrl = "https://www.walldevil.com/wallpapers/a49/wallpapers-crayon-background-wallpaper-cartoon.jpg";
    	flag=true;
    }

   else if (values.length === 3 && values[0] === 'kitten') {
        if (Number(values[1]) > 0 && Number(values[2]) > 0) {
		    var imageUrl = "https://placekitten.com/" + Number(values[1]) + "/" + Number(values[2]);
			flag=true;
        }
    }

	var subtitle="How's it ;)";
	if(flag){
		
		if(values[0].toLowerCase()=='pizza' || values[0].toLowerCase()=='dominos'){
		 	subtitle="We should try this again :(";
		}
	     message = {
	                "attachment": {
	                    "type": "template",
	                    "payload": {
	                        "template_type": "generic",
	                        "elements": [{
	                            "title": values[0],
	                            "subtitle": "How's it ;)",
	                            "image_url": imageUrl ,
	                            "buttons": [{
	                                "type": "web_url",
	                                "url": imageUrl,
	                                "title": "View Full Image"
	                                }/*, {
	                                "type": "postback",
	                                "title": "I like this",
	                                "payload": "User " + recipientId + " likes kitten " + imageUrl,
	                            }*/]
	                        }]
	                    }
	                }
	            };
	      sendMessage(recipientId, message);
	}
            return flag;
}


function nmlMessage(recipientId, text){

	var out=text; 

	if(text.toLowerCase().indexOf('hi')!=-1 || text.toLowerCase().indexOf('hello')!=-1)
		out=" Hi :)"

	if(text.toLowerCase().indexOf('how are you')!=-1 || text.toLowerCase().indexOf('how r you')!=-1 || text.toLowerCase().indexOf('how r u')!=-1 || text.toLowerCase().indexOf('how are u')!=-1)
		out=" I am fine. How are you ? "

	sendMessage(recipientId, {text: out });
    return true;
}