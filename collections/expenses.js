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
	},
	removeExpense: function(expId) {
		Expenses.remove(expId);
	},
	totalExpenses: function(expenses) {
		var total = 0;
		var expenses = Expenses.find({_id: {$in: expenses}}).fetch();
		for(var i = 0; i < expenses.length; i++)
		{
			total = total + parseFloat(expenses[i].cost);
		}
		console.log(total);
		return total;
	}
})