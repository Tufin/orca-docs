/* Version: 1.0 */
$(function() { //jQuery ready function
	// Set theme
	var theme = $('#var-theme').text();
	$('body').addClass('theme-' + theme);
	//Add dropdown
	var version = $('#var-version').text();
	if (version=='true') addVersionDropdown();
	// Add target _blank to external links
	$('a[href^="http"]').attr('target', '_blank');
	//add title
	addMyTitle();
});

// Supporting functions
function addVersionDropdown() {
	var urlPrefix = (location.href.indexOf('localhost') !== -1) ? '/xampp' : '';
	var theFile = $('#var-filename').text();
		// $.get(urlPrefix+'/support/kc/alexander.htm', null, function(data, status) {
	$.get(urlPrefix+'/support/kc/' + theFile, null, function(data, status) {
    $version = $(data).filter('.version-data');
    $version[0].removeAttribute('style');
    $('<div class="version-dropdown"></div>')
      .append($version[0])
	  .insertAfter('.search-bar');
	  $('.search-bar').addClass('search-version');
  });
}


function addMyTitle () {
	$("#header-title").appendTo("div.logo-wrapper");
}