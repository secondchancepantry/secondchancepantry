var clientId = '277172047453-p51btc78lu7fatpjn3kkk75dula5kao3';
var apiKey = 'AIzaSyBEfyrju1DaN8Tv-zALl1uBPhwNSJPycnw'
var discoveryDocs = [
	"https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest", 
	"https://people.googleapis.com/$discovery/rest?version=v1"
];
var scopes = "https://www.googleapis.com/auth/calendar";
var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');
var calendarId = "";
var user = {
	photo : "",
	first : "",
	last : "",
	full : ""
};

// function onSignIn(googleUser) {
// 	var profile = googleUser.getBasicProfile();
// 	user = profile;
// 	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
// 	console.log('Name: ' + profile.getName());
// 	console.log('Image URL: ' + profile.getImageUrl());
// 	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// 	console.log('Access Token: ' + JSON.stringify(profile));
// };
function handleClientLoad() {
	gapi.load('client:auth2', initClient);
}

function initClient() {
	gapi.client.init({
		apiKey: apiKey,
		discoveryDocs: discoveryDocs,
		clientId: clientId,
		scope: scopes
	}).then(function () {
		// Listen for sign-in state changes.
		gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

		// Handle the initial sign-in state.
		updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
		authorizeButton.onclick = handleAuthClick;
		signoutButton.onclick = handleSignoutClick;
	});
}

function updateSigninStatus(isSignedIn) {
	if (isSignedIn) {
		authorizeButton.style.display = 'none';
		signoutButton.style.display = 'block';
		getPeopleDetails();
		getCalendarId();
	} else {
		authorizeButton.style.display = 'block';
		signoutButton.style.display = 'none';
	}
}

function handleAuthClick(event) {
	gapi.auth2.getAuthInstance().signIn();
}

function handleSignoutClick(event) {
	gapi.auth2.getAuthInstance().signOut();
}

function appendPre(message) {
	var pre = document.getElementById('content');
	var textContent = document.createTextNode(message + '\n');
	pre.appendChild(textContent);
}

function getCalendarId() {
	gapi.client.calendar.calendarList.list({
    }).then(function(response){
    	for (var i = 0; i < response.result.items.length; i++){
    		if (response.result.items[i].primary) {
    			calendarId = response.result.items[i].id;
    			break;
    		};
    	};
    });
}

function getPeopleDetails() {
	gapi.client.people.people.get({
		resourceName: 'people/me'
	}).then(function(response) {
		getCalendarId()
		user.photo = response.result.photos[0].url;
		user.first = response.result.names[0].givenName;
		user.last = response.result.names[0].familyName;
		user.full = response.result.names[0].displayName;
		drawPeople();
	}, function(reason) {
		console.log('Error: ' + reason.result.error.message);
	});
}

function drawPeople() {
	$('#content').append('<img src="' + user.photo + '" height="80px">');
	$('#content').append('<p>Welcome, ' + user.first + '</p>');
}

function writeCalEvent(food, date) {
	var event = {
		'summary': food + " expires",
		'description': "use " + food + " by today!",
		'start': {
			'date': date
		},
		'end': {
			'date': date
		},
		'reminders': {
			'useDefault': false,
			'overrides': [
				{'method': 'email', 'minutes': 24 * 60 * 5},
				{'method': 'email', 'minutes': 24 * 60 * 2},
				{'method': 'popup', 'minutes': 24 * 60 * 1},
			]
		}
	};

	var request = gapi.client.calendar.events.insert({
		'calendarId': calendarId,
		'resource': event
	});

	request.execute(function(event) {
		appendPre('Event created: ' + event.htmlLink);
	})
}

$("#btn-submit").on('click', function(event){
	event.preventDefault();
	var food = $('#ingr-name').val().trim();
	var date = $('#expr-date').val().trim();
	writeCalEvent(food, date);
})


$(document).ready(function() {
	handleClientLoad();
	if (this.readyState === 'complete') this.onload()
})

