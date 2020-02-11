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

create table order_items(
order_item serial primary key,
customer_order_id int references customer_order(customer_order_id),
campsite_id int references campsites(campsite_id),
start_date date,
duration int,
price decimal
);

create table campsites(
campsite_id serial primary key,
campsite_name varchar(200),
campground_name varchar(200),
park_name varchar(200),
campsite_latitude varchar(50),
campsite_longitude varchar(50),
campsite_short_description varchar(1000),
campsite_long_description varchar(2000),
campsite_price decimal
);

create table campsite_attributes(
attribute_id serial primary key,
campsite_id int references campsites(campsite_id),
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

create table campsite_media(
media_id serial primary key,
campsite_id int references campsites(campsite_id),
img_url varchar(1100),
img_credit varchar(200)
);