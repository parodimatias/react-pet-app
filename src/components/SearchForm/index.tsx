import { any } from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
export function SearchForm() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    const query = e.target.q.value;
    navigate("/search/" + query);
  }
  return (
    <form onSubmit={handleSubmit} id="form">
      <input type="search" id="query" name="q" placeholder="Search..."></input>
      <button type="submit">Buscar</button>
    </form>
  );
}
