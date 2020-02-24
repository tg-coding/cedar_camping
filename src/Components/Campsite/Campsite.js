import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import googleMap from "../../googleMap";
import "./carousel.scss";
import "./campsite.scss";

const Campsite = props => {
  const [campsite, setCampsite] = useState([]);
  const [startDateInput, setStartDateInput] = useState("");
  const [durationInput, setDurationInput] = useState("");

  useEffect(() => {
    console.log(props.match.params);
    axios
      .get(`/api/campsite/${props.match.params.id}`)
      .then(res => {
        setCampsite(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const addToCart = (
    campsite_id,
    startDateInput,
    durationInput,
    campsite_price
  ) => {
    if (props.user.email) {
      axios
        .post("/api/cart", {
          customer_order_id: props.user.customer_order_id,
          campsite_id,
          start_date: startDateInput,
          duration: durationInput,
          campsite_price
        })
        .then(res => {
          window.alert("Campsite added to cart");
        })
        .catch(err => console.log(err));
    } else {
      window.alert("Please login or create an account");
    }
  };
  console.log(campsite);

  const mapStyles = {
    width: "100%",
    maxWidth: "1100px",
    height: "300px",
    overflow: "hidden"
  };

  const campsiteMap = campsite.map((campsite, i) => {
    const { campsite_latitude, campsite_longitude } = campsite;
    return (
      <div key={i} className="google-map-campsite-container">
        <Map
          google={props.google}
          zoom={8}
          style={mapStyles}
          initialCenter={{ lat: campsite_latitude, lng: campsite_longitude }}
        >
          <Marker
            position={{ lat: campsite_latitude, lng: campsite_longitude }}
          />
        </Map>
      </div>
    );
  });

  const mappedCampsite = campsite.map((campsite, i) => {
    const {
      campsite_id,
      campsite_name,
      campground_name,
      park_name,
      campsite_primary_img_url,
      campsite_primary_img_credit,
      campsite_type,
      campsite_price,
      campsite_latitude,
      campsite_longitude,
      checkin_time,
      checkout_time,
      campfire_allowed,
      fire_pit,
      grill,
      picnic_table,
      electric_hookups,
      sewer_hookups,
      pets_allowed,
      water,
      showers,
      toilets,
      site_width,
      site_length,
      campsite_img_url,
      campsite_img_credit,
      campsite_img_url_2,
      campsite_img_credit_2,
      campsite_img_url_3,
      campsite_img_credit_3
    } = campsite;

    return (
      <div key={i} className="cs-container">
        <div className="cs-primary-info-container">
          <div className="carousel-container">
            <Carousel>
              <div className="carousel-hero">
                <img
                  className="carousel-hero-img"
                  src={campsite_primary_img_url}
                  alt={campsite_name}
                />
                <p className="legend">{campsite_primary_img_credit}</p>
              </div>
              {null ? null : (
                <div className="carousel-hero">
                  <img src={campsite_img_url} />
                  <p className="legend">{campsite_img_credit}</p>
                </div>
              )}
              {null ? null : (
                <div className="carousel-hero">
                  <img src={campsite_img_url_2} />
                  <p className="legend">{campsite_img_credit_2}</p>
                </div>
              )}
              {null ? null : (
                <div className="carousel-hero">
                  <img src={campsite_img_url_3} />
                  <p className="legend">{campsite_img_credit_3}</p>
                </div>
              )}
            </Carousel>
          </div>

          <div className="cs-primary-info">
            <h5 className="cs-park-name">{park_name}</h5>
            <h2 className="cs-cg-name">{campground_name}</h2>
            <h3 className="cs-name">Site: {campsite_name}</h3>
            <h3 className="cs-type">Type: {campsite_type}</h3>
            <div className="cs-price-container">
              <h5 id="cs-price">${campsite_price} </h5>
              per night
            </div>
            <hr className="cs-line" id="line1" />
          </div>
          <div className="cs-inputs">
            <div className="cs-input-start-date">
              Start Date
              <input
                className="cs-date-input"
                value={startDateInput}
                placeholder="YYYY-MM-DD"
                type="date"
                onChange={e => setStartDateInput(e.target.value)}
              />
            </div>
            <div className="cs-input-duration">
              Days
              <input
                className="cs-days-input"
                value={durationInput}
                type="number"
                min="1"
                step="1"
                onChange={e => setDurationInput(e.target.value)}
              />
            </div>
            <button
              className="reserve-btn"
              onClick={() =>
                addToCart(
                  campsite_id,
                  startDateInput,
                  durationInput,
                  campsite_price
                )
              }
            >
              Reserve
              <br />
              Campground
            </button>
            <hr className="cs-line" id="line2" />
          </div>
          <div className="cs-attributes-container">
            <div className="cs-attributes-row">
              <div className="cs-coordinate-attribute">
                Latitude
                <br />
                <strong>{campsite_latitude}</strong>
              </div>
              <div className="cs-coordinate-attribute">
                Longitude
                <br />
                <strong>{campsite_longitude}</strong>
              </div>
            </div>
            <hr className="cs-line" id="attribute-line" />
            <div className="cs-attributes-row">
              <div className="cs-attribute">
                Check-in
                <br />
                <strong>{checkin_time}</strong>
              </div>
              <div className="cs-attribute">
                Check-out
                <br />
                <strong>{checkout_time}</strong>
              </div>
              <div className="cs-attribute">
                Campfire Allowed
                <br />
                <strong>{campfire_allowed}</strong>
              </div>
              <div className="cs-attribute">
                Fire Pit
                <br />
                <strong>{fire_pit}</strong>
              </div>
            </div>
            <hr className="cs-line" id="attribute-line" />

            <div className="cs-attributes-row">
              <div className="cs-attribute">
                Grill
                <br />
                <strong>{grill}</strong>
              </div>
              <div className="cs-attribute">
                Picnic Table
                <br />
                <strong>{picnic_table}</strong>
              </div>
              <div className="cs-attribute">
                Electric Hookups
                <br />
                <strong>{electric_hookups}</strong>
              </div>
              <div className="cs-attribute">
                Sewer Hookups
                <br />
                <strong>{sewer_hookups}</strong>
              </div>
            </div>
            <hr className="cs-line" id="attribute-line" />

            <div className="cs-attributes-row">
              <div className="cs-attribute">
                Pets Allowed
                <br />
                <strong>{pets_allowed}</strong>
              </div>
              <div className="cs-attribute">
                Water
                <br />
                <strong>{water}</strong>
              </div>
              <div className="cs-attribute">
                Showers
                <br />
                <strong>{showers}</strong>
              </div>
              <div className="cs-attribute">
                Toilets
                <br />
                <strong>{toilets}</strong>
              </div>
            </div>
            <hr className="cs-line" id="attribute-line" />
            <div className="cs-attributes-row">
              <div className="cs-attribute">
                Site Width
                <br />
                <strong>{site_width}</strong>
              </div>
              <div className="cs-attribute">
                Site Length
                <br />
                <strong>{site_length}</strong>
              </div>
            </div>
          </div>
          <div className="cs-map-container">{campsiteMap}</div>
        </div>
      </div>
    );
  });

  return <div>{mappedCampsite}</div>;
};

function mapStateToProps(state) {
  return { user: state.userReducer.user };
}

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: googleMap.key
  })(withRouter(Campsite))
);
