import React from "react";

export default function Furniture(props) {
  return (
    <div className="">
      Furniture
      <div className="row">
        <div className="col-xs-1">
          <label htmlFor="height">Height (CM)</label>
        </div>
        <div className="col-xs-5">
          <input
            type="number"
            id="height"
            name="height"
            className="form-control"
            onChange={props.runHandleChange}
            value={props.getFurnitureHeight}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
        <div className="col-xs-6"></div>
      </div>
      <div className="row">
        <div className="col-xs-1">
          <label htmlFor="width">Width (CM)</label>
        </div>
        <div className="col-xs-5">
          <input
            type="number"
            id="width"
            name="width"
            className="form-control"
            onChange={props.runHandleChange}
            value={props.getFurnitureWidth}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
        <div className="col-xs-6"></div>
      </div>
      <div className="row">
        <div className="col-xs-1">
          <label htmlFor="length">Length (CM)</label>
        </div>
        <div className="col-xs-5">
          <input
            type="number"
            id="length"
            name="length"
            className="form-control"
            onChange={props.runHandleChange}
            value={props.getFurnitureLength}
            onInvalid={props.runHandleInvalid}
            onInput={props.runHandleOnInput}
            required
          />
        </div>
        <div className="col-xs-6"></div>
      </div>
      <div>
        <b>Please, provide dimensions in CM</b>
      </div>
    </div>
  );
}