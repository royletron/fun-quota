Meteor.startup(function () {
	// code to run on server at startup
});

Accounts.onCreateUser(function(options, user) {
	if(options.profile.name.length<2)
		throw new Meteor.Error(403, "Please provide a name.");
	if (options.profile)
	{
		if(user.services.facebook)
			options.profile.picture = getFbPicture(user.services.facebook.accessToken);
		user.profile = options.profile;
	}
	return user;
});


Accounts.loginServiceConfiguration.remove({
  service: "facebook"
});
Accounts.loginServiceConfiguration.insert({
  service: "facebook",
  appId: "198106013670597",
  secret: "d474643c977961a56a214f7f0f125628"
});

var getFbPicture;

getFbPicture = function(accessToken) {
  var result;
  result = Meteor.http.get("https://graph.facebook.com/me", {
    params: {
      access_token: accessToken,
      fields: 'picture'
    }
  });
  if (result.error) {
    throw result.error;
  }
  return result.data.picture.data.url;
};