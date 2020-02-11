require('dotenv').config();
const express = require('express'),
        massive = require('massive'),
        campCtrl = require('./controllers/campsiteController'),
        // authCtrl = require('./controllers/authController'),
        // cartCtrl = require('./controllers/cartController'),
        {SERVER_PORT, CONNECTION_STRING} = process.env,
        app = express();

app.use(express.json());


//auth endpoints
// app.post('/auth/login', authCtrl.login);
// app.post('/auth/register', authCtrl.register);
// app.post('/auth/logout', authCtrl.logout);
// app.get('/auth/user', authCtrl.getUser); 

//campsite endpoints
app.get('/api/campsites', campCtrl.getCampsites);
// app.get('/api/campsites-all', campCtrl.getCampsitesAll);
// app.get('/api/campsite', campCtrl.getCampsite);

//cart endpoints
// app.get('/api/cart/:id', cartCtrl.getCart);
// app.post('/api/cart', cartCtrl.addToCart);
// app.put('/api/cart/:id', cartCtrl.editCart);
// app.delete('/api/cart/:id', cartCtrl.deleteFromCart);




massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
    console.log('db connected')
    app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`))
});