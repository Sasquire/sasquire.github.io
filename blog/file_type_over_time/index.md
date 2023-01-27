---
layout: "default"
date: "2023-01-13"
---

This is a quick sidestep from the <a href="./../file_size_over_time">file size over time</a> to show post count over time. The core question is, which filetypes have increased in popularity over time?


<div class="tab-wrapper">
	{% capture tab_content %}
		{% include components/figure.html 
			link = "./file_type_over_time.svg"
			inside = ""
		%}
	{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "a"
		name = "file_type_over_time.svg"
		content = tab_content
	%}

	{% capture tab_content %}{% highlight javascript %}{%
		include_relative main.mjs
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "b"
		name = "main.mjs"
		content = tab_content
	%}
</div>
