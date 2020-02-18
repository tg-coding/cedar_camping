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
campsite_primary_img_credit varchar(200),
campsite_type varchar(200),
campsite_price decimal,
campground_id int references campgrounds(campground_id)
);

create table order_items (
order_item_id serial primary key,
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
checkin_time varchar(50),
checkout_time varchar(50),
campfire_allowed varchar(50),
fire_pit varchar(50),
grill varchar(50),
picnic_table varchar(50),
electric_hookups varchar(50),
sewer_hookups varchar(50),
pets_allowed varchar(50),
water varchar(50),
showers varchar(50),
toilets varchar(50),
site_width varchar(50),
site_length varchar(50)
);

create table campsite_media (
campsite_media_id serial primary key,
campsite_id int references campsites(campsite_id),
campsite_img_url varchar(1100),
campsite_img_credit varchar(200),
campsite_img_url_2 varchar(1100),
campsite_img_credit_2 varchar(200),
campsite_img_url_3 varchar(1100),
campsite_img_credit_3 varchar(200)
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

 

