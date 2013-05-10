Meteor.methods({
	getUserById: function(id) {
		return Meteor.users.findOne(id);
	}
})