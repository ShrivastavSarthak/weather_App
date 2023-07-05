import React, { Fragment, useEffect, useState } from "react";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import Fab from "@mui/material/Fab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import Switch from "@mui/material/Switch";

const HomePage = () => {
  const [click, setClick] = useState(false);
  const [isSearch, setIsSearch] = useState("Delhi");
  const [city, setCity] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);

  const handleTEmp = () => {
    setIsCelsius(!isCelsius);
  };
  const handleSearch = (e) => {
    setIsSearch(e.target.value);
  };

  const handleClick = () => {
    setClick(!click);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${isSearch}&appid=eb4435f7530c942b4693e9d9c57c057a&units=metric`;
      const response = await fetch(url);
      const resJson = await response.json();
      // console.log(resJson.main);
      setCity(resJson.main);
    };
    fetchApi();
  }, [isSearch]);

  const { x } = useSpring({
    from: { x: 0 },
    x: click ? 0 : 1,
    config: { duration: 1000 }
  });

  return (
    <Fragment>
      <center>
        <h1 className="pt-4 mb-4 fw-bold">
          Welcome the the <span className="fw-bolder">Atmósfera</span>{" "}
        </h1>
        {
          <h3>
            Today's weather in <span className="fw-bold">{isSearch}</span>{" "}
          </h3>
        }
        <Fab variant="extended" className="my-4">
          <animated.div
            style={{
              opacity: x.to({ range: [0, 1], output: [0.3, 1] }),
              scale: x.to({
                range: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 0.75, 1],
                output: [1, 0.97, 0.9, 1.1, 0.9, 1.1, 1.03, 1]
              })
            }}
          >
            {click ? (
              <Box>
                <Collapse in={click} collapsedSize={0}></Collapse>
                <TextField
                  fullWidth
                  id="standard-basic"
                  label="Search "
                  variant="standard"
                  value={isSearch}
                  onChange={handleSearch}
                />
              </Box>
            ) : (
              <h6 onClick={handleClick} className="mt-2">
                Navigate
              </h6>
            )}
          </animated.div>
          <LocationSearchingIcon sx={{ ml: 1 }} />
        </Fab>
        <div className="container">
          {!city ? (
            <p>No data found</p>
          ) : (
            <div className="row">
              <div className="col">
                <div
                  className="card my-3 shadow p-3 mb-5 bg-body rounded"
                  style={{ width: "18rem" }}
                >
                  <h4 className="my-2">Pressure {city.pressure} atm</h4>
                  <iframe
                    src="https://giphy.com/embed/1hDNuASOEeuWhNcI5V"
                    className="pb-4"
                  />
                </div>
              </div>
              <div className="col">
                <div
                  className="card my-3 shadow p-3 mb-5 bg-body rounded"
                  style={{ width: "18rem" }}
                >
                  {!isCelsius ? (
                    <h4 className="m-2">Feels like {city.feels_like}°c</h4>
                  ) : (
                    <h4 className="my-2">
                      Feels like {city.feels_like * 1.8 + 32}°f
                    </h4>
                  )}

                  <Switch size="small" onClick={handleTEmp} />
                  {city.feels_like > 30 ? (
                    <iframe src="https://giphy.com/embed/MdkW7kosS2c0QJzlni" />
                  ) : (
                    <iframe src="https://giphy.com/embed/frXABWc6kaZx3iDS6u" />
                  )}
                </div>
              </div>
              <div className="col">
                <div
                  className="card my-3 shadow p-3 mb-5 bg-body rounded"
                  style={{ width: "18rem" }}
                >
                  <h4 className="my-2">Humidity {city.humidity}%</h4>
                  <iframe
                    src="https://giphy.com/embed/3ofSBgnAOEBq7JuRSo"
                    className="pb-4"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="text-center p-4 bottom">
          developed by:
          <a
            className="text-reset fw-bold "
            href="https://www.linkedin.com/in/sarthak-kumar-1bbb1921a/"
          >
            Sarthak Kumar
          </a>
        </div>
      </center>
    </Fragment>
  );
};

export default HomePage;
