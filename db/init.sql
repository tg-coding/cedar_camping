insert into campsites (
    campsite_name,
    campground_name,
    park_name,
    campsite_latitude,
    campsite_longitude,
    campsite_short_description,
    campsite_long_description,
    campsite_price
) values (
    1,
    'Timpooneke Campground',
    'Uinta-Wasatch-Cache National Forest',
    '40.432181',
    '-111.643475',
    'Timpooneke Campground is located in a mountainous area next to the Mt. Timpanogos Wilderness.',
    'Aspen, spruces and fir trees are the dominant tree species. Hiking, horseback riding, and wildlife viewing are popular activities in this area. Site amenities include firewood, grills and picnic tables.
    There is no water available at the campground',
    99.99
);

select * from campsites;

insert into campsite_attributes (
    campsite_id,
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
    'No',
    'Yes',
    'No',
    'No',
    'No',
    'No',
    '12ft',
    '10ft',
    'No',
    'No',
    'No'
);

select * from campsite_attributes;

insert into campsite_media (
    campsite_id,
    img_url,
    img_credit
) values (
    1,
    'https://www.google.com/maps/uv?hl=en&pb=!1s0x874d888a58a9b12b%3A0x4bff8433c1ac8fac!3m1!7e115!4shttps%3A%2F%2Flh5.googleusercontent.com%2Fp%2FAF1QipOJ76n_FH5qJaeJN6VrQJexU0uNIqCdPB5RvCo0%3Dw260-h175-n-k-no!5samerican%20fork%20canyon%20campgrounds%20-%20Google%20Search!15sCAQ&imagekey=!1e10!2sAF1QipOJ76n_FH5qJaeJN6VrQJexU0uNIqCdPB5RvCo0#',
    'Craig'
);

select * from campsite_media