const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const {username, email, password} = req.body,
              img = `https://source.unsplash.com/collection/429524/300x300`;
              db = req.app.get('db'),
              {session} = req;

        let user = await db.user.check_customer(email);
        if(user[0]){
            return res.status(400).send('Email already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        let newUser = await db.user.register_customer(username, email, hash, img);

        let userCart = await db.cart.create_order(newUser[0].customer_id);
        let sessionUser = {...newUser[0], ...userCart[0]};
        session.user = sessionUser;
        res.status(201).send(session.user);
    },

    login: async(req, res) => {
        console.log(req.body);
        const {email, password} = req.body,
              db = req.app.get('db'),
              {session} = req;

        let user = await db.user.check_customer(email);
        if(!user[0]){
            return res.status(400).send('User not found')
        }
        const authorized = bcrypt.compareSync(password, user[0].password);
        if(!authorized){
            return res.status(401).send('Incorrect Password')
        }
        console.log(user)
        delete user[0].password;
        session.user = user[0];
        res.status(202).send(session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },

    getUser: (req, res) => {
        if (req.session.user){
            res.status(200).send(req.session.user);
        } else {
            res.status(200).send('No user on session');
        }
    }
};