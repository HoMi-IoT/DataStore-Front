import React from "react";
import { Input } from "antd";

const FormElement = ({ handleSubmit, value, setName }) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Input
                    type="text"
                    placeholder="Enter Name"
                    value={value}
                    onChange={(e) => setName(e.target.value)}
                    style={{ width: "50%" }}
                    autoFocus
                    required
                /></div>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button className="btn btn-primary mt-1">Submit</button>
                <button className="btn btn-danger mt-1" onClick={() => setName("")}>
                    Cancel
                </button>
            </div>
        </div>
    </form >
);

export default FormElement;