select *
from campgrounds c
where c.campground_name ilike ('%'|| $1 ||'%')
or c.park_name ilike ('%'|| $1 ||'%');