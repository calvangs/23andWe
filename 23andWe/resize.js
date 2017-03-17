$( document ).ready(function() {
	$( ".webcam-loaded" ).load(function() {
		var video = document.getElementsByTagName("video")[0];
		video.height = 821;
		video.width = 1440;
	});
});