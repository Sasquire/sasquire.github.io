---
layout: "default"
date: ""
---

# Here's a project index

In my mind, projects are things that are not simple scripts and graphs; still large enough to require their own page; not so large that they deserve their own repository. This will probably be left sparse for a long period of time, as most things I make are either too small or too large to be here.

<table>
	<thead>
		<tr>
			<th>Name</th>
		</tr>
	</thead>
	<tbody>
		<!-- TODO turn this into a component? -->
		{% for page in site.pages %}
			{% assign file_type = page.url | split:'.' | last %}
			{% if page.url contains "/projects" and page.url != "/projects/" and file_type != "html" %}
				{% assign links = page.url | split: "/" %}
				{% if page.cname %} <!-- Include if there is a custom name -->
					<tr>
						<td><a href="{{ page.url }}" target="_self">{{ page.cname }}</a></td>
					</tr>
				{% elsif links.size == 3 %} <!-- Size of 3 only includes first level directories -->
					<tr>
						<td><a href="{{ page.url }}" target="_self">{{ links[2] }}</a></td>
					</tr>
				{% endif %}
			{% endif %}
		{% endfor %}
	</tbody>
</table>
