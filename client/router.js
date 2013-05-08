
function setFun (_id) {
	// access parameters in order a function args too
	Session.set('currentFunId', _id.params._id);
}

Meteor.pages({
	'/': {to: 'home', nav: 'home'},
	'/about': {to: 'about', nav: 'about'},
	'/login': 'login',
	'/logout': 'logout',
	'/funs': {to: 'funs', nav: 'fun'},
	'/signup': 'signup',
	'/newfun': {to: 'newFun', nav: 'fun'},
	'/funs/:_id': {to: 'showFun', before: [setFun], nav: 'fun' }
}	
);
