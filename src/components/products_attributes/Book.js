import React from "react";

export default function Book(props) {
  let notification = "Please, provide the data of indicated type";
  let notificationElement = (
    <div className="text-danger" role="alert">
      {notification}
    </div>
  );
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
            onChange={props.runHandleChange} //anonymous function
            // onChange={(event) => props.runHandleChange(event.target.value)}
            value={props.getBookValue}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
        <div className="col-sm-6">
          {props.getBookValue === "" && notificationElement}
        </div>
      </div>
      <div>
        <b>Please, provide weight in kg</b>
      </div>
    </div>
  );
}
