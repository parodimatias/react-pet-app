import React from "react";
import { SearchResultItem } from "components/SearchResultItem";
import { useResults } from "hooks";
import Slider from "react-slick";
export function Item() {
  const results = useResults();
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };
  return (
    <div>
      <Slider {...settings}>
        {results.map((r) => (
          <SearchResultItem
            id={r.id}
            title={r.title}
            price={r.price}
            image={r.thumbnail}
          ></SearchResultItem>
        ))}
      </Slider>
    </div>
  );
}
