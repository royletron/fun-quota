Template.userProfile.events({
	'click #update_profile' : function(e, t) {
		e.preventDefault();
		$('#profile-modal').modal('hide');
		var name = t.find('#account-name').value
		, image = t.find('#filepath').value;
		Meteor.users.update(Meteor.userId(), {$set: {profile: {name: name, picture: image}}});
	}
});

Template.userProfile.user = function() {
	var user = Meteor.users.findOne(Session.get('currentUserId'))
	console.log(user);
	return user;
};