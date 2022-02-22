import { any } from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
type SearchResultItem = {
  id: string;
  image: string;
  title: string;
  price: number;
};
export function SearchResultItem(props: SearchResultItem) {
  return (
    <div style={{ display: "flex", height: "200px" }}>
      <div>
        <img style={{ height: "100%", width: "200px" }} src={props.image}></img>
      </div>
      <div>
        <Link to={"/item/" + props.id}>
          <div>{props.title}</div>
        </Link>
        <div>{props.price}</div>
      </div>
    </div>
  );
}
