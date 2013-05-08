Template.signup.events({
	'submit #register-form' : function(e, t) {
		e.preventDefault();
		
		console.log('submitted');
		
		var email = t.find('#account-email').value
		, password = t.find('#account-password').value
		, name = t.find('#account-name').value
		, image = t.find('#filepath').value;
		
		var profile = new Object();
		profile.name = name;
		profile.picture = image;
		
		
		console.log(image);
		
		Accounts.createUser({email: email, password : password, profile: profile}, function(err){
			if (err) {
				console.log(err);
			} else {
				Meteor.Router.to('/');
			}

		});

		return false;
	}
});