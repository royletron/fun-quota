Funs = new Meteor.Collection("funs");

Meteor.methods({
	createFun: function(options) {
		return Funs.insert({
			user: this.userId,
			name: options.name,
			expenses: [],
			multipliers: [],
			date: options.date,
			duration: options.duration,
			happening: options.happening
		});
	},
	updateFun: function(funId, options) {
		//console.log(options);
		Funs.update(funId, { $set: options });
	},
	addExpenseToFun: function (funId, expenseId) {
    Funs.update(funId, { $addToSet: { expenses: expenseId } });
	},
	addMuliplierToFun: function (funId, multiplierId) {
	  Funs.update(funId, { $addToSet: { expenses: multiplierId } });
	}
})