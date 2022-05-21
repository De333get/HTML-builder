const fs = require('fs'),
	path = require('path'),
	{ stdout } = process;

fs.readdir(path.join(__dirname, 'secret-folder'), { withFileTypes: true }, (err, files) => {
	if (err)
		throw err
	else {
		for (let file of files) {
			if (file.isFile()) {
				let fileName = file.name.split('.')[0]
				let extansion = path.extname(file.name).split('.')[1]
				let size;
				fs.stat(path.join(__dirname, 'secret-folder', file.name), (err, stats) => {
					if (err) {
						throw err
					} else {
						size = stats.size
					}
					stdout.write(`${fileName} - ${extansion} - ${size}bytes\n`)
				})
			}
		}
	}
})

