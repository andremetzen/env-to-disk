"use strict"

let fs = require('fs');


if(!process.env.VARIABLE_LIST) {
	console.error( 'Couldn\'t find environment variable "VARIABLE_LIST".' );
	process.end(-1);
}

let envs = process.env.VARIABLE_LIST.split(";");
let separator = process.env.SEPARATOR || "|";

envs.forEach((name) => {
	name = name.toUpperCase();
	if(!process.env[name])
	{
		console.error('Couldn\'t find environment variable "'+name+'".');
		return;
	}

	var [path, encoding, data] = process.env[name].split(separator);
	console.log(path, encoding, data);

	if(path && encoding && data)
		fs.writeFile(path, new Buffer(data, encoding));
	else
		console.error("Missing params\n", "path", path, "\n", "encoding", encoding, "\n", "data", data );
});