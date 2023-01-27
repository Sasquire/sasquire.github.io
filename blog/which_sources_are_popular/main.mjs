import { parseDomain } from 'parse-domain';
import fs from 'fs';
import { URL } from 'url';
import db from './../../_code/database.mjs';
import { file_here } from './../../_code/file.mjs'
import { PieChart } from 'd3-charts';

function url_to_short_url (text) {
	try {
		const { domain, topLevelDomains } = parseDomain((new URL(text)).hostname);
		
		// TODO currently a bug in parse domain or something.
		// I'm too lazy to fix this right now.
		if (domain.includes('d3gz42uwgl1r1y')) {
			return topLevelDomains.join('.');
		}

		return domain + '.' + topLevelDomains.sort().join('.');
	} catch (e) {
		return undefined;
	}
}

function count_array_into_object (array) {
	const object = {};
	for (const item of array) {
		if (object[item] === undefined) {
			object[item] = 1;
		} else {
			object[item] += 1;
		}
	}
	return object;
}

const all_urls = db
	.prepare('select source from posts_sources')
	.all()
	.map(e => url_to_short_url(e.source))
	.filter(e => e);

const url_count = count_array_into_object(all_urls);
const ranked_urls = Object.entries(url_count)
	.map(e => ({
		key: e[0],
		count: e[1]
	}))
	.sort((a, b) => {
		const count_difference = b.count - a.count; // sort count desc
		if (count_difference != 0) {
			return count_difference;
		} else {
			return a.key.localeCompare(b.key); // sort name desc
		}
	});

const output_path = file_here(import.meta.url, 'source_popularity.svg');
new PieChart({
	rotate_labels: true,
	text_distance_scale: 0.4,
	title: { text: `Popularity of Sources - ${db.most_recent_date}` }
}).draw(ranked_urls).save(output_path);

const table_path = file_here(import.meta.url, 'source_table.generated.html');
const table = `
<link href="/static/default_style.css" rel="stylesheet" type="text/css">
<table>
	<thead>
		<tr><th>Site</th><th>Number of Sources</th></tr>
	</thead>
	<tbody>
		${ranked_urls.map(e => `<tr><td>${e.key}</td><td>${e.count}</td></tr>`).join('\n')}
	</tbody>
</table>
`;
fs.writeFileSync(table_path, table, 'utf8');
