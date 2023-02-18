---
layout: "default"
date: "2019-03-12"
---

<!---
TODO all the images in this post should be replaced with SVGs
-->

Normally, you want all parent related posts to be the children of a single post. This makes it a lot easier to navigate through the children of a post and see all variants. Abuse of the parent system can lead to parent-chains, parent-trees, and worst of all -- parent-graphs.

<div class="tab-wrapper">
	{% capture tab_content %}
	<div class="chat_log">
		<div>[9:09 PM] idem: are post-parent chains still discouraged of any length greater than 1? e.g. If I have 3 posts they should be in a pool instead of A->B->C </div>
		<div>[9:11 PM] idem: or C<-A->B</div>
		<div>[9:11 PM] <a href="https://e621.net/users/38571">Mairo</a>: I at least personally still highly discourage those and constantly remove them when see any, because it is literally just like pool, but so much harder to navigate</div>
		<div>[9:11 PM] <a href="https://e621.net/users/38571">Mairo</a>: Either have A as parent to other posts or pool.</div>
		<div>[9:12 PM] Poofinator: I usually make pools for sequences of at least 4 or 5 pics </div>
		<div>[9:13 PM] Poofinator: sometimes I make them for less if it's comics with multiple panels</div>
		<div>[9:15 PM] <a href="https://e621.net/users/38571">Mairo</a>: Technically with pools there's no rules, but if it's 3 pages, just make a pool, if it's like 3 panels, it's not that hard to navigate</div>
	</div>
	{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "a"
		name = "chat_log.txt"
		content = tab_content
	%}
</div>

First some background. This is what parent relations should look like on e621.

<img class="small-img" src="optimal_tree.png" alt="many posts pointing to a single parent">

Some people end up making parent-chains like the image below, but when you find a long chain of posts it should probably be in a pool. Pools provide a lot of niceties over regular parent-chains: titles, descriptions, easy organization, in built navigation.

<img class="small-img" src="should_be_a_pool.png" alt="a long chain of posts. one linking to the next">

Posts with parent relations like this are easy to navigate and can help users find all other posts that are related. Conversely, something like the examples below are difficult, cumbersome, and confusing to navigate.

<img class="small-img" src="cyclic1.png" alt="two posts linking to each other">
<img class="small-img" src="tree2.png" alt="a post with two children, one of which has two more children">
<img class="small-img" src="cyclic2.png" alt="three posts in a cycle with an offshoot of two posts in a chain">

Finding these bad parent graphs can be a bit tricky. First we need to have a definition for what a good parent graph is. I would say it is a [tree](https://en.wikipedia.org/wiki/Tree_(graph_theory)) with all nodes having a depth of 1. To find that, I (with the help of [Fifteen](https://e621.net/users/38394)) created a recursive SQL query to find all relation trees. From there we can filter away the trees that have a depth of 1 and union it will all posts that have a parent relation but are not part of a tree.

<div class="tab-wrapper">
	{% capture tab_content %}{% highlight sql %}{%
		include_relative query.sql
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "2" sub_index = "a"
		name = "query.sql"
		content = tab_content
	%}
	{% capture tab_content %}{% highlight javascript %}{%
		include_relative main.mjs
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "2" sub_index = "b"
		name = "main.mjs"
		content = tab_content
	%}
</div>

The results of this query can be found [here](./bad_relations.generated.html). The reason being, it is a large (1-10 MB) file and can slow down even fast web browsers. It is best to leave that page for people that want to actually see it.

While not all encompassing, a quick, simple, and effective search can be used to find posts that are part of a chain. <a href="https://e621.net/post?tags=isparent%3Atrue+ischild%3Atrue">\{\{isparent:true ischild:true\}\}</a>. This returns all posts that are in the middle of a graph.