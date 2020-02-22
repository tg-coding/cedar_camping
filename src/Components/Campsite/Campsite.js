import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import axios from "axios";
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

    let styles = {
      margin: "auto",
      width: "500px"
    };

    return (
      <div key={i} className="campsite-container">
        <div className="campsite-primary-info-container">
          <div className="carousel-container" style={styles}>
            <Carousel>
              <div>
                <img src={campsite_primary_img_url} alt={campsite_name} />
                <p className="legend">{campsite_primary_img_credit}</p>
              </div>
              {null ? null : (
                <div>
                  <img src={campsite_img_url} />
                  <p className="legend">{campsite_img_credit}</p>
                </div>
              )}
              {null ? null : (
                <div>
                  <img src={campsite_img_url_2} />
                  <p className="legend">{campsite_img_credit_2}</p>
                </div>
              )}
              {null ? null : (
                <div>
                  <img src={campsite_img_url_3} />
                  <p className="legend">{campsite_img_credit_3}</p>
                </div>
              )}
            </Carousel>
          </div>

          <div className="campsite-primary-info">
            <h5>{park_name}</h5>
            <h2>{campground_name}</h2>
            <div className="campsite-name-type-container">
              <h3># {campsite_name}</h3>
              <h3>Type: {campsite_type}</h3>
            </div>
            <p className="campsite-price">{campsite_price}</p>
            <div className="campsite-inputs">
              <div className="input-container">
                <p className="input-labels">Start Date</p>
                <input
                  className="date-input"
                  value={startDateInput}
                  placeholder="YYYY-MM-DD"
                  type="date"
                  onChange={e => setStartDateInput(e.target.value)}
                />
              </div>
              <div className="input-container">
                <p className="input-labels">Days</p>
                <input
                  className="duration-input"
                  value={durationInput}
                  type="number"
                  onChange={e => setDurationInput(e.target.value)}
                />
              </div>
              <button
                onClick={() =>
                  addToCart(
                    campsite_id,
                    startDateInput,
                    durationInput,
                    campsite_price
                  )
                }
              >
                Add to Cart
              </button>
            </div>
            <div className="attributes-container">
              <div className="attributes-row">
                <div className="coordinate-attribute">
                  Latitude
                  <br />
                  <strong>{campsite_latitude}</strong>
                </div>
                <div className="coordinate-attribute">
                  Longitude
                  <br />
                  <strong>{campsite_longitude}</strong>
                </div>
              </div>
              <div className="attributes-row">
                <div className="attribute">
                  Check-in
                  <br />
                  <strong>{checkin_time}</strong>
                </div>
                <div className="attribute">
                  Check-out
                  <br />
                  <strong>{checkout_time}</strong>
                </div>
                <div className="attribute">
                  Campfire Allowed
                  <br />
                  <strong>{campfire_allowed}</strong>
                </div>
                <div className="attribute">
                  Fire Pit
                  <br />
                  <strong>{fire_pit}</strong>
                </div>
              </div>
              <div className="attributes-row">
                <div className="attribute">
                  Grill
                  <br />
                  <strong>{grill}</strong>
                </div>
                <div className="attribute">
                  Picnic Table
                  <br />
                  <strong>{picnic_table}</strong>
                </div>
                <div className="attribute">
                  Electric Hookups
                  <br />
                  <strong>{electric_hookups}</strong>
                </div>
                <div className="attribute">
                  Sewer Hookups
                  <br />
                  <strong>{sewer_hookups}</strong>
                </div>
              </div>
              <div className="attributes-row">
                <div className="attribute">
                  Pets Allowed
                  <br />
                  <strong>{pets_allowed}</strong>
                </div>
                <div className="attribute">
                  Water
                  <br />
                  <strong>{water}</strong>
                </div>
                <div className="attribute">
                  Showers
                  <br />
                  <strong>{showers}</strong>
                </div>
                <div className="attribute">
                  Toilets
                  <br />
                  <strong>{toilets}</strong>
                </div>
              </div>
              <div className="attributes-row">
                <div className="attribute">
                  Site Width
                  <br />
                  <strong>{site_width}</strong>
                </div>
                <div className="attribute">
                  Site Length
                  <br />
                  <strong>{site_length}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div>{mappedCampsite}</div>;
};

function mapStateToProps(state) {
  return { user: state.userReducer.user };
}

export default connect(mapStateToProps)(withRouter(Campsite));
