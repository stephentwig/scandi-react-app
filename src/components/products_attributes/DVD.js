import React from "react";

export default function DVD(props) {
  let notification = "Please, provide the data of indicated type";
  let notificationElement = (
    <div className="text-danger" role="alert">
      {notification}
    </div>
  );

  return (
    <div className="">
      DVD
      <div className="row">
        <div className="col-sm-1">
          <label htmlFor="size">Size (MB)</label>
        </div>
        <div className="col-sm-5">
          <input
            type="number"
            id="size"
            name="size"
            className="form-control"
            onChange={props.runHandleChange}
            value={props.getDVDValue}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
        <div className="col-sm-6">
          {props.getDVDValue === "" && notificationElement}
        </div>
      </div>
      <div>
        <b>Please, provide size in MB</b>
      </div>
    </div>
  );
}
