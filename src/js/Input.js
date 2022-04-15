import React from "react";

export default function Input({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Type a city" />
      <input type="submit" value="Submit" />
    </form>
  );
}
