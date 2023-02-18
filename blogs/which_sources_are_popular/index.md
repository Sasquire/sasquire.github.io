---
layout: "default"
date: "2019-03-22"
---

e621 accepts sources from most anywhere, but which sites generate the most sources for e621? It is not that hard to run a query and sort by URL but we want something a little more fine-tuned than that. I would like to use the inbuilt tools for URL manipulation, but that can not seem to discard subdomains. That is, tell the difference between `www.site.com` and `site.com`. Because of that I used [parse-domain](https://www.npmjs.com/package/parse-domain) to extract the domain and [tld](https://en.wikipedia.org/wiki/Top-level_domain) of each domain.

{% include components/figure.html 
	link = "./source_popularity.svg"
	inside = ""
%}

A full list of the sources can be found [here](./source_table.generated.html).

<div class="tab-wrapper">
	{% capture tab_content %}{% highlight javascript %}{%
		include_relative main.mjs
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "a"
		name = "main.mjs"
		content = tab_content
	%}
</div>