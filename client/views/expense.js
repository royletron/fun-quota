Template.new_expense.events({
	'click #add-expense' : function(e, t) {
		e.preventDefault();
		
		var name = t.find('#expense-name').value
		, cost = t.find('#expense-cost').value
		, type = $('#expense-type').val();
		
		
		Meteor.call('createExpense', {
			name: name,
			cost: cost,
			type: type
		}, function (error, exp) {
			if (! error) {
				console.log(exp);
				Meteor.call('addExpenseToFun', Session.get('currentFunId'), exp, function(error) {
					if(! error) {
						$('#expense-modal').modal('hide');
					}
				});
			}
		});

		return false;
	}
});
Template.expense.events({
	'click #remove' : function(e, t) {
		e.preventDefault();
		Meteor.call("removeExpense", this._id);
	}
});
Template.new_expense.expense_types = function() {
	return ExpenseTypes.find().fetch();
}
Template.expense.expense_type = function() {
	return ExpenseTypes.findOne({_id: this.type});
}
Template.expense.rendered = function() {
	var dataid = this.data._id;
	var source = [];
	var sourcedata = ExpenseTypes.find().fetch();
	_.each(sourcedata, function(item){
		source.push({value: item._id, text: item.name})
	});
	$('#'+dataid+'_name').editable({
		value: this.data.name,
		display: false,
		success: function(response, newValue) {
			Meteor.call("updateExpense", dataid, {name: newValue});
		}
	});
	$('#'+dataid+'_type').editable({
		source: source,
		display: false,
		value: this.data.type,
		showbuttons: false,
		success: function(response, newValue) {
			//console.log(newValue);
				Meteor.call("updateExpense", dataid, {type: newValue});
			}
	});
	$('#'+dataid+'_cost').editable({
		value: this.data.cost,
		display: false,
		success: function(response, newValue) {
			Meteor.call("updateExpense", dataid, {cost: newValue});
		}
	});
}