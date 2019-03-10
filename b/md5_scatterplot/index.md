---
layout: "default"
title: "md5_scatterplot"
date: "2019-03-05"
---

# Scatterplot of md5sums

Stupid graphs are my favorite.

So I was wondering, what would a scatterplot of all the md5sums from e621 would look like?

The first problem was getting the points that would be plotted.

```sql
select
	hex_to_int(substring(md5, 1, 3)) as x,
	hex_to_int(substring(md5, 17, 3)) as y,
	count(*)
from posts
group by x, y
```

I was using the `hex_to_int` that was found in this [StackOverflow Answer by Pierre D](https://stackoverflow.com/a/24707139)

```sql
create or replace function hex_to_int(hexval text) returns int as $$
select
	(get_byte(x, 0)::int << (3*8)) |
	(get_byte(x, 1)::int << (2*8)) |
	(get_byte(x, 2)::int << (1*8)) |
	(get_byte(x, 3)::int)
from (
	select decode(lpad($1, 8, '0'), 'hex') as x
) as a;
$$
language sql strict immutable;
```

This took about a minute to run, and five for the data transfer. Once I had a csv of points and count values, I used nodejs with the **canvas** package.

```javascript
const canvas = require('canvas').createCanvas(4096, 4096);
const ctx = canvas.getContext('2d');
const { readFileSync, writeFileSync } = require('fs');

const colors = [
	'white',
	'black',
	'red',
	'orange',
	'yellow',
	'green',
	'blue',
	'purple'
];

readFileSync('points.csv', 'utf8')
	.slice(0, -1) // removes the last newline
	.split('\n')
	.map(line => line.split(',').map(e => parseInt(e)))
	.forEach(([x, y, count]) => {
		ctx.fillStyle = colors[count] || 'pink';
		ctx.fillRect(x, y, 1, 1);
	});

writeFileSync('./heatmap.png', canvas.toBuffer());
```

And there we have it, a meaningless scatterplot in all its glory. You may want to open it in a new tab. The image is 4096x4096 and is about 2 MB.

<img class="small-img" src="scatterplot.png" alt="scatterplot">