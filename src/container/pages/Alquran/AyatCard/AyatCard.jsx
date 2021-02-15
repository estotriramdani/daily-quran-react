import React from "react";
let style = { fontSize: `22px`, lineHeight: `50px`, marginBottom: "20px" };
const AyatCard = (props) => {
  return (
    <div className="item">
      <div className="verse">Ayat {props.data.aya_number}</div>
      <div className="arabic" style={style}>
        {props.data.aya_text
          ? props.data.aya_text
          : "Hasil pencarian akan tampil di sini"}
      </div>
      {/* <div className="latin">{props.data.readText}</div> */}
      <div className="translation">{props.data.translation_aya_text}</div>
    </div>
  );
};

export default AyatCard;
