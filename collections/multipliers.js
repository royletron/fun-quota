Multipliers = new Meteor.Collection('multipliers');

Meteor.methods({
	createMultiplier: function(options) {
		return Multipliers.insert({
			name: options.name,
			type: options.type
		});
	}
})