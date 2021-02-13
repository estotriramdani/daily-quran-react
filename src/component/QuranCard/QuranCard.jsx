import React from "react";

export const QuranCard = (props) => {
  return (
    <span>
      <div className="item" onClick={() => props.goDetail(props.data.id)}>
        <p className="arabic">
          {props.data.id} {props.data.surat_name}
        </p>
        <p className="translation">{props.data.surat_terjemah}</p>
      </div>
    </span>
  );
};

export default QuranCard;
