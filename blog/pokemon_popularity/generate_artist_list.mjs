import fs from 'fs';
import db from './../../_code/database.mjs';
import { file_here } from './../../_code/file.mjs'

// Create a list of all the images used
const find_artist_from_md5 = db.prepare(`
	select
		name as artist,
		post_id
	from posts_metadata
	inner join posts_tags using (post_id)
	inner join tags using (tag_id)
	where
		current_md5 = ?
		and category = '1'
		and name != 'conditional_dnp';
`);

const hand_picked_path = file_here(import.meta.url, './hand_picked_images.json');
const hand_picked_images = JSON.parse(fs.readFileSync(hand_picked_path, 'utf8'));

const artist_list = Object.entries(hand_picked_images).map(([key, value]) => {
	const md5 = value.href.split('/')[6].split('.')[0];
	const results = find_artist_from_md5.all(md5);
	const artists = results.map(e => e.artist).flat();
	const post_id = results[0] ? results[0].post_id : null;
	const attribution = `<a href="https://e621.net/posts/${post_id}">${key} - ${artists.join(' & ')}</a>`;
	return attribution;
}).join('\n');

const output_path = file_here(import.meta.url, 'artist_list.generated.html');
fs.writeFileSync(output_path, artist_list);