$('#search-btn').on('click', function() {
        var near = $('#location-input').val();
        var terms = $('#keyword-input').val();
        console.log(near);
        console.log(terms);

        function cb(data) {
            console.log(data);
        }

        var auth = {
            consumerKey: "cIiDerAPLGq3TL2Wn0YZ3Q",
            consumerSecret: "ubN6DaATH4Vp1n4C0tksh108HzM",
            accessToken: "epmbweJTNH9H4Bib7HJD7VHnXtmsqR4m",
            accessTokenSecret: "qBc-AaeYCOfiXzGqbhm6kCJu0es",
            serviceProvider: {
                signatureMethod: "HMAC-SHA1"
            }
        };

        var near = $('#location-input').val();
        var terms = $('#keyword-input').val();
        var accessor = {
            consumerSecret: auth.consumerSecret,
            tokenSecret: auth.accessTokenSecret
        };

        var parameters = [];
        parameters.push(['term', terms]);
        parameters.push(['location', near]);
        parameters.push(['limit', 8]);
        parameters.push(['callback', 'cb']);
        parameters.push(['oauth_consumer_key', auth.consumerKey]);
        parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
        parameters.push(['oauth_token', auth.accessToken]);
        parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

        var message = {
            'action': 'https://api.yelp.com/v2/search',
            'method': 'GET',
            'parameters': parameters
        };

        OAuth.setTimestampAndNonce(message);
        OAuth.SignatureMethod.sign(message, accessor);

        var parameterMap = OAuth.getParameterMap(message.parameters);

 
        $.ajax({
                'url': message.action,
                'data': parameterMap,
                'dataType': 'jsonp',
                'jsonpCallback': 'cb',
                'cache': true
            })
            .done(function(data, textStatus, jqXHR) {
                console.log(data);
                var places = data.businesses;
                for ( i=0; i< places.length ; i++) {
                    var img = places[i].image_url;
                    var name = places[i].name;
                    var rating = places[i].rating_img_url;
                    var reviewCount = places[i].review_count;
                    var categories = places[i].categories[0];
                    $('#result-container').append(`
                        <div class="ui fluid card">
                          <div class="image">
                            <img src="${img}">
                          </div>
                          <div class="content">
                            <a class="header">${name}</a>
                            <div class="meta">
                              <span class="date"> ${categories}</span>
                            </div>
                            <div class="description">
                              <img src="${rating}">
                            </div>
                          </div>
                          <div class="extra content">
                            <a>
                              <i class="user icon"></i>
                              Reviews: ${reviewCount}
                            </a>
                          </div>
                        </div>
                    `);
                }
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
            });
});




