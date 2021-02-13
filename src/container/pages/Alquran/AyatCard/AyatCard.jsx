import React from "react";

const AyatCard = (props) => {
  return (
    <div className="item">
      <div className="verse">Ayat {props.data.verseId}</div>
      <div className="arabic">{props.data.ayahText}</div>
      <div className="latin">{props.data.readText}</div>
      <div className="translation">{props.data.indoText}</div>
    </div>
  );
};

export default AyatCard;
