/* Version: 1.0 */
$(function() { //jQuery ready function
	// Set theme
	var theme = $('#var-theme').text();
	$('body').addClass('theme-' + theme);
	
	// Remove header
	//$('.homepage nav.title-bar').remove();
		
	// Add target _blank to external links
	$('a[href^="http"]').attr('target', '_blank');
});