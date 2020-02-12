insert into customers(
    username,
    email,
    password,
    profile_pic
) values (
    $1,
    $2,
    $3,
    $4
)

returning customer_id, username, email, profile_pic;