/*
 * SPDX-FileCopyrightText: syuilo and other misskey, cherrypick contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { readFile, writeFile } from 'node:fs/promises';
import JSON5 from 'json5';

const keys = [
	'_dark',
	'_light',
	'l-cherrypick',
	'l-light',
	'l-coffee',
	'l-apricot',
	'l-rainy',
	'l-botanical',
	'l-vivid',
	'l-cherry',
	'l-sushi',
	'l-u0',
	'd-cherrypick',
	'd-dark',
	'd-persimmon',
	'd-astro',
	'd-future',
	'd-botanical',
	'd-green-lime',
	'd-green-orange',
	'd-cherry',
	'd-ice',
	'd-u0',
]

await Promise.all(keys.map((key) => readFile(new URL(`../src/themes/${key}.json5`, import.meta.url), 'utf8'))).then((sources) => {
	writeFile(
		new URL('./themes.ts', import.meta.url),
		`export default ${JSON.stringify(
			Object.fromEntries(sources.map((source, i) => [keys[i], JSON5.parse(source)])),
			undefined,
			2,
		)} as const;`,
		'utf8'
	);
});
