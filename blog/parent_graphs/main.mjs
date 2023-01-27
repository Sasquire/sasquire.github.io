import fs from 'fs';
import db from './../../_code/database.mjs';
import { file_here } from './../../_code/file.mjs'

const query_path = file_here(import.meta.url, './query.sql');
const query = fs.readFileSync(query_path, 'utf8');

const rows = db.prepare(query)
	.all()
	.map(e => {
		const post_count = e.num_posts === -1 
			? 'malformed tree'
			: `${e.num_posts} posts`;
		const link = `https://e621.net/posts/${e.tree_id}`;
		const a = `<a href="${link}">${e.tree_id}</a>`;
		return `<tr><td>${a}</td><td>${post_count}</td></tr>`;
	})
	.join('\n');

const table = `
<link href="/static/default_style.css" rel="stylesheet" type="text/css">
<base target="_blank" rel="noopener noreferrer">
<table>
	<thead><tr><th>Post id</th><th>Number of Posts</th></tr></thead>
	<tbody>${rows}</tbody>
</table>`;

const file_path = file_here(import.meta.url, 'bad_relations.generated.html');
fs.writeFileSync(file_path, table);
