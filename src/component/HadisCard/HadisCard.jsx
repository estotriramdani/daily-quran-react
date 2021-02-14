import React from "react";

export const HadisCard = (props) => {
  return (
    <div className="item" style={{ marginBottom: "20px" }}>
      <h2 className="title">
        Sahih Bukhari ◦ No. Hadis {props.data.no} ◦ Kitab {props.data.kitab}
      </h2>
      <div className="arabic">
        <p>{props.data.arab}</p>
      </div>
      <div className="translation">
        <p>
          <span>Terjemah</span>
        </p>
        <p>{props.data.terjemah}</p>
      </div>
    </div>
  );
};

export default HadisCard;
