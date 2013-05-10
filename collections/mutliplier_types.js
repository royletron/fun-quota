MultiplierTypes = new Meteor.Collection('multipliertypes');
MultiplierTypesSeed = [{ name: "Other Payer", cost: "0.6", affects: ["Travel", "Food & Drink", "Accommodation", "Tickets"] }, { name: "Had a Walk", cost: "0.8", affects: [] }, { name: "Family Event", cost: "0.8", affects: ["Food & Drink", "Travel"] }, { name: "Social Engagement", cost: "0.8", affects: ["Food & Drink", "Travel"] }]

Meteor.startup(function () {
	for(var i=0; i < MultiplierTypesSeed.length; i++)
	{
		Meteor.call("createMultiplierType", MultiplierTypesSeed[i])
	}
});

Meteor.methods({
	createMultiplierType: function(options) {
		if(!MultiplierTypes.findOne({name: options.name}))
		{
			return MultiplierTypes.insert({
				name: options.name,
				cost: options.cost,
				affects: options.affects
			});
		}	
	}
})