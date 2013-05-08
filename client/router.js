
function setFun (_id) {
	// access parameters in order a function args too
	Session.set('currentFunId', _id.params._id);
}

function checkLoggedIn() {
	if(!Meteor.user())
	{
		this.redirect(Meteor.homePath());
	}
}
function checkLoggedOut() {
	if(Meteor.user())
	{
		this.redirect(Meteor.homePath());
	}
}

Meteor.pages({
	'/': {to: 'home', nav: 'home'},
	'/about': {to: 'about', nav: 'about'},
	'/login': {to: 'login', nav: 'home', before: [checkLoggedOut]},
	'/logout': 'logout',
	'/funs': {to: 'funs', nav: 'fun', before: [checkLoggedIn]},
	'/signup': {to: 'signup', nav: 'home', before: [checkLoggedOut]},
	'/newfun': {to: 'newFun', before: [checkLoggedIn], nav: 'fun'},
	'/funs/:_id': {to: 'showFun', before: [checkLoggedIn, setFun], nav: 'fun' }
}	
);
