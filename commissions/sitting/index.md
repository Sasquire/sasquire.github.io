---
layout: "default"
date: "2025-09-16"
artist: "oreobird"
commission_type: "_fursona"
---

Art by the creative [Oreobird](https://www.furaffinity.net/user/oreobird/). Another piece gifted to me by a patron of Oerobird. I'm not a patron myself but maybe I should be soon.

<script src="/static/image_encryption/encryption_utils.js"></script>
<div class="tab-wrapper">
	{% capture tab_content %}
		{% include components/figure.html 
			link = "./final.png.encrypted"
			inside = ""
			type = "encrypted_image"
		%}
	{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "a"
		name = "final.png"
		content = tab_content
	%}
	{% capture tab_content %}
		{% include components/figure.html 
			link = "./sketch_2.png.encrypted"
			inside = ""
			type = "encrypted_image"
		%}
	{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "b"
		name = "sketch_2.png"
		content = tab_content
	%}
		{% capture tab_content %}
		{% include components/figure.html 
			link = "./sketch_1.png.encrypted"
			inside = ""
			type = "encrypted_image"
		%}
	{% endcapture %}
	{% include components/tab_item.html 
		index = "1" sub_index = "c"
		name = "sketch_1.png"
		content = tab_content
	%}
</div>