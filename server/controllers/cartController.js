module.exports = {
    
    addToCart: (req, res) => {
        const {customer_order_id, campsite_id, start_date, duration, campsite_price} = req.body,
               db = req.app.get('db');
               price = campsite_price
        console.log(req.body)
        db.cart.add_to_cart({customer_order_id, campsite_id, start_date, duration, price})
        .then(data => res.status(200).send('Added to cart'))
        .catch(err => res.status(500).send(err));
    },

    getCart: (req, res) => {
        const {id} = req.params,
               db = req.app.get('db');
               customer_order_id = id

        console.log(req.params)
        db.cart.get_cart(customer_order_id)
        .then(cart => res.status(200).send(cart))
        .catch(err => res.status(200).send(err));
    },


    removeFromCart: (req, res) => {
        const {id} = req.params,
               db = req.app.get('db');

        db.cart.remove_from_cart(id)
        .then(data => res.status(200).send(data))
        .catch(err => res.status(400).send(err));
    },

    editCart: (req, res) => {
        const {id} = req.params,
              {start_date, duration} = req.body,
               db = req.app.get('db');

        db.cart.remove_from_cart([id, start_date, duration])
        .then(() => res.Status(200))
        .catch(err => res.status(400).send(err));
    }
    

}