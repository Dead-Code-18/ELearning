import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import NavTop from "./NavTop";

const CourseBuyForm = (props) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardOwner, setCardOwner] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  console.log(props);

  const buyCourse = (props) => {
    if (props.auth.isAuthenticated === true) {
      axios
        .get("http://localhost:3000/course/buy", {
          params: {
            userID: props.auth.user.id,
            courseID: props.location.state.courseID,
          },
        })
        .then((res) => {});
    }
  };

  return (
    <div className="container">
      <NavTop />
      <div className="jumbotron">
        <div className="col-lg-8 mx-auto text-center">
          <h1 className="display-4 mb-5">Payment</h1>
        </div>
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card ">
              <div className="card-header">
                <div className="tab-content">
                  <div
                    id="credit-card"
                    className="tab-pane fade show active pt-3"
                  >
                    <form role="form">
                      <div className="form-group">
                        <label htmlFor="username">
                          <h6>Card Owner</h6>
                        </label>
                        <input
                          type="text"
                          value={cardOwner}
                          onChange={(e) => setCardOwner(e.target.value)}
                          name="username"
                          placeholder="Card Owner Name"
                          required
                          className="form-control "
                        ></input>
                      </div>
                      <div className="form-group">
                        <label htmlFor="cardNumber">
                          <h6>Card number</h6>
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            name="cardNumber"
                            placeholder="Valid card number"
                            className="form-control "
                            required
                          ></input>
                          <div className="input-group-append">
                            <span className="input-group-text text-muted">
                              <i className="fab fa-cc-visa mx-1"></i>
                              <i className="fab fa-cc-mastercard mx-1"></i>
                              <i className="fab fa-cc-amex mx-1"></i>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-8">
                          <div className="form-group">
                            <label>
                              <span className="hidden-xs">
                                <h6>Expiration Date</h6>
                              </span>
                            </label>
                            <div className="input-group">
                              <input
                                type="number"
                                placeholder="MM"
                                name=""
                                value={month}
                                onChange={(e) => setMonth(e.target.value)}
                                className="form-control"
                                required
                              ></input>
                              <input
                                type="number"
                                placeholder="YY"
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                name=""
                                className="form-control"
                                required
                              ></input>
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-4">
                          <div className="form-group mb-4">
                            <label
                              data-toggle="tooltip"
                              title="Three digit CV code on the back of your card"
                            >
                              <h6>
                                CVV
                                <i className="fa fa-question-circle d-inline"></i>
                              </h6>
                            </label>
                            <input
                              type="text"
                              required
                              className="form-control"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                            ></input>
                          </div>
                        </div>
                      </div>
                      <div className="card-footer">
                        <Link to="/course/list">
                          <button
                            type="button"
                            className="subscribe btn btn-primary btn-block shadow-sm"
                            onClick={() => {
                              buyCourse(props);
                            }}
                          >
                            Confirm Payment
                          </button>
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CourseBuyForm);
