import path from 'node:path';
import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import _ from 'lodash';

async function toFiles(directory) {
	let files = [];

	const entries = await fs.readdir(directory, { withFileTypes: true });

	for (const entry of entries) {
		const childPath = path.join(directory, entry.name);

		if (entry.isDirectory()) {
			const children = await toFiles(childPath);

			files = [...files, ...children];
		} else if (entry.isFile()) {
			files.push(childPath);
		}
	}

	return files;
}

function toSVGName(file) {
	const info = path.parse(file);
	const [name, fill] = info.name.split('-');
	const [weight, variant] = info.dir.split('/').slice(-2);
	const toFill = (value) => value ? 'fillest' : 'filless';
	const toWeight = (value) => {
		return {
			'100': 'lightest',
			'200': 'light',
			'300': 'lightless',
			'400': 'normal',
			'500': 'boldless',
			'600': 'bold',
			'700': 'boldest',
		}[value];
	}

	return `${name}__${variant}_${toFill(fill)}_${toWeight(weight)}`;
}

async function toSVGs(files) {
	const map = new Map();

	for (const file of files) {
		if (!`${file}`.endsWith('.svg')) continue;

		const name = toSVGName(file);
		const content = await fs.readFile(file, { encoding: 'utf8' });

		if (!map.has(name)) { map.set(name, content); }
	}

	return map;
}

/**
 * const type IconKey = '' | '';
 *
 * as Record<'' | '', string>;
 */
async function toExport(directory, file) {
	const filePath = `${directory}/${file.name}`;
	const names = new Set();

	let pair = '';
	for (const [key, value] of file.content.entries()) {
		pair += `\t'${key}': '${value}',\n`;
		names.add(`'${_.first(key.split('__'))}' | `);
	}

	const keys = [...names.values()].join('').replace(/\s\|\s$/, '');
	const types = `export type IconKeys = ${keys}`;
	const content = `${types}\nexport default {\n${pair}} as Record<string, string>;\n`;

	await fs.writeFile(filePath, content);
}

/**
 *
 */
export default async function install() {
	const filename = fileURLToPath(import.meta.url);
	const dirname = path.dirname(filename);
	const source = path.join(dirname, '..', '..', '.temp', 'material-design');
	const target = path.join(dirname, '..', '..', 'apps', 'ui', 'src', 'components', 'icon');
	const files = await toFiles(source);
	const svgs = await toSVGs(files);

	await toExport(target, { name: 'icon.list.ts', content: svgs });
}

await install();
