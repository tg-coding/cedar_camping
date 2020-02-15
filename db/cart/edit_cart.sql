update order_items
set start_date = $2,
    duration = $3
where order_item = $1;