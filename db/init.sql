-- **********   DUMMY DATA   **********

-- insert into campgrounds (
-- campground_name,
-- park_name,
-- campground_img,
-- campground_img_credit,
-- campground_latitude,
-- campground_longitude,
-- campground_description
-- ) values (
-- 'Zions Campground',
-- 'Zions National Park',
-- 'https://www.outsideonline.com/sites/default/files/styles/width_1200/public/2019/12/11/zion-national-park_h.jpg?itok=FosQHFZ6',
-- 'Image Credit Here',
-- 'Latitude Here',
-- 'Longitude Here',
-- 'Campground Description Here'
-- ),
--  (
-- 'Zions Campground2',
-- 'Zions National Park2',
-- 'https://www.outsideonline.com/sites/default/files/styles/img_850-width_flex-height/public/2019/12/18/narrow-zion-np_h.jpg?itok=kzIhKXlc',
-- 'Image Credit Here2',
-- 'Latitude Here2',
-- 'Longitude Here2',
-- 'Campground Description Here2'
-- );

-- select * from campgrounds;

-- insert into campsites (
-- campsite_name,
-- campground_name,
-- park_name,
-- campsite_primary_img_url,
-- campsite_type,
-- campsite_price,
-- campground_id
-- ) values (
-- 'Campsite Name Here',
-- 'Zions Campground',
-- 'Zions National Park',
-- 'https://www.outsideonline.com/sites/default/files/styles/img_850-width_flex-height/public/2019/12/11/zion-road-carlight_h.jpg?itok=YJqnaxJs',
-- 'Campsite Type Here',
-- 9.99,
-- 1
-- ),
-- (
-- 'Campsite Name Here2',
-- 'Zions Campground2',
-- 'Zions National Park2',
-- 'https://www.outsideonline.com/sites/default/files/styles/img_850-width_flex-height/public/2019/12/11/zion-narrows-virgins_h.jpg?itok=QJGh4lvP',
-- 'Campsite Type Here2',
-- 12.99,
-- 2
-- );

-- select * from campsites;


-- insert into campsite_attributes (
-- campsite_id,
-- campsite_latitude,
-- campsite_longitude,
-- water,
-- toilets,
-- showers,
-- campfire_allowed,
-- grill,
-- parking,
-- site_length,
-- site_width,
-- water_hookups,
-- sewer_hookups,
-- electric_hookups
-- ) values (
-- 1,
-- 'campsite_latitude',
-- 'campsite_longitude',
-- 'water',
-- 'toilets',
-- 'showers',
-- 'campfire_allowed',
-- 'grill',
-- 'parking',
-- 'site_length',
-- 'site_width',
-- 'water_hookups',
-- 'sewer_hookups',
-- 'electric_hookups'
-- ),
-- (
-- 2,
-- 'campsite_latitude2',
-- 'campsite_longitude2',
-- 'water2',
-- 'toilets2',
-- 'showers2',
-- 'campfire_allowed2',
-- 'grill2',
-- 'parking2',
-- 'site_length2',
-- 'site_width2',
-- 'water_hookups2',
-- 'sewer_hookups2',
-- 'electric_hookups2'
-- );

-- select * from campsite_attributes;


-- insert into campsite_media (
-- campsite_id,
-- campsite_img_url,
-- campsite_img_credit,
-- campsite_img_url_2,
-- campsite_img_credit_2,
-- campsite_img_url_3,
-- campsite_img_credit_3
-- ) values (
-- 1,
-- 'https://www.visittheusa.com/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2017-01/HERO%201_%20Bryce_Canyon_GettyImages-587434801_crop.jpg?itok=ySghuEAJ',
-- 'campsite_img_credit-1',
-- 'https://www.myutahparks.com/.image/t_share/MTQ4MzM1NjgyNTMwNTE4Nzcy/bryce-amphitheater-inspiration-point_dp_680.jpg',
-- 'campsite_img_credit-2',
-- 'https://www.nps.gov/brca/planyourvisit/images/20171121-IMG_5142.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
-- 'campsite_img_credit-3'
-- ),
-- (
-- 2,
-- 'https://www.visittheusa.com/sites/default/files/styles/hero_m_1300x700/public/images/hero_media_image/2017-01/HERO%201_%20Bryce_Canyon_GettyImages-587434801_crop.jpg?itok=ySghuEAJ',
-- 'campsite_img_credit-1',
-- 'https://www.myutahparks.com/.image/t_share/MTQ4MzM1NjgyNTMwNTE4Nzcy/bryce-amphitheater-inspiration-point_dp_680.jpg',
-- 'campsite_img_credit-2',
-- 'https://www.nps.gov/brca/planyourvisit/images/20171121-IMG_5142.jpg?maxwidth=1200&maxheight=1200&autorotate=false',
-- 'campsite_img_credit-3'
-- );

-- select * from campsite_media;

