
$(window).load(function () {

	var url = 'http://jazzti.ps/?json=1&post_type=skiva';

    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(data) {
          // console.log(data);
          $.each(data.posts, function (i, item) {
          	var img = item.attachments[0].url;
          	var title = item.title;
          	$('.albums').append('<div class="record"><img src="'+img+'"><h3>'+title+'</h3><button class="sp-button">Skapa spellista</button>');
          });
        }
      });

	// throbber.hide();

});


$(document).ready(function() {
	var tracks = document.getElementById('wrapper');
	var throbber = Throbber.forElement(tracks);
	// (wait for tracks to load and render)


});


// var tracks = document.getElementById('wrapper');
// var throbber = Throbber.forElement(tracks);
// // (wait for tracks to load and render)
// // throbber.hide();