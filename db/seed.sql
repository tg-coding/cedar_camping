create table customers(
customer_id serial primary key,
username varchar(150) not null,
email varchar(150) not null,
password varchar(250) not null,
profile_pic varchar(500) not null
);

create table customer_order(
customer_order_id serial primary key,
customer_id int references customers(customer_id),
paid boolean
);

create table campgrounds (
campground_id serial primary key,
campground_name varchar(200),
park_name varchar(200),
campground_img varchar(1100),
campground_img_credit varchar(200),
campground_latitude varchar(50),
campground_longitude varchar(50),
campground_description varchar(3000)
);

create table campsites (
campsite_id serial primary key,
campsite_name varchar(200),
campground_name varchar(200),
park_name varchar(200),
campsite_primary_img_url varchar(1100),
campsite_type varchar(200),
campsite_price decimal,
campground_id int references campgrounds(campground_id)
);

create table order_items (
order_item serial primary key,
customer_order_id int references customer_order(customer_order_id),
campsite_id int references campsites(campsite_id),
start_date date,
duration int,
price decimal
);

create table campsite_attributes (
attribute_id serial primary key,
campsite_id int references campsites(campsite_id),
campsite_latitude varchar(50),
campsite_longitude varchar(50),
water varchar(20),
toilets varchar(20),
showers varchar(20),
campfire_allowed varchar(20),
grill varchar(20),
parking varchar(20),
site_length varchar(20),
site_width varchar(20),
water_hookups varchar(20),
sewer_hookups varchar(20),
electric_hookups varchar(20)
);

create table campsite_media (
campsite_media_id serial primary key,
campsite_id int references campsites(campsite_id),
campsite_img_url varchar(1100),
campsite_img_credit varchar(200)
);

-- create table campsites(
-- campsite_id serial primary key,
-- campsite_name varchar(200),
-- campground_name varchar(200),
-- park_name varchar(200),
-- campsite_latitude varchar(50),
-- campsite_longitude varchar(50),
-- campsite_short_description varchar(1000),
-- campsite_long_description varchar(2000),
-- campsite_price decimal
-- );

-- create table campsite_attributes(
-- attribute_id serial primary key,
-- campsite_id int references campsites(campsite_id),
-- water varchar(20),
-- toilets varchar(20),
-- showers varchar(20),
-- campfire_allowed varchar(20),
-- grill varchar(20),
-- parking varchar(20),
-- site_length varchar(20),
-- site_width varchar(20),
-- water_hookups varchar(20),
-- sewer_hookups varchar(20),
-- electric_hookups varchar(20)
-- );

-- create table campsite_media(
-- media_id serial primary key,
-- campsite_id int references campsites(campsite_id),
-- img_url varchar(1100),
-- img_credit varchar(200)
-- );

 



insert into campgrounds (
campground_name,
park_name,
campground_img,
campground_img_credit,
campground_latitude,
campground_longitude,
campground_description
) values (
‘Zions Campground’,
‘Zions National Park’,
‘https://www.outsideonline.com/sites/default/files/styles/width_1200/public/2019/12/11/zion-national-park_h.jpg?itok=FosQHFZ6’,
‘Image Credit Here’,
‘Latitude Here’,
‘Longitude Here’,
‘Campground Description Here’,
),
 (
‘Zions Campground2’,
‘Zions National Park2’,
‘https://www.outsideonline.com/sites/default/files/styles/img_850-width_flex-height/public/2019/12/18/narrow-zion-np_h.jpg?itok=kzIhKXlc’,
‘Image Credit Here2’,
‘Latitude Here2’,
‘Longitude Here2’,
‘Campground Description Here2’,
);

insert into campsites (
campsite_name,
campground_name,
park_name,
campsite_primary_img_url,
campsite_type,
campsite_price,
campground_id
) values (
‘Campsite Name Here’,
‘Zions Campground’,
‘Zions National Park’,
‘https://www.outsideonline.com/sites/default/files/styles/img_850-width_flex-height/public/2019/12/11/zion-road-carlight_h.jpg?itok=YJqnaxJs',
‘Campsite Type Here’,
9.99,
1
),
(
‘Campsite Name Here2’,
‘Zions Campground2’,
‘Zions National Park2’,
‘https://www.outsideonline.com/sites/default/files/styles/img_850-width_flex-height/public/2019/12/11/zion-narrows-virgins_h.jpg?itok=QJGh4lvP,
‘Campsite Type Here2’,
12.99,
2
);


insert into campsite_attributes (
campsite_id,
campsite_latitude,
campsite_longitude,
water,
toilets,
showers,
campfire_allowed,
grill,
parking,
site_length,
site_width,
water_hookups,
sewer_hookups,
electric_hookups
) values (
1,
‘campsite_latitude’,
‘campsite_longitude’,
‘water’,
‘toilets’,
‘showers’,
‘campfire_allowed’,
‘grill’,
‘parking’,
‘site_length’,
‘site_width’,
‘water_hookups’,
‘sewer_hookups’,
‘electric_hookups’
),
(
2,
‘campsite_latitude2’,
‘campsite_longitude2’,
‘water2’,
‘toilets2’,
‘showers2’,
‘campfire_allowed2’,
‘grill2’,
‘parking2’,
‘site_length2’,
‘site_width2’,
‘water_hookups2’,
‘sewer_hookups2’,
‘electric_hookups2’
);

insert into campsite_media (
campsite_id,
campsite_img_url,
campsite_img_credit
) values (
1,
‘campsite_img_url’,
‘campsite_img_credit’
),
(
2,
'campsite_img_url2’,
‘campsite_img_credit2’
);
