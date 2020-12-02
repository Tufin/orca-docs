/* Version: 1.0 */
$(function() { //jQuery ready function
	// Set theme
	var theme = $('#var-theme').text();
	$('body').addClass('theme-' + theme);
	//Add dropdown
	var version = $('#var-version').text();
	if (version=='true') addVersionDropdown();
	// Add tufin fonts
	var font = $('#var-font').text();
	if (font=='true') addTufinFont();
	// Add target _blank to external links
	$('a[href^="http"]').attr('target', '_blank');
	//add title - rmmoved for 2020
	// addMyTitle();
	// add header 
	addMyHeader();
	// add breadcrumbs home icon
	addHomeCrumb();
	addParticles();
});

// Supporting functions

function addParticles() {
	particlesJS.load('particles-js', '/support/kc/particles/particles-sidenav.json', function() {
		console.log('callback - particles.js config loaded');
	  });
}
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

function addTufinFont() {
	$('body').addClass('tufin-font');
}

function addMyTitle() {
	$("#header-title").appendTo("div.logo-wrapper");
}

function addMyHeader() {
	$("#second-header").appendTo("nav.title-bar.tab-bar.sticky");
}

function addHomeCrumb() {
	var homeURL = $('a.logo').attr('href');
	var homeCrumb = "<a class='home-crumb' href='"+ homeURL +"'></a><span class='MCBreadcrumbsDivider'> > </span>";
	$(homeCrumb).insertAfter(".MCBreadcrumbsPrefix");
}