---
layout: "default"
date: ""
---

# Here's a project index

In my mind, projects are things that are not simple scripts and graphs; still large enough to require their own page; not so large that they deserve their own repository. This will probably be left sparse for a long period of time, as most things I make are either too small or too large to be here.

{% include components/folder_list.html
	folder_to_scan = "/projects"
	sorting_attribute = "name"
	display_attributes = "name"
%}