const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports = {
  payment: async (req, res) => {
    //convert amount to pennies
    const amountArray = req.body.amount.toString().split("");
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if (amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
        break;
      } else {
        pennies.push(amountArray[i]);
      }
    }
    const convertedAmt = parseInt(pennies.join(""));

    const charge = stripe.charges.create(
      {
        amount: convertedAmt, // amount in cents, again
        currency: "usd",
        source: req.body.token.id,
        description: "Test charge from react app"
      },
      async function(err, charge) {
        if (err) return res.sendStatus(500);

        const { customer_order_id, customer_id } = req.body;
        const db = req.app.get("db");

        db.cart.cart_paid(customer_order_id, customer_id)
        .then(
            cart => {
                req.session.user.customer_order_id = cart[0].customer_order_id
                res.status(200).send(req.session.user)
            }
        ).catch(err => res.sendStatus(500))


        // .then(cart => res.status(200).send(cart))
        // .catch(err => res.sendStatus(500));
      }
    );
  }
};

// function (err, charge) {
//     if (err) return res.sendStatus(500);

//     const {customer_order_id, customer_id} = req.body
//     const db = req.app.get('db');

//     db.cart.cart_paid(customer_order_id, customer_id)
//     .then(cart => res.status(200).send(cart))
//     .catch(err => res.sendStatus(500));


// let userCart = db.cart.cart_paid(customer_order_id, customer_id);
// let sessionUser = { ...userCart[0] };
// session.user = sessionUser;
// res.status(200).send(session.user);

// db.cart.cart_paid(customer_order_id);
// let userCart = await db.cart.create_order(customer_id)
// console.log(userCart)
// let sessionUser = { ...userCart[0] };
// session.user = sessionUser;
// res.status(200).send(session.user);