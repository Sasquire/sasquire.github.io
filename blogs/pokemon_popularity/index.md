---
layout: "default"
date: "2023-01-13"
---

There has been a pie-chart circulating the internet of all the pokemon on e621. Things like these get outdated quickly, so I made this pie-chart that updates often! Sources to all images at the bottom.


{% include components/figure.html 
	link = "./pokemon_popularity.svg"
	inside = ""
%}

Building this query is not too much of a pain. There have been a few changes to the pokemon_(species) tag over the years that have caused some problems. In essence, the query will: find all tags involved in the pokemon_(species) implication tree at a depth of 2; remove extra groups and merge different pokemon forms; finally count the number of posts for each tag grouping by pokemon name.

Because I felt it more natural, this chart counts different forms as the same kind. Thankfully, [different forms](https://e621.net/forum_topics/15490) of [pokemon](https://e621.net/wiki_pages/594) are [tagged differently](https://e621.net/forum_topics/6438). This makes our work easier as all we need to do is transform names like `mega_lucario` to `lucario`. A side effect of this though is that images with a Charizard and a Mega Charizard will be counted twice while an image with two Charizards will only counted once. Which kind of skews the data but this is an edge case I do not think happens often (and I do not care about it).

But what about pokemon that do not have base-forms? (e.g. [lycanroc](https://e621.net/wiki_pages/13227) or [deerling](https://e621.net/wiki_pages/6269)). It seems that most of these base-form-less pokemon do have tags representing the group and these tags are in the same places that most other pokemon are. So it seemed simpler to include all things at this level and filter away actual groups. It mostly works alright, but may need updating to exclude more groups in the future.

<div class="tab-wrapper">
	{% capture tab_content %}{% highlight sql %}{%
		include_relative query.sql
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "a"
		name = "query.sql"
		content = tab_content
	%}

	{% capture tab_content %}{% highlight javascript %}{%
		include_relative generate_graph.mjs
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "b"
		name = "generate_graph.mjs"
		content = tab_content
	%}

	{% capture tab_content %}{% highlight json %}{%
		include_relative hand_picked_images.json
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "c"
		name = "hand_picked_images.json"
		content = tab_content
	%}
</div>

Generating the list of artists is not hard either. I could have included the artist in the JSON document, but I never intend to use art not on e621 for this. So instead I just lookup the artists based on the MD5 of each image used.

<div class="tab-wrapper">
	{% capture tab_content %}
		<div style="display: flex; flex-direction: column">
			{% include_relative artist_list.generated.html %}
		</div>
	{% endcapture %}
	{% include components/tab_item.html 
		index = "2" sub_index = "a"
		name = "Artist&nbsp;List"
		content = tab_content
	%}

	{% capture tab_content %}{% highlight javascript %}{%
		include_relative generate_artist_list.mjs
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "2" sub_index = "b"
		name = "generate_artist_list.mjs"
		content = tab_content
	%}
</div>

A table of all the pokemon can be found [here](./pokemon_table.generated.html). It's not pretty, but it's pretty functional.