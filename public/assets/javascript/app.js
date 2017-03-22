var google_config = {
	clientID: "277172047453-p51btc78lu7fatpjn3kkk75dula5kao3",
	apiKey: "J0ljax83PhpzveezJWa1uxNW",
	scope: "https://www.googleapis.com/auth/calendar"
};


function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	user = profile;
	console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
	console.log('Name: ' + profile.getName());
	console.log('Image URL: ' + profile.getImageUrl());
	console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
	console.log('Access Token: ' + JSON.stringify(profile));
};

$('#update-calendar').on('click', function(){

});
