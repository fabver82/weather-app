import React from "react";
import styled from "styled-components";

export default function Input({ setCity }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    setCity(event.target[0].value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Type a city" />
      <input type="submit" value="Search" />
    </form>
  );
}
