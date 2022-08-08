import React from "react";

export default function Book(props) {
  return (
    <div className="">
      Book
      <div className="row">
        <div className="col-xs-1">
          <label htmlFor="weight">Weight (KG)</label>
        </div>
        <div className="col-xs-5">
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
        <div className="col-xs-6"></div>
      </div>
      <div>
        <b>Please, provide weight in kg</b>
      </div>
    </div>
  );
}
