const fs = require('fs'),
	path = require('path'),
	promise = require('fs/promises');

const stylesP = path.join(__dirname, 'styles'),
	projectSP = path.join(__dirname, 'project-dist', 'style.css'),
	assetsP = path.join(__dirname, 'assets'),
	projectAP = path.join(__dirname, 'project-dist', 'assets');


async function buildProject() {
	await buildFiles(assetsP, projectAP);
	await buildCSS();
	await buildHTML();
}

async function buildFiles(folder, folderCopy) {
	await promise.rm(folderCopy, { recursive: true, force: true });
	await promise.mkdir(folderCopy, { recursive: true });
	const files = await promise.readdir(folder);

	for (let file of files) {
		let pars = await promise.stat(path.resolve(folder, file));
		if (pars.isFile()) {
			await promise.copyFile(path.join(folder, file), path.join(folderCopy, file));
		}
		if (pars.isDirectory()) {
			await buildFiles(path.join(folder, file), path.join(folderCopy, file));
		}
	}
}

async function buildCSS() {
	const files = await promise.readdir(stylesP);
	let writeStream = fs.createWriteStream(projectSP);

	for (let file of files) {
		if (path.extname(file) === '.css') {
			let filePath = path.join(__dirname, 'styles', file);
			let stream = fs.createReadStream(filePath, 'utf8');

			stream.on('data', (data) => {
				writeStream.write(data);
			});
		}
	}
}

async function buildPage(data) {
	let writeStream = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
	writeStream.write(data);
}

async function buildHTML() {
	const templatePageSrc = path.join(__dirname, 'template.html');
	let tempPageStream = fs.createReadStream(templatePageSrc, 'utf8');
	let tempContent = '';
	const componentsSrc = path.join(__dirname, 'components');
	const files = await promise.readdir(componentsSrc);

	tempPageStream.on('data', async (data) => {
		tempContent = data;
		for (let file of files) {
			let content = '',
				ext = path.extname(file),
				name = path.basename(file, ext),
				newPath = path.join(componentsSrc, file);

			if (ext === '.html') {
				const pattern = new RegExp(`{{${name}}}`, 'g');
				content = await promise.readFile(newPath, 'utf8');
				tempContent = tempContent.replace(pattern, content);
			}
		}
		buildPage(tempContent);
	});
}

buildProject();