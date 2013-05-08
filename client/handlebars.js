Handlebars.registerHelper("getAvatar", function(user) {
	return avatar(user);
});
Handlebars.registerHelper("setActive", function(pages) {
	var rtn = 'class="active"';
	console.log(pages);
	if(_.contains(pages, Meteor.Router.page()))
	{
		return rtn;
	}
	else{
		return "";
	}
});
Handlebars.registerHelper("getAvatarID", function(ID) {
	if(ID != undefined){
		var user = Meteor.users.findOne(ID);
		return avatar(user);
	}
	else{
		return "";
	}
});
Handlebars.registerHelper("getHappening", function(fun) {
	if(fun){
		if(fun.happening == "y")
		{
			if(moment().valueOf() > fun.date)
				return '<span class="label label-info">Happened!</span>';
			else
				return '<span class="label label-success">Happening!</span>';
		}
		else{
			if(moment().valueOf() > fun.date)
				return '<span class="label label-important">Didn'+"'"+'t happen</span>';
			else
				return '<span class="label label-warning">Not sure...</span>';
		}
	}
});
Handlebars.registerHelper("fromNow", function(date) {
	if(date)
		return moment(date).add('days', 1).fromNow();
});
Handlebars.registerHelper("expensesTotal", function(fun) {
	if(fun){
		var total = 0;
		var expenses = Expenses.find({_id: {$in: fun.expenses}}).fetch();
		for(var i = 0; i < expenses.length; i++)
		{
			total = total + parseFloat(expenses[i].cost);
		}
		return accounting.formatMoney(total, "£");;
	}
});
Handlebars.registerHelper("formatMoolah", function(number) {
	if(number)
		return accounting.formatMoney(parseFloat(number), "£");
});
Handlebars.registerHelper("getDurationLength", function(duration) {
	if(duration)
	{
		switch(parseInt(duration))
		{
			case 30:
				return "30 mins";
				break;
			case 60:
				return "1 hr";
				break;
			case 120:
				return "2 hrs";
				break;
			case 180:
				return "3 hrs";
				break;
			case 360:
				return "6 hrs";
				break;
			case 720:
				return "all day";
				break;
		}
	}
});
Handlebars.registerHelper("hasHappened", function(fun) {
	if(fun)
	{
		return(moment().valueOf() > fun.date);
	}
});
Handlebars.registerHelper("totalFun", function(fun) {
	if(fun)
	{

		var total = 0;
		var expenses = Expenses.find({_id: {$in: fun.expenses}}).fetch();
		for(var i = 0; i < expenses.length; i++)
		{
			total = total + parseFloat(expenses[i].cost);
		}
		if(total < 10)
			total = 10;
		var multipliers = Multipliers.find({_id: {$in: fun.multipliers}}).fetch();
		for(var i = 0; i < multipliers.length; i++)
		{
			total = total * parseFloat(multipliers[i].cost);
		}
		return total * fun.duration;
	
	}
	//return Handlebars.helpers.expensesTotal(fun);
})