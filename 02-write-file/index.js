
const fs = require('fs');
const path = require('path');
const process = require('process')
const { stdin, stdout, exit } = process;
const output = fs.createWriteStream(path.join(__dirname, 'file.txt'));

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