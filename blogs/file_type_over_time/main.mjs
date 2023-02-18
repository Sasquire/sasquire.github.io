import db from './../../_code/database.mjs';
import { file_here } from './../../_code/file.mjs'
import { LineChart } from 'd3-charts';

const file_type_counts = db.prepare(`
	with dates as (
		select
			floor(strftime('%J', created_at / 1000, 'unixepoch') / 30) as month,
			file_ext
		from posts_metadata
		where file_ext not like 'del.%'
	)
	select
		unixepoch(month * 30) * 1000 as x,
		count(*) as y,
		file_ext as key
	from dates
	group by file_ext, month
	order by x asc;
`).all();

const file_path = file_here(import.meta.url, 'file_type_over_time.svg');
new LineChart({
	title: {text: `Monthly number of uploads - ${db.most_recent_date}`},
	x_label: {text: 'Year'},
	y_label: {text: 'Number of uploads'},
	x_scale: {type: 'time'},
	y_scale: {type: 'log'}
}).draw(file_type_counts).save(file_path);
