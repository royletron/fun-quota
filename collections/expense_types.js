ExpenseTypes = new Meteor.Collection('expensetypes');
ExpenseTypesSeed = [{ name: "Travel", cost: "0.9"}, { name: "Food & Drink", cost: "1" }, { name: "Accommodation", cost: "1.05" }, { name: "Tickets", cost: "1" }, { name: "Gifts/Purchases", cost: "1.2"}]

Meteor.startup(function () {
	for(var i=0; i < ExpenseTypesSeed.length; i++)
	{
		Meteor.call("createExpenseType", ExpenseTypesSeed[i])
	}
});

Meteor.methods({
	createExpenseType: function(options) {
		if(!ExpenseTypes.findOne({name: options.name}))
		{
			return ExpenseTypes.insert({
				name: options.name,
				cost: options.cost
			});
		}	
	}
})