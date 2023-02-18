import fs from 'fs';
import db from './../../_code/database.mjs';
import { file_here } from './../../_code/file.mjs'
import { PieChart } from 'd3-charts';

// In the future replace with this line
// import hand_picked_images from './hand_picked_images.json' assert {type: 'json'};
// Currently only experimental, but I want to import JSON instead.

const hand_picked_path = file_here(import.meta.url, './hand_picked_images.json');
const hand_picked_images = JSON.parse(fs.readFileSync(hand_picked_path, 'utf8'));

const pokemon_path = file_here(import.meta.url, './query.sql');
const pokemon_query = fs.readFileSync(pokemon_path, 'utf8');

const data = db.prepare(pokemon_query).all()
	.map(e => ({
		...e,
		image: hand_picked_images[e.key]
	}))
	.sort((a, b) => b.count - a.count);

const output_path = file_here(import.meta.url, 'pokemon_popularity.svg');
new PieChart({
	other: {
		proportion_threshold: 0.005,
		draw: 'center',
		image: hand_picked_images.Other
	},
	rotate_labels: true,
	title: {
		text: `Pokemon species by post count - ${db.most_recent_date}`
	},
	inner_radius: 225
}).draw(data).save(output_path);

const table_path = file_here(import.meta.url, 'pokemon_table.generated.html');
const table = `
<link href="/static/default_style.css" rel="stylesheet" type="text/css">
<table>
	<thead>
		<tr><th>Pokemon</th><th>Post Count</th></tr>
	</thead>
	<tbody>
		${data.map(e => `<tr><td>${e.key}</td><td>${e.count}</td></tr>`).join('\n')}
	</tbody>
</table>`;
fs.writeFileSync(table_path, table, 'utf8');
