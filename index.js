"use strict"

let fs = require('fs'),
	mkpath = require('mkpath');


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

	let [path, encoding, data] = process.env[name].split(separator);

	if(path && encoding && data) {
		let dir = path.substring(0,path.lastIndexOf("/")+1);
		mkpath(dir, function (err) {
			if (err) throw err;
			fs.writeFile( path, new Buffer( data, encoding ), function(err, done) {
				if (err) throw err;
				console.log('Succefully written: >>>\n', new Buffer( data, encoding ).toString(), "\n<<<\nto "+path)
			} );
		});
	}
	else
		console.error("Missing params\n", "path", path, "\n", "encoding", encoding, "\n", "data", data );
});