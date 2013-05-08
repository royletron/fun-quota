Multipliers = new Meteor.Collection('multipliers');

Meteor.methods({
	createMultiplier: function(options) {
		return Multiplier.insert({
			type: options.type,
			cost: options.cost
		});
	}
})