import sqlite3 from 'better-sqlite3';
import { file_here } from './file.mjs'

const db = sqlite3(get_database_path(), {
	readonly: true,
	fileMustExist: true,
	verbose: () => false
});

function get_database_path () {
	return file_here(import.meta.url, './../_ignore/e621.sqlite3.database');;
}

function date_string (unix_stamp) {
	const time = new Date(unix_stamp);
	const year = time.getFullYear().toString().padStart(4, '0');
	const month = (time.getUTCMonth() + 1).toString().padStart(2, '0');
	const day = time.getDate().toString().padStart(2, '0');
	return `${year}-${month}-${day}`;
}

function get_most_recent_date_from_database () {
	const query = 'select max(updated_at) as max from posts_metadata;';
	const result = db.prepare(query).get()
	const unix_stamp = result.max;
	return date_string(unix_stamp);
}

db.most_recent_date = get_most_recent_date_from_database();

export default db;
