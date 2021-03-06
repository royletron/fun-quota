Template.login.events({
	'submit #login-form' : function(e, t){
		e.preventDefault();
		
		var email = t.find('#login-email').value
		, password = t.find('#login-password').value;
		
		Meteor.loginWithPassword(email, password, function(err){
			if (err) {
				console.log(err);
			}
			else {
				console.log('Logged in');
			}
		});
		return false; 
	},
	'click #facebook-login-button' : function(){
		Meteor.loginWithFacebook();
	}
});
Template.logout.rendered = function() {
	Meteor.logout(function(err){
			Meteor.Router.to(Meteor.homePath());
		})
};

Template.user_info.events({
	'click #logout' : function(e) {
		e.preventDefault();
		Meteor.logout(function(err){
			Meteor.Router.to(Meteor.homePath());
		})
	}
});