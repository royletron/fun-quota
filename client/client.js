avatar = function (user){
	var img = "missing.png";
	if(user){
		if(user.profile.picture != "")
		{
			img = user.profile.picture;
		}
		else{
			img = "missing.png";
		}
	}
	return '<img class="avatar" src="'+img+'" width="60" height="60" />';
}

Template.funs.events({
	'click #add_funs' : function(e) {
		e.preventDefault();

	},
	'click #add_fun_submit' : function(e, t) {
		$('#add-modal').modal('hide');
		var fun_name = t.find('#fun_name').value;
		var fun_value = t.find('#fun_value').value;
		Meteor.call('createFuns', {
			name: fun_name,
			value: fun_value
		}, function (error, fun) {
			if (! error) {
				$('#fun_name').val("");
				$('#fun_value').val("");
			}
		});
	}
});

Template.funs.funs = function () {
	return Funs.find().fetch();
};



Template.avatar_uploader.rendered = function ( ) {
	var element = document.getElementById('constructed-widget');
	filepicker.constructWidget(element);
};

avatarUploaded = function(avatar) {
	$("#avatar").attr("src", avatar+"/convert?w=90&h=90&fit=crop");
	$("#filepath").val(avatar+"/convert?w=90&h=90&fit=crop");
	$("#control-notset").slideUp();
	$("#control-set").slideDown();
}