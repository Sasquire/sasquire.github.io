---
layout: "default"
title: "similar_tags"
date: "2019-04-19"
---

<style>
	td {
		max-width: 20ch;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.species { color:#ed5d1f; }
	.artist { color:#f2ac08; }
	.character { color:#0a0; }
	.copyright { color:#d0d; }

	.tag_count { width: 8ch; }
	.tag_count_small { width: 4ch; }
</style>

<table id="main_table">
	<thead>
		<tr>
			<th>tag1_id</th>
			<th>tag2_id</th>
			<th class="tag_count">tag1_count</th>
			<th class="tag_count_small">tag2_count</th>
			<th>tag1_name</th>
			<th>tag2_name</th>
			<th>similarity</th>
		</tr>
	</thead>
	<tbody id="main_body">
	</tbody>
</table>

<script>
	fetch('tag_similarities.json')
		.then(e => e.text())
		.then(e => JSON.parse(e))
		.then(e => e.sort((a, b) => {
			const count_diff = b[3] - a[3];
			if(count_diff != 0){ return count_diff; }

		//	const second_count_diff = b[7] - a[7];
		//	if(second_count_diff != 0){ return second_count_diff; }

			const text_diff = b[1].localeCompare(a[1]);
			if(text_diff != 0){ return text_diff; }

			return b[8] - a[8]
		}))
		.then(e => {
			const body = document.getElementById('main_body');
			body.innerHTML = e.reduce((acc, p) => acc + row_to_html(p),'')
		})
	
	function row_to_html(row){
		return `<tr>
			<td class="${get_class(row[2])}">${row[0]}</td>
			<td class="${get_class(row[6])}">${row[4]}</td>
			<td class="tag_count">${row[3]}</td>
			<td class="tag_count_small">${row[7]}</td>
			<td>${escapeHtml(row[1])}</td>
			<td>${escapeHtml(row[5])}</td>
			<td>${row[8]}</td>
		</tr>`
	}

	function escapeHtml(unsafe) {
		return unsafe
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");
	 }
	 
	 function get_class(id){
		 switch(id){
			 case 1: return 'general';
			 case 2: return 'artist';
			 case 3: return 'species';
			 case 4: return 'copyright';
			 case 5: return 'character';
		 }
	 }
</script>