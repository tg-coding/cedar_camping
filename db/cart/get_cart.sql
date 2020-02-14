select * from order_items oi
join campsites c on oi.campsite_id = c.campsite_id
where oi.customer_order_id = $1;