Mates = new Meteor.Collection('mates');

Meteor.methods({
	requestMate: function(toUserEmail)
	{
		var fromUser = Meteor.user();
		var toUser = Meteor.users.findOne({"emails.address": toUserEmail});
		if(fromUser && toUser)
		{
			if(Mates.findOne({from: fromUser._id, to: toUser._id}))
			{
				console.log("already requested");
			}
			else{
				Mates.insert({from: fromUser._id, to: toUser._id, when: new Date().getTime()});
			}
		}
	}
})