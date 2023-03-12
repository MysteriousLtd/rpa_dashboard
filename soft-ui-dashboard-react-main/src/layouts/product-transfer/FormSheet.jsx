import React from "react";
import "./main.css";

function Formsheet() {
  return (
    <div className="container-1 rounded">
      <div className="form-header">
        <div className="container">
          <h5>SOURCE</h5>
          <select className="rounded">
            <option value="client 1">Client !</option>
            <option value="client 1">Client !</option>
            <option value="client 1">Client !</option>
          </select>
        </div>
        <div className="container">
        <h5>DESTINATION</h5>
          <select className="rounded">
            <option value="client 1">Client !</option>
            <option value="client 1">Client !</option>
            <option value="client 1">Client !</option>
          </select>
        </div>
      </div>
      <div className="form-body">
        <div className="container">
          <textarea className="rounded"></textarea>
        </div>
        <h4>OR</h4>
      </div>
      <div  className="form-body-2">
        <input className="form-control" type="file" id="formFile"></input>
        <button className="primary-btn">Submit</button>
      </div>
    </div>
  );
}

export default Formsheet;