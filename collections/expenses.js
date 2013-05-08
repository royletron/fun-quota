Expenses = new Meteor.Collection('expenses');

Meteor.methods({
	createExpense: function(options) {
		return Expenses.insert({
			name: options.name,
			type: options.type,
			cost: options.cost
		});
	},
	updateExpense: function(expId, options) {
		//console.log(options);
		Expenses.update(expId, { $set: options });
	}
})