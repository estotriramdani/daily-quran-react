import React from "react";
const PrayerTime = (props) => {
  return (
    <div className="item">
      <h3>{props.waktu}</h3>
      <p>{props.jam ? props.jam : "..."}</p>
    </div>
  );
};

export default PrayerTime;
