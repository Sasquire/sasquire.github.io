---
layout: "default"
date: ""
---

# Commissions

This is mostly an odds and ends directory for my own benefit. I guess other people might find it useful, but probably not.

{% assign commissions = site.pages
	| where_exp: "page", "page.url contains '/commissions'" 
	| where_exp: "page", "page.url != '/commissions/'"
	| group_by: "commission_type"
	| sort: "name"
%}

<!-- Loop over all the possible commissions and build tables for each type -->
{% for item in commissions %}

{% if item.name == "_fursona" %}
## Artwork of my fursona
{% elsif item.name == "miscellaneous" %}
## Strange artwork that I have commissioned
{% elsif item.name == "magic_the_gathering" %}
## Things related to [MTG](https://en.wikipedia.org/wiki/Magic%3A_The_Gathering) that I have commissioned
{% else %}
## No title
{% endif %}

<!-- End the header and start the table for this type -->
<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Artist</th>
			<th>Date</th>
		</tr>
	</thead>
	<tbody>
		{% assign sorted_pages = item.items | sort: "date" | reverse %}
		{% for page in sorted_pages %}
			{% assign links = page.url | split: "/" %}
			{% if page.cname %} <!-- Include if there is a custom name -->
				<tr>
					<td><a href="{{ page.url }}" target="_self">{{ page.cname }}</a></td>
					<td>{{ page.artist }}</td>
					<td>{{ page.date }}</td>
				</tr>
			{% elsif links.size == 3 %} <!-- Size of 3 only includes first level directories -->
				<tr>
					<td><a href="{{ page.url }}" target="_self">{{ links[2] }}</a></td>
					<td>{{ page.artist }}</td>
					<td>{{ page.date }}</td>
				</tr>
			{% endif %}
		{% endfor %}
	</tbody>
</table>
<br/>
{% endfor %}