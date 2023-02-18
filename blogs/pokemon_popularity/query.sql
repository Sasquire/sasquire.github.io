with recursive pokemon_tree (parent_id, child_id, depth) as (
	-- Everything that implies pokemon
	select
		0 as parent_id,
		tag_id as child_id,
		0 as depth
	from tags
	where name = 'pokemon_(species)'
	--
	union all
	-- Everything that implies something that implies pokemon
	select
		current.child_id as parent_id,
		deeper.implier_tag_id as child_id,
		current.depth + 1 as depth
	from pokemon_tree as current
	inner join tag_implications as deeper on (current.child_id = deeper.implied_tag_id)
	where status = 'active'
),
pokemon_leaves as (
	select distinct
		child_id as tag_id,
		-- Lumps a few things pokemon types together
		-- TODO add stuff for zygarde_10_forme and zygarde_complete_forme
		replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(name,
			'mega_', ''),
			'_(pokemon)', ''),
			'gigantamax_', ''),
			'galarian_', ''),
			'alolan_', ''),
			'hisuian_', ''),
			'paldean_', ''),
			'origin_forme_', ''),
			'primal_', ''),
			'_(pokémon_gold_beta)', ''),
			'shadow_', '')
		as name,
		count_on_active_posts
	from pokemon_tree
	inner join tags on (child_id = tag_id)
	and depth != 0 -- no 'pokemon_(species)' tag
	and depth = 2 -- Most common depth for species groups
	-- These are groups in the depth = 2 category (for some reason...)
	and name not in (
		'ancient_pokemon',
		'future_pokemon',
		'legendary_trio',
		'legendary_duo',
		'swords_of_justice',
		'guardian_tapu',
		'hisuian_form',
		'alolan_form',
		'galarian_form',
		'paldean_form'
	)
	-- Used when you really want all the leaves. It seems that *most*
	-- pokemon-groups (full pokemon or the group for those without a baseform)
	-- reside at depth = 2. This could backfire, but I don't care.
	-- where child_id not in (select parent_id from pokemon_tree)
	--
	-- Used to find all the forms at depth 3 that are not captured
	-- at a depth of 2. Appears to mostly be regional pokemon. 
	-- and depth = 3 and child_id not in (select child_id from pokemon_tree as b where b.depth = 2)
)
select
	-- Capitalize first letter of each pokemon
	upper(substr(name, 1, 1)) || substr(name, 2) as key,
	sum(count_on_active_posts) as count
from pokemon_leaves
group by name;
