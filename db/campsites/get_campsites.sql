-- select * from campsites;

select *
from campsites c
join campsite_media cm on c.campsite_id = cm.campsite_id;
