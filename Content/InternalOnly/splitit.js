/* 
	splititit.js - java script file to split out a CSV to create Madcap Flare alias file and matching H file
	Usage (command line): node splitit.js <input> <outputflali> <whichapp>
	where 
		<input> - the master CSV of all CSH links; will also be the resulting H file
		<outputflali> - the resulting FLALI file 
		<whichapp> - the filter for which entries to include in the FLALI
	our internal convention is that:
			- <input> = "MasterAlias"
			- <outputflali> <whichapp> are the same (e.g. KC1).
		input csv format:
				;title, ID, link, applist, location in app or other comments
				KC_Intro1, 32, /Content/TEST_Alias/KC_Intro.htm , KC2;ST2;KC1;ST1;SC1, comment
			CSV separator is assumed to be ','
			applist separator cannot be ',' so we recommend ';'
				current list of apps: KC2;ST2;KC1;ST1;SC1
			if 1st character in a line is ';', it is considered a comment
		outputflali
			script will create 2 files: <outputflali>.flali and <input>.h
		whichapp
			name of app to filter; case insensitive;
			note: uses partial string match, so if whichapp=ST, it will match both ST1 and ST2
	Usage (Flare): add the following to the HTML5 target Pre-Build Event Command
		script is assumed to be in $(ProjectDirectory)\Content\InternalOnly
			cd $(ProjectDirectory)\Project\Advanced\CSH\
			node "$(ProjectDirectory)\Content\InternalOnly\splitit.js" arguments...
			
			To Test in Command Prompt (assuming splitit.js is in curent folder):
				cd <desired folder>
				node splitit.js MasterAlias SC1 SC1								
	
	prerequisite: install node.js (https://nodejs.org/en/) 
	
	By: Jeff Klein, Tufin, Inc.
	Copyright 2019, (All Rights Reserved)
	
	Revision History:
		26-Dec-19: changed usage - H file is now based on <input> to match CSV
		25-Dec-19: initial script
	
*/
const debug = false;
const debugPrefix = "DEBUG: "
const xmlTop = '<?xml version="1.0" encoding="utf-8"?>\n<CatapultAliasFile>';
const xmlBottom = '\n</CatapultAliasFile>';
const CRLF = '\r\n'

//for debugging - how many lines were processed, and how many of them were printed to an output file
var numprocessed = 0;
var numprinted = 0;

const fs = require('fs');
var file_H = []; //complete output for H file
var file_flali = [];  //complete flare flali file



// DEBUG: list command line arguments
if ( debug == true)  {
	console.log ('#args: ' + process.argv.length);
	for (var j = 0; j < process.argv.length; j++) {
		console.log(j + ' -> ' + (process.argv[j]));
	}
}

//no arguments - so fail out
if (process.argv.length == 2) return 0; //returns failure
// user asked for help
if (process.argv[2].toLowerCase().includes('--help')) {
	console.log ("Usage: " + process.argv[0] + ' ' + process.argv[1] + ' input.csv outputfile WhichApp');
	return 1;
}
// read all relevant values from command line arguments 
const allText = fs.readFileSync(process.argv[2].trim() + ".csv", 'utf8');
const outputfile = process.argv[3];
const whichApp = process.argv[4];

processData(allText);

//write output files
fs.writeFileSync(process.argv[2].trim() + ".h", file_H);
fs.writeFileSync(outputfile + '.flali', file_flali);

if ( debug==true) {
	console.log(file_H);
	console.log(file_flali);
	console.log(debugPrefix + "numprocessed: " + numprocessed);
	console.log(debugPrefix + "numprinted: " + numprinted);
}

function processData(allText) {
    var allTextLines = allText.split(/\r\n|\n/);
    if ( debug == true)  { 
		console.log (debugPrefix + "All text Lines");
		console.log (allTextLines); 
	}

    var lines = [];

	//set header for FLALI file
	file_flali = xmlTop;
    for(var line=0; line<allTextLines.length; line++) {
		numprocessed++;
		const lineText = allTextLines[line];
		if (lineText !== "" && lineText[0] !== ';') {

			if ( debug == true)   console.log (debugPrefix + lineText); 
			var element = lineText.split(',');
			// check for inclusion in output
			if ( element[3].toLowerCase().includes(whichApp.toLowerCase()) ) {
				const element_h = '#define ' + element[0].trim() + ' '+ element[1].trim();
				const element_flali = '\t<Map Name="' + element[0].trim() + '" Link="' + element[2].trim() + '" />';
				numprinted++;			
				// header file
				file_H += CRLF + element_h;
				file_flali += CRLF + element_flali;
				if ( debug == true) console.log (element_h);
				if ( debug == true) console.log (element_flali);
			} else {
				const element_h2 = '#define ' + element[0].trim() + ' '+ element[1].trim();
				if ( debug == true) console.log ("Header element only: " + element_h2);
				file_H += CRLF + element_h2;
			}
		}
	}
	//set bottom of XML file
	file_flali += xmlBottom;
}
