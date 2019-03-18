---
layout: "default"
title: "users_who_are_artists"
date: "2019-03-14"
---

Many artists won’t upload their artwork to e621 because of the difficulty there is to tagging, but that raises the question: **which users are artists who upload their own artwork?**

---

We’ll start off by selecting all artist tags that are on a post a given user has uploaded.

post_id | uploader_id | artist_name
--------|-------------|------------
100 | 66 | artist1
200 | 66 | artist1
200 | 66 | artist2
400 | 55 | artist3

We will then calculate how many uploads from each artist every user has, along with a few other variables.

uploader_id | artist_name | count
------------|-------------|------
66 | artist1 | 2
66 | artist2 | 1
55 | artist3 | 1

```sql
select distinct
	creator_id as user_id,
	tag_name as artist_name,
	count(*) over (partition by creator_id) as user_total,
	count(*) over (partition by tag_name) as artist_total,
	-- amount of posts with this artist from this user
	count(*) over (partition by creator_id, tag_name)::float as ua_total
from posts
inner join tag_info on(
	tag_type = 1 and -- tag_type 1 means it's an artist tag
	tags @> Array[tag_name]
)
```

Now that we have this, we can apply some constraints. We won’t want any user who has uploaded a single image diluting our results. I have chosen to discard any artist who doesn’t have at least 8 uploads. We also don’t want users who have uploaded many artists’ complete galleries, so we will discard any user that has more than 1000 uploads.

We also want to apply a lower bound so we are not getting every single result. To do this, we only keep results where the ***percent of artists posts uploaded by this user*** and ***percent of users uploads with this artist*** are greater than 60% (or 0.6).

Now, to make this data more palatable, we need to order them. I chose order by using the distance formula between (0,0) and the ratios expressed as a point.

```sql
select
	ua_total/artist_total as percent_of_artist_uploaded_by_user,
	ua_total/user_total as percent_of_users_uploads_with_artist,
	user_id,
	artist_name
from (
	select distinct
		creator_id as user_id,
		tag_name as artist_name,
		count(*) over (partition by creator_id) as user_total,
		count(*) over (partition by tag_name) as artist_total,
		-- amount of posts with this artist from this user
		count(*) over (partition by creator_id, tag_name)::float as ua_total
	from posts
	inner join tag_info on(
		tag_type = 1 and -- tag_type 1 means it's an artist tag
		tags @> Array[tag_name]
	)
) as q
where 
	artist_total > 7 and 
	user_total < 1000 and
	ua_total/user_total > 0.6 and
	ua_total/artist_total > 0.6
order by
	-- sqrt(a^2 + b^2)
	|/ ((ua_total/user_total)^2 + (ua_total/artist_total)^2) desc,
	ua_total/user_total desc
```

Before we’re done, we need to add usernames so we are not just staring at user_ids.

```javascript
const request = require('request');
const fs = require('fs');
const in_data = require('./data.json');
const p = (s) => process.stdout.write(s);

main();
async function main(){
	let counter = 1; // only for printing
	for(const row of in_data){
		p(`${counter++}/${in_data.length}\t`);
		p(`Finding ${row.user_id} who might be ${row.artist_name}\t`);
		row.user_name =  await get_username(row.user_id);
		p(`User was ${row.user_name}\n`);
	}
	
	// convert to an array to simplify and
	// save on a tiny amount of space
	const final = in_data.map(e => [
		e.percent_of_artist_uploaded_by_user.toFixed(5),
		e.percent_of_users_uploads_with_artist.toFixed(5),
		e.user_id,
		e.user_name,
		e.artist_name
	]);

	fs.writeFileSync('./with_name.json', JSON.stringify(final), 'utf8')
}

async function get_username(user_id){
	// sleep so Kira doesn't get mad
	await new Promise(r => setTimeout(r, 1000));
	return new Promise((resolve, reject) => {
		const options = {
			url: `https://e621.net/user/show.json?id=${user_id}`,
			// set your own User-Agent !
			headers: {'User-Agent': '<0xDEADBEEF>'}
		}
		request(options, (error, header, response) => {
			// incase the account 404'ed or something
			if(error || header.statusCode != 200){
				resolve('! No Name Found !')
			} else {
				resolve(JSON.parse(response).name || '! No Name Found !');
			}
		});
	});
}
```

---

<table id="table_data">
	<thead>
		<tr>
			<th>percent of artist uploaded by user</th>
			<th>percent of users uploads with artist</th>
			<th>username</th>
			<th>artist name</th>
		</tr>
	</thead>
	<tbody>
	{% for userartist in site.data.users_who_are_artists %}
		<tr>
			<td>{{ userartist[0] }}</td>
			<td>{{ userartist[1] }}</td>
			<td><a href="https://e621.net/user/show/{{ userartist[2] | cgi_escape }}">{{ userartist[3] }}</a></td>
			<td><a href="https://e621.net/post/index/1/{{ userartist[4]  | cgi_escape }}">{{ userartist[4] }}</a></td>
		</tr>
	{% endfor %}
	</tbody>
</table>