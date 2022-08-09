import React from "react";

export default function DVD(props) {
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
        <div className="col-sm-6"></div>
      </div>
      <div>
        <b>Please, provide size in MB</b>
      </div>
    </div>
  );
}
