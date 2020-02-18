update order_items
set start_date = $2,
    duration = $3
where order_item_id = $1;