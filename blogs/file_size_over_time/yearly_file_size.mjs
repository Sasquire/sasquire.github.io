import db from './../../_code/database.mjs';
import { file_here } from './../../_code/file.mjs'
import { LineChart } from 'd3-charts';

const all_file_sizes = db.prepare(`
	with dates as (
		select
			floor(strftime('%J', created_at / 1000, 'unixepoch') / 365) as year,
			file_size,
			file_ext
		from posts_metadata
		where file_ext not like 'del.%'
	)
	select
		unixepoch(year * 365) * 1000 as x,
		avg(file_size) / (1000*1000) as y,
		file_ext as key
	from dates
	group by file_ext, year
	order by x asc; 
`).all();

const file_path = file_here(import.meta.url, 'yearly_file_size.svg');
new LineChart({
	title: {text: `Yearly average file size - ${db.most_recent_date}`},
	x_label: {text: 'Year'},
	y_label: {text: 'Average size of file (MB)'},
	x_scale: {type: 'time'},
	y_scale: {min: 0}
}).draw(all_file_sizes).save(file_path);
