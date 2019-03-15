---
layout: "default"
title: "only_sfw_artists"
date: "2019-03-10"
---

This is a list of artists that only have safe artwork on e621. A small note, this is only artists that have more than ten posts. This is to prevent the vast number of artists that only have a few posts uploaded.

Maybe something to do is to have a list of all artists with percentages of types of artwork.

```sql
select tag_name 
from posts inner join (
    select tag_name, count 
    from tag_count inner join tag_info using(tag_name) 
    where count > 10 and tag_type = 1 
) as artists on (tags @> Array[tag_name])
where rating = 23 -- ratings are stored as numbers in my db
group by tag_name, count 
having count(*) = count
```
---

<ul>
	{% for artist in site.data.only_sfw_artists %}
		<li><a href="https://e621.net/post?tags={{ artist.name | cgi_escape }}">{{ artist.name }}</a></li>
	{% endfor %}
</ul>