insert into order_items (
    customer_order_id,
    campsite_id,
    start_date,
    duration,
    price
) values (
    ${customer_order_id},
    ${campsite_id},
    ${start_date},
    ${duration},
    ${price}
);