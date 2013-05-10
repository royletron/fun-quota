
function setFun (_id) {
	// access parameters in order a function args too
	Session.set('currentFunId', _id.params._id);
}

function setUser(_id) {
	Session.set('currentUserId', _id.params._id);
	if(_id === Meteor.userId())
	{
		this.template("editUserProfile");
		this.done();
	}
}

function checkLoggedIn() {
	if (Meteor.loggingIn()) {
    	// dynamically set the template
    	this.template("loading");

    	// stop downstream callbacks from running
    	this.done();
  	}
  	else{	
		if(!Meteor.user())
		{
			this.redirect(Meteor.homePath());
		}
	}
}
function checkLoggedOut() {
	if (Meteor.loggingIn()) {
    	// dynamically set the template
    	this.template("loading");

    	// stop downstream callbacks from running
    	this.done();
  	}
  	else{	
		if(Meteor.user())
		{
			this.redirect(Meteor.homePath());
		}
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
	'/funs/:_id': {to: 'showFun', before: [checkLoggedIn, setFun], nav: 'fun' },
	'/users/:_id': {to: 'userProfile', before: [checkLoggedIn, setUser], nav: 'user'}
}	
);
