import React from "react";
import Notification from "../Notification";

export default function Book(props) {
  return (
    <div className="">
      <div className="row">
        <div className="col-sm-1">
          <label htmlFor="weight">Weight (KG)</label>
        </div>
        <div className="col-sm-5">
          <input
            type="number"
            id="weight"
            name="weight"
            className="form-control"
            onChange={props.runHandleChange}
            value={props.getBookValue}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
        <div className="col-sm-6">
          {props.getBookValue === "" && (
            <Notification message="Please, provide the data of indicated type" />
          )}
        </div>
      </div>
      <div>
        <b>Please, provide weight in kg</b>
      </div>
    </div>
  );
}
