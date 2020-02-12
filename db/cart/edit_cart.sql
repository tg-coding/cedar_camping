update order_items
set start_date = $2,
    duration = $3
where id = $1