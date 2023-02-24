import React from "react";
import TextField from "../Inputs/TextField";

const FormInputs = () => {
  return (
    <div className="my-4 flex flex-col space-y-6">
      <div className="flex space-x-6">
        <TextField id="name" name="name" placeholder="Name" type="text" />
        <TextField
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          type="text"
        />
      </div>

      <div className="flex space-x-6">
        <TextField id="email" name="email" placeholder="Email" type="email" />
        <TextField id="phone" name="phone" placeholder="Phone" type="text" />
      </div>

      <TextField
        id="address"
        name="address"
        placeholder="Address"
        type="textarea"
        component="textarea"
      />
    </div>
  );
};

export default FormInputs;
