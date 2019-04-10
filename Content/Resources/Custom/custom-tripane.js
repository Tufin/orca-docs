/* Version: 1.0 */
$(function() { //jQuery ready function
	// Add target _blank to external links
	$('a[href^="http"]').attr('target', '_blank');
});