---
layout: "default"
date: ""
---

# Commissions

This is mostly an odds and ends directory for my own benefit. I guess other people might find it useful, but probably not.

{% comment %} TODO generate these types automatically {% endcomment %}
{% assign commission_types = "_fursona others_characters miscellaneous magic_the_gathering" | split: " " | sort %}

{% for type in commission_types %}
	{% if type == "_fursona" %}
## Artwork of my fursona
	{% elsif type == "others_characters" %}
## Artwork I've commissioned of characters I don't own
	{% elsif type == "miscellaneous" %}
## Strange artwork that I have commissioned
	{% elsif type == "magic_the_gathering" %}
## Things related to [MTG](https://en.wikipedia.org/wiki/Magic%3A_The_Gathering) that I have commissioned
	{% else %}
## No title
	{% endif %}

{% comment %} I don't know why I need to use capture {% endcomment %}
{% capture artwork_filter %}commission_type={{ type }}{% endcapture %}
{% include components/folder_list.html
	folder_to_scan = "/commissions"
	display_attributes = "name artist date"
	attribute_filters = artwork_filter

	sorting_attribute = "date"
	sorting_reversed = "true"
%}
<br/>
{% endfor %}