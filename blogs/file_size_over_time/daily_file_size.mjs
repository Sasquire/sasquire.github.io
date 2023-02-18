import db from './../../_code/database.mjs';
import { file_here } from './../../_code/file.mjs'
import { LineChart } from 'd3-charts';

const all_file_sizes = db.prepare(`
	with dates as (
		select
			-- Database stores in 1000 * Unix time and we want to convert to a single day
			floor(strftime('%J', created_at / 1000, 'unixepoch')) as julian_day,
			file_size
		from posts_metadata
	)
	select
		unixepoch(julian_day) * 1000 as x,
		avg(file_size) / (1000*1000) as y
	from dates
	group by julian_day
	order by x asc; 
`).all();

const file_path = file_here(import.meta.url, 'daily_file_size.svg');
new LineChart({
	title: {text: `Daily average file size - ${db.most_recent_date}`},
	x_label: {text: 'Year'},
	y_label: {text: 'Average size of file (MB)'},
	x_scale: {type: 'time'},
	y_scale: {min: 0}
}).draw(all_file_sizes).save(file_path);
