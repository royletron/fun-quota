Handlebars.registerHelper("getAvatar", function(user, size) {
	return avatar(user, size);
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
Handlebars.registerHelper("getAvatarID", function(ID, size) {
	size = typeof size !== 'undefined' ? size : 50;
	if(ID != undefined){
		var user = Meteor.users.findOne(ID);
		return avatar(user, size);
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
function getRow(left, right)
{
	return '<div class="row-fluid"><div class="span8" style="text-align:right">'+left+'</div><div class="span4">'+right+'</div></div>';
}
function roundIt(num)
{
	return Math.round(num*100)/100;
}
Handlebars.registerHelper("totalBreakdown", function (fun) {
	if(fun)
	{
		var total = 0;
		var returnHtml = ""
		var expenses = Expenses.find({_id: {$in: fun.expenses}}).fetch();
		var first = true;
		_.each(expenses, function(expense) {
			if(!first)
			{
				returnHtml = returnHtml + getRow('', '<strong>+</strong>')
			}
			first = false;
			var type = ExpenseTypes.findOne({_id: expense.type});
			returnHtml = returnHtml+getRow('<strong>Cost of</strong> '+expense.name+' =', accounting.formatMoney(parseFloat(expense.cost), "")+' (£)');
			var thiscost = (parseFloat(expense.cost) * parseFloat(type.cost));
			returnHtml = returnHtml+getRow('<strong>Multiplied by</strong> '+type.name+' ('+type.cost+') =', roundIt(thiscost));
			var multipliers = Multipliers.find({_id: {$in: fun.multipliers}}).fetch();
			_.each(multipliers, function(multiplier) {
				var mtype = MultiplierTypes.findOne({_id: multiplier.type})
				if(_.contains(mtype.affects, type.name) || (mtype.affects.length == 0))
				{
					thiscost = thiscost * mtype.cost;
					returnHtml = returnHtml+getRow('<strong>Multiplied by</strong> '+mtype.name+' ('+mtype.cost+') =', roundIt(thiscost));
				}
			})
			total = total + thiscost;
			returnHtml = returnHtml + getRow('<strong>Running total</strong> =', roundIt(total));
		});
		returnHtml = returnHtml + getRow('<strong>Multiplied by time</strong> ('+fun.duration+' mins) =', roundIt(total * fun.duration));
		return returnHtml;
	
	}
})
Handlebars.registerHelper("totalFun", function(fun) {
	if(fun)
	{
		var total = 0;
		var expenses = Expenses.find({_id: {$in: fun.expenses}}).fetch();
		_.each(expenses, function(expense) {
			var type = ExpenseTypes.findOne({_id: expense.type});
			var thiscost = (parseFloat(expense.cost) * parseFloat(type.cost));
			var multipliers = Multipliers.find({_id: {$in: fun.multipliers}}).fetch();
			_.each(multipliers, function(multiplier) {
				var mtype = MultiplierTypes.findOne({_id: multiplier.type})
				if(_.contains(mtype.affects, type.name) || (mtype.affects.length == 0))
				{
					thiscost = thiscost * mtype.cost;
				}
			})
			total = total + thiscost;
		});
		if(total < 10)
			total = 10;

		return roundIt(total * fun.duration);
	
	}
	//return Handlebars.helpers.expensesTotal(fun);
})