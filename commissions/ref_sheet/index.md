---
layout: "default"
date: "2024-04-09"
artist: "troutsworth"
commission_type: "_fursona"
---

<div class="tab-wrapper">
	{% capture tab_content %}
		{% include components/figure.html 
			link = "./final.png"
			inside = ""
			type = "static_image"
		%}
	{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "a"
		name = "final.png"
		content = tab_content
	%}

	{% capture tab_content %}
		{% include components/figure.html 
			link = "./scan.png"
			inside = ""
			type = "static_image"
		%}
	{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "b"
		name = "scan.png"
		content = tab_content
	%}
</div>