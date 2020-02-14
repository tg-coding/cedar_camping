select *
from campsites c
join campsite_media cm on c.campsite_id = cm.campsite_id
where c.campsite_name ilike ('%'|| $1 ||'%')
or c.campground_name ilike ('%'|| $1 ||'%')
or c.park_name ilike ('%'|| $1 ||'%');


-- select *
-- from campgrounds cg
-- join campsites cs on cg.campground_id = cs.campground_id
-- where cg.campground_id = $1
-- and c.campsite_name ilike ('%'|| $1 ||'%')
-- or c.campground_name ilike ('%'|| $1 ||'%')
-- or c.park_name ilike ('%'|| $1 ||'%');