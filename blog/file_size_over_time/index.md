---
layout: "default"
date: "2019-03-12"
---

Hard-drives keep getting bigger but we keep losing space. It seems that the size of files is in lock-step with the size of hard-drives. (or is it the other way around?) I suspect that there is a fair amount of file-size-bloat (much like [software-bloat](https://en.wikipedia.org/wiki/Software_bloat)) plaguing the media we have today. 

Let's start with using e621 and just analyzing the average file size over time.

<div class="tab-wrapper">
	{% capture tab_content %}
		{% include components/figure.html 
			link = "./daily_file_size.svg"
			inside = ""
		%}
	{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "a"
		name = "daily_file_size.svg"
		content = tab_content
	%}

	{% capture tab_content %}{% highlight javascript %}{%
		include_relative daily_file_size.mjs
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "b"
		name = "daily_file_size.mjs"
		content = tab_content
	%}
</div>

Whoa, that looks like it has some outliers. I can not pin dates to the outliers that match results on e621, but almost assuredly they are caused by large flash files on days with very low. The most recent outlier was after the death of flash so it must be because of a lot of videos uploaded on the same day.

Lets do the same thing, but smooth the increase the average to yearly and separate the data by file type.

<div class="tab-wrapper">
	{% capture tab_content %}
		{% include components/figure.html 
			link = "./yearly_file_size.svg"
			inside = ""
		%}
	{% endcapture %}
	{% include components/tab_item.html 
		index = "2" sub_index = "a"
		name = "yearly_file_size.svg"
		content = tab_content
	%}

	{% capture tab_content %}{% highlight javascript %}{%
		include_relative yearly_file_size.mjs
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "2" sub_index = "b"
		name = "yearly_file_size.mjs"
		content = tab_content
	%}
</div>

So now we know that there is a visible increase in average file size over time on e621 for all file types but that is not the whole story. If you were to do this analysis by going to your favorites and looking at file sizes, you might not come to the same conclusion. That is because *there is a large variance for file size regardless of image format*.

<div class="tab-wrapper">
	{% capture tab_content %}{% highlight sql %}{%
		include_relative yearly_file_size_std.sql
	%}{% endhighlight %}{% endcapture %}
	{% include components/tab_item.html 
		index = "3" sub_index = "a"
		name = "yearly_file_size_std.sql"
		content = tab_content
	%}
</div>

I am leaving out a graph because I am not sure how to best present this information and am weary it will be taken out of context. I can say that standard deviation was *the same or larger* for all averages over time. This means the distribution for file size is very skewed.

I could plot the distribution of file size for a specific file format but it is not interesting (I did plot it). It looks almost like the [Exponential Distribution](https://en.wikipedia.org/wiki/Exponential_distribution) (almost because 0 KB is not the mode).
