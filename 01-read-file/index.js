const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt')
fs.readFile(filePath, 'utf-8', (err, content) => {
	if (err) {
		throw err
	}
	console.log(content)
})