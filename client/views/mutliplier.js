Template.new_multiplier.events({
	'click #add-multiplier' : function(e, t) {
		e.preventDefault();
		
		var name = t.find('#multiplier-name').value
		, type = $('#multiplier-type option:selected').val()
		

		Meteor.call('createMultiplier', {
			name: name,
			type: type
		}, function (error, exp) {
			if (! error) {
				Meteor.call('addMultiplierToFun', Session.get('currentFunId'), exp, function(error) {
					if(! error) {
						$('#multiplier-modal').modal('hide');
					}
				});
			}
		});

		return false;
	}
});
Template.new_multiplier.multi_types = function() {
	return MultiplierTypes.find().fetch();
}

Template.multiplier.multiplier_type = function() {
	console.log(this);
	return MultiplierTypes.findOne({_id: this.type});
}