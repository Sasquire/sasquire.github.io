---
layout: "default"
title: "which_sources_are_popular"
date: "2019-03-22"
---

e621 accepts sources from most anywhere, but which sites generate the most sources for e621?

---

First a simple query to get the sources out of our database.
```sql
select unnest(sources) as source from posts
```

Now if we want to parse the URL we can use nodejs's `URL` class, but that will throw errors on urls that do not have a protocol.

Credit where it is due, I used a method from [Felix Kling on StackOverflow](https://stackoverflow.com/a/6168286) who in turn got that from [RFC 3986](https://www.ietf.org/rfc/rfc3986.txt)

Further it is not that usefull to differentiate between most instances of `www.site.com` and `site.com`. Because of that I use [parse-domain](https://www.npmjs.com/package/parse-domain) to extract the domain and tld of the URLs.

```javascript
const fs = require('fs');
const parse_domain = require("parse-domain");

function parse_url(url) {
    const pattern = RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
    const matches = url.match(pattern);
    return {
        scheme: matches[2],
        authority: matches[4],
        path: matches[5],
        query: matches[7],
        fragment: matches[9]
    };
}

const urls = fs.readFileSync('./data.csv', 'utf8')
	.split('\n')
	.map(e => parse_url(e).authority)
	.map(e => parse_domain(e))
	.filter(e => e) // remove undefined
	.map(e => e.domain + '.' + e.tld)
	.reduce((acc, e) => {
		acc[e] = acc[e] ? acc[e]+1 : 1;
		return acc;
	}, {});
const ranked_urls = Object.entries(urls)
	.sort((a, b) => b[1] - a[1]);
fs.writeFileSync('./ranked_urls.json', JSON.stringify(ranked_urls));
```

---

<table id="table_data">
	<thead>
		<tr>
			<th>Site</th>
			<th>Number of sources</th>
		</tr>
	</thead>
	<tbody>
	{% for site in site.data.ranked_urls %}
		<tr>
			<td>{{ site[0] }}</td>
			<td>{{ site[1] }}</td>
		</tr>
	{% endfor %}
	</tbody>
</table>