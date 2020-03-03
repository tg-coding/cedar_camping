require("dotenv").config();
const express = require("express"),
  massive = require("massive"),
  session = require("express-session"),
  cgCtrl = require("./controllers/campgroundController"),
  csCtrl = require("./controllers/campsiteController"),
  authCtrl = require("./controllers/authController"),
  stripeCtrl = require("./controllers/stripeController"),
  cartCtrl = require("./controllers/cartController"),
  path = require("path"),
  { SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env,
  app = express();

app.use(express.json());

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
  })
);

massive(CONNECTION_STRING).then(db => {
    app.set("db", db);
    console.log("db connected");
    app.listen(SERVER_PORT, () =>
      console.log(`Server running on ${SERVER_PORT}`)
    );
  });
  
  app.use(express.static(__dirname + "/../build"));
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
  });



//auth endpoints
app.post("/auth/login", authCtrl.login);
app.post("/auth/register", authCtrl.register);
app.post("/auth/logout", authCtrl.logout);
app.get("/auth/user", authCtrl.getUser);

//campground endpoints
app.get("/api/campgrounds", cgCtrl.getCampgrounds);
app.get("/api/campground/:id", cgCtrl.getCampground);
app.get("/api/campgrounds/:id", cgCtrl.searchCampgrounds);

//campsite endpoints
app.get("/api/campsites/:id", csCtrl.getCampsites);
app.get("/api/campsite/:id", csCtrl.getCampsite);
app.get("/api/campsite-search/:id", csCtrl.searchCampsites);

//cart endpoints
app.get("/api/cart/:id", cartCtrl.getCart);
app.post("/api/cart", cartCtrl.addToCart);
app.put("/api/cart/:id", cartCtrl.editCart);
app.delete("/api/cart/:id", cartCtrl.removeFromCart);

// stripe endpoints
app.post("/api/payment", stripeCtrl.payment);


