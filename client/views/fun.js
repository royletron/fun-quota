Template.newFun.rendered = function () {
	var myDate = new Date();
	var day = myDate.getDate();
	if(day < 10)
		day = "0"+day;
	var month = myDate.getMonth()+1;
	if(day < 10)
		month = "0"+month;
	var prettyDate = day + '-' + month + '-' +myDate.getFullYear();
	$('#dp3').attr('data-date', prettyDate);
	$('#fun-date').val(prettyDate);
	$('#dp3').datepicker();
	$('#fun-date').attr('readonly', "");
}
Template.newFun.events({
	'submit #add-fun' : function(e, t) {
		e.preventDefault();
		
		var date = t.find('#fun-date').value
		, name = t.find('#fun-name').value
		, happening = $('input:radio[name=fun-going]:checked').val()
		, duration = $('#fun-duration').val()
		, user = Meteor.userId;
		
		Meteor.call('createFun', {
			name: name,
			date: moment(date, "DD-MM-YYYY").valueOf(),
			duration: duration,
			submitter: user,
			happening: happening
		}, function (error, fun) {
			if (! error) {
				Meteor.Router.to('/fun/'+fun);
			}
		});

		return false;
	}
});
Template.showFun.fun = function() {
	var fun = Funs.findOne(Session.get('currentFunId'));
	return fun;
};
Template.showFun.expense_items = function(fun) {
	return Expenses.find({_id: {$in: fun.expenses}}).fetch();
};
Template.showFun.rendered = function() {
	var fun = Funs.findOne(Session.get('currentFunId'));
	if(fun)
	{
		$('#fun_name').editable({
			value: fun.name,
			display: false,
			success: function(response, newValue) {
				Meteor.call("updateFun", Session.get('currentFunId'), {name: newValue});
			}
		});
		$('#fun_duration').editable({
			source: [{value: 30, text: "30 mins"}, {value: 60, text: "1 hr"}, {value: 120, text: "2 hrs"}, {value: 180, text: "3 hrs"}, {value: 360, text: "6 hrs"}, {value: 720, text: "all day"}],
			display: false,
			value: fun.duration,
			showbuttons: false,
			success: function(response, newValue) {
					//console.log(newValue);
					Meteor.call("updateFun", Session.get('currentFunId'), {duration: newValue})
				}
			});
		$('#fun_happening').editable({
			source: [{value: "y", text: "Yes"}, {value: "n", text: "No"}],
			display: false,
			value: fun.happening,
			showbuttons: false,
			success: function(response, newValue) {
					//console.log(newValue);
					Meteor.call("updateFun", Session.get('currentFunId'), {happening: newValue})
				}
			});
		$('#fun_date').editable({
			format: 'yyyy-mm-dd',
			display: false,
			viewformat: 'dd/mm/yyyy',    
			value: moment(fun.date).format('YYYY-MM-DD'),
			placement: "right",
			clear: false,
			success: function(response, newValue) {
				Meteor.call("updateFun", Session.get('currentFunId'), {date: moment(newValue).valueOf()})},
				datepicker: {
					weekStart: 1
				}
			});
	}
}