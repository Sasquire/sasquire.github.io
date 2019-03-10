---
layout: "default"
title: "blurbs"
date: "2019-03-04"
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
			<tr>
				<td><a href="{{ page.url }}">{{ page.title }}</a></td>
				<td>{{ page.date }}</td>
			</tr>
		{% endfor %}
	</tbody>
</table>