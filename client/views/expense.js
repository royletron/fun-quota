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
Template.expense.rendered = function() {
	var dataid = this.data._id;
	$('#'+dataid+'_name').editable({
		value: this.data.name,
		display: false,
		success: function(response, newValue) {
			Meteor.call("updateExpense", dataid, {name: newValue});
		}
	});
	$('#'+dataid+'_type').editable({
		source: [{value: "Travel", text: "Travel"}, {value: "Food & Drink", text: "Food & Drink"}, {value: "Accommodation", text: "Accommodation"}, {value: "Tickets", text: "Tickets"}, {value: "Gifts/Purchases", text: "Gifts/Purchases"}],
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