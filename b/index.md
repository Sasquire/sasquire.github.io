---
layout: "default"
title: "blurbs"
date: ""
---

# Here is a blurb index

---
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Date</th>
		</tr>
	</thead>
	<tbody>
		{% for page in site.pages %}
			{% if page.url contains "/b" and page.url != "/b/" %}
				<tr>
					<td><a href="{{ page.url }}">{{ page.title }}</a></td>
					<td>{{ page.date }}</td>
				</tr>
			{% endif %}
		{% endfor %}
	</tbody>
</table>