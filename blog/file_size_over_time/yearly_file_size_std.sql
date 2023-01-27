with dates as (
	select
		floor(strftime('%J', created_at / 1000, 'unixepoch') / 365) as year,
		file_size as y,
		file_ext
	from posts_metadata
	where file_ext not like 'del.%'
)
select
	unixepoch(year * 365) * 1000 as x,
	avg(y) as mean, 
	-- Alternative method for variance that we can use here.
	-- (sum(y)^2 - sum(y^2)/n) / (n-1)
	sqrt( (sum(y*y) - sum(y)*sum(y)/count(*)) / (count(*) - 1)) as standard_deviation,
	file_ext as key
from dates
group by file_ext, year
order by x asc;