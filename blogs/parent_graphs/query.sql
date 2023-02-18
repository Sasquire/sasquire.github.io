with recursive post_parent_tree(tree_id, post_id, child_id) as (
	-- all root nodes
	select
		parent.post_id as tree_id,
		parent.post_id,
		child.post_id as child_id
	from posts_metadata as parent
	inner join posts_metadata as child on (parent.post_id = child.parent_id)
	where parent.parent_id is null
		and parent.is_deleted = 0
		and child.is_deleted = 0
	--
	union all
	-- the children of the root nodes 
	select 
		tree_id,
		current.child_id,
		deeper.post_id
	from post_parent_tree as current
	inner join posts_metadata as deeper on(current.child_id = deeper.parent_id)
	where deeper.is_deleted = 0
),
posts_with_a_relation as (
	-- all children
	select post_id
	from posts_metadata
	where parent_id is not null
		and is_deleted = 0
	--
	union
	-- all parents
	select parent_id as post_id
	from posts_metadata
	where parent_id is not null
		and is_deleted = 0
),
posts_in_a_tree as (
	select post_id from post_parent_tree
	union
	select child_id as post_id from post_parent_tree
),
-- If its not in a tree, it could be in a cycle or the root could be deleted
posts_not_in_a_tree as (
	select post_id
	from posts_with_a_relation
	where post_id not in (select post_id from posts_in_a_tree)
),
-- Because post_parent_tree is id-child instead of parent-id, posts are
-- good when the post_id matches the tree_id. It keeps track of children
-- instead of keeping track of parents.
trees_with_problems as (
	select distinct tree_id
	from post_parent_tree
	inner join posts_metadata using (post_id)
	where tree_id != post_id
		and is_deleted = 0
)
-- Get and format bad trees
select
	tree_id,
	-- Add one to count for the tree-post
	count(*) + 1 as num_posts
from post_parent_tree
inner join trees_with_problems using(tree_id)
group by tree_id
union all
-- Get and format bad non-trees
select
	post_id as tree_id,
	-1 as num_posts 
from posts_not_in_a_tree
--
order by tree_id;
