import React from "react";
import { useState } from "react";

function IMGdata() {
  const data = {
    UserID: 1,
    UserName: "Mark Zuckerberg",
    UserImg:
      "https://upload.wikimedia.org/wikipedia/commons/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg",
    OceanImg:
      "https://i2.pickpik.com/photos/35/791/724/beach-man-ocean-outdoors-preview.jpg",
    Caption: "Here enjoying at the Beach",
    Description: {
      Temperature: "59.0",
      Date: "Feb-03-2023",
      Time: "03:14:07",
      AidNeeded: false,
      longitutde: "-14.334",
      latitude: "34.334",
      Weather: "A Few Clouds",
      WindMPH: "4.6",
      WindDir: "West",
      RelativeHumidity: "41",
      VisibilityMiles: "10.00",
      AirQualityIndex: "66",
    },
  };

  const [display, setdisplay] = useState(false);
  const show = () => {
    setdisplay(!display);
  };
  let { Temperature, Date, Time, Weather } = data.Description;
  Temperature = Temperature += "°F";
  const descriptionEntries = Object.entries({
    Temperature,
    Date,
    Time,
    Weather,
  });

  return (
    <>
      <div className="Element">
        <div className="DataBox">
          <div className="DataImg">
            <img
              alt={`Oceanp for User ${data.UserID}`}
              src={data.OceanImg}
              className="OceanImg"
            />
            <img
              alt={`Userp for User ${data.UserID}`}
              src={data.UserImg}
              className="UserImg"
              style={{
                border: data.Description.AidNeeded
                  ? "0.4em solid #F8770E"
                  : "0.4em solid #37ff77",
              }}
            />
            <p className="UserName">{data.UserName}</p>
          </div>
        </div>
        <div className="ShowMore">
          <button className="ShowMoreButton" onClick={show}>
            See More
          </button>
          {display && (
            <>
              <div className="UserInfo">
                <ul className="listEntries">
                  {descriptionEntries.map(([key, value]) => (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default IMGdata;
