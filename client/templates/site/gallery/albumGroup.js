// An album group is a sampling of an album
// sampleCount = # random sample images from album
// showTitle = true/false - show the album title box amidst samples

Template.albumGroup.onRendered(function() {
	if (!isTouchDevice()) {
		$('.itemP').hover(
	        function(){
	            $(this).find('.caption').fadeIn(300);

                /*document.body.style.backgroundImage = "url('/img/age1.jpg')";*/

                /*var string = "url('this.url store='image_md'')";
                alert(string)
                document.getElementById("bobandy").style.backgroundImage = string;
                document.getElementsByClassName("caption").src = string;*/



	        },

	        function(){
	            $(this).find('.caption').fadeOut(300);


	        }
	    );
	}
});

Template.albumGroup.helpers({
	samples: function () {
		return Media.find({'metadata.albums._id': this._id}, { limit: getSetting('numberSamplesFromAlbum', 2)}).fetch();
	},
	featured: function () {
		var featured = _.findWhere(this.content, { isFeatured: 1});
		if (typeof featured === undefined || ! featured)
			featured = this.content[0];
		return Media.findOne({_id: featured.id});
	},
	count: function () {
	    if (!! this.content)
	      return this.content.length;
	},
});

Template.albumGroup.events({
	'mouseover .item-album': function (e) {
		$('#item-' + Template.parentData(0).slug ).addClass('album-selected').fadeIn();

	},
	'mouseout .item-album': function (e) {
		$('#item-' + Template.parentData(0).slug ).removeClass('album-selected');
	},
	'click .album-link': function (e) {
        e.preventDefault();
        Router.go( 'album', {slug: Template.parentData(0).slug});
    },
});


