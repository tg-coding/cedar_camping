-- select * from campsites;

-- select *
-- from campsites c
-- join campsite_media cm on c.campsite_id = cm.campsite_id;


select cs.campsite_id, cs.campsite_name, cs.campsite_primary_img_url, cs.campsite_type, cs.campsite_price, cs.campground_id
from campsites cs
join campgrounds cg on cs.campsite_id = cg.campground_id
where cg.campground_id = $1;