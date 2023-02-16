---
layout: "default"
date: ""
---

# Here is a Blog index

<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Date</th>
		</tr>
	</thead>
	<tbody>
		<!-- TODO turn this into a component? -->
		{% for page in site.pages %}
			{% assign file_type = page.url | split:'.' | last %}
			{% if page.url contains "/blog" and page.url != "/blog/" and file_type != "html" %}
				{% assign links = page.url | split: "/" %}
				{% if page.cname %} <!-- Include if there is a custom name -->
					<tr>
						<td><a href="{{ page.url }}" target="_self">{{ page.cname }}</a></td>
						<td>{{ page.date }}</td>
					</tr>
				{% elsif links.size == 3 %} <!-- Size of 3 only includes first level directories -->
					<tr>
						<td><a href="{{ page.url }}" target="_self">{{ links[2] }}</a></td>
						<td>{{ page.date }}</td>
					</tr>
				{% endif %}
			{% endif %}
		{% endfor %}
	</tbody>
</table>
