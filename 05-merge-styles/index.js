const fs = require('fs');
const path = require('path');
const readPath = path.join(__dirname, 'styles')
const createStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
fs.writeFile(path.join(__dirname, 'project-dist', 'bundle.css'), '', function () { })

fs.readdir(readPath, { withFileTypes: true }, (err, files) => {
	if (err) throw err
	for (let file of files) {
		if (file.isFile() && path.extname(file.name) === '.css') {
			const readStream = fs.createReadStream(path.join(readPath, file.name), 'utf-8');
			readStream.on('data', chunk => {
				createStream.write(chunk)
			});
		}
	}
})