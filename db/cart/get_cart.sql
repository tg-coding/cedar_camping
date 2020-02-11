select * from order_items order_items
join campsites c on oi.campsite_id = c.campsite_id
where oi.customer_order_id = $1;