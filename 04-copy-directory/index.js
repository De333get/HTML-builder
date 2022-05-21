const fs = require('fs/promises');
const path = require('path');
const main = path.join(__dirname, 'files')
const copy = path.join(__dirname, 'files-copy')

async function copyDirectory(main, copy) {
	await fs.mkdir(copy, { recursive: true })
	const pathMain = await fs.readdir(main, { withFileTypes: true })
	for (let e of pathMain) {
		if (e.isFile()) {
			fs.copyFile(path.join(main, e.name), path.join(copy, e.name))
		}
		if (e.isDirectory()) {
			copyDirectory(path.join(main, e.name), path.join(copy, e.name))
		}
	}
	const pathCopy = await fs.readdir(copy)
	for (let e of pathCopy) {
		fs.access(path.join(main, e)).catch(() => {
			fs.rm(path.join(copy, e), { recursive: true })
		})
	}
}

copyDirectory(main, copy)