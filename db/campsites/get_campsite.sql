select *
from campsites c
join campsite_attributes ca on c.campsite_id = ca.campsite_id
join campsite_media cm on c.campsite_id = cm.campsite_id
where c.campsite_id = $1;