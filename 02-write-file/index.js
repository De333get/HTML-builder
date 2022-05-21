
const fs = require('fs'),
	path = require('path'),
	process = require('process'),
	{ stdin, stdout, exit } = process,
	output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

stdout.write('Hello , enter text\n')
stdin.on('data', data => {
	if (data.toString().trim() !== 'exit') {
		output.write(data.toString())
	}
	else {
		stdout.write('Goodbye!')
		exit()
	}
});

process.on('SIGINT', () => {
	stdout.write('Goodbye!')
	exit();
});