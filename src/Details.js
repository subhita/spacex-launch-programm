import React, { useState, useEffect } from "react";
import axios from "axios";

function Details() {
  const [data, setData] = useState([]);
  const [years, setYears] = useState([]);
  const [launch, setLaunch] = useState([]);
  const [active, setActive] = useState(null);
  const [activeA, setActiveA] = useState(null);

  const getSpacexData = async () => {
    const result = await axios(
      `https://api.spaceXdata.com/v3/launches?limit=100`
    );
    let years = [...new Set(result.data.map((item) => item.launch_year))];
    let launch = [...new Set(result.data.map((item) => item.launch_success))];
    setYears(years);
    setData(result.data);
    setLaunch(launch);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    getSpacexData();
  }, []);

  const sortByYear = async (item) => {
    const result = await axios(
      `https://api.spaceXdata.com/v3/launches?limit=100&launch_year=${item}`
    );
    setData(result.data);
    setActive(item);
  };

  const sortBySucess = async (item) => {
    const result = await axios(
      `https://api.spaceXdata.com/v3/launches?limit=100&launch_success=${item}`
    );
    setData(result.data);
    setActiveA(item);
  };

  return (
    <div className="results details">
      <form onSubmit={handleSubmit}>
        <div className="left-section">
          <h3>Filters</h3>
          <div>
            <span className="year-filter">Launch Year</span>
            <hr style={{ width: "55%" }} />
            {years.map((item) => (
              <span
                className={active === item ? "active" : "launch-filter"}
                onClick={() => sortByYear(item)}
              >
                {" "}
                {item}
              </span>
            ))}
            <span className="year-filter">Successful Launch</span>
            <hr style={{ width: "55%" }} />
            {launch.map((item) => (
              <span
                className={
                  item === null
                    ? null
                    : activeA === item
                    ? "active"
                    : "launch-filter"
                }
                onClick={() => sortBySucess(item)}
              >
                {" "}
                {item ? "True" : item === null ? null : "False"}
              </span>
            ))}
          </div>
        </div>
      </form>
      <ul>
        {data.map((item) => (
          <li key={item}>
            <div className="main-heading">
              <div className="img-section">
                <img alt="img" src={item.links.mission_patch} />
              </div>
              <div className="top-main">
                <h2 className="name-heading">{item.mission_name}</h2>
              </div>
              <div className="bottom-main">
                <div className="left-main">
                  <span className="">Mission Id:</span>
                  <span> {item.mission_id}</span>
                </div>
                <hr />
                <div className="left-main">
                  <span>Launch Year:</span>
                  <span> {item.launch_year}</span>
                </div>
                <hr />
                <div className="left-main">
                  <span>Sucessful Launch:</span>
                  <span>
                    {" "}
                    {item.launch_success ? "true" : "false"}
                  </span>
                </div>
                <hr />
                <div className="left-main">
                  <span>Sucessful Landing:</span>
                  <span className="origin">
                    {" "}
                    {item.rocket.first_stage.cores.map((val) =>
                      val.land_success ? "true" : "false"
                    )}
                  </span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Details;
