---
layout: "default"
date: "2023-02-21"
---

I *love* using map and filter on arrays. I think it makes iterating over data, conceptually, a lot simpler. But I am always wanting to know clever tricks to improve performance or reduce memory usage. When I learned that python had [lazy evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation) I wanted to know how does the performance compare to javascript's built-in map-filter-reduce functions.

To spoil the conclusion before the code: *My* lazy evaluation does not outperform the built-ins that javascript has. That doesn't mean that these lazy evaluators are useless though. Lazy evaluation has the benefit that it can be used on infinite data! It also (more usefully) can be used on streamed data.

<div class="tab-wrapper">
	{% capture tab_content %}{% highlight javascript %}{%
		include_relative index.mjs
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "a"
		name = "index.mjs"
		content = tab_content
	%}

	{% capture tab_content %}{% highlight javascript %}{%
		include_relative result.txt
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "b"
		name = "result.txt"
		content = tab_content
	%}
</div>