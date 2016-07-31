"use strict"

let fs = require('fs');


if(!process.env.VARIABLE_LIST) {
	console.error( 'Couldn\'t find environment variable "VARIABLE_LIST".' );
	process.end(-1);
}

let envs = process.env.VARIABLE_LIST.split(";");

envs.forEach((name) => {
	name = name.toUpperCase();
	if(!process.env[name])
	{
		console.error('Couldn\'t find environment variable "'+name+'".');
		return;
	}

	var [path, encoding, data] = process.env[name].split(":");
	fs.writeFile(path, new Buffer(data, encoding));
});