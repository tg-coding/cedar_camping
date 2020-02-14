-- select * from campsites;

-- select *
-- from campsites c
-- join campsite_media cm on c.campsite_id = cm.campsite_id;


select *
from campgrounds cg
join campsites cs on cg.campground_id = cs.campground_id
where cg.campground_id = $1;