---
layout: "default"
date: ""
---

# Here is a Blog index

{% include components/folder_list.html
	folder_to_scan = "/blogs"
	display_attributes = "name date"
	
	sorting_attribute = "date"
	sorting_reversed = "true"
%}