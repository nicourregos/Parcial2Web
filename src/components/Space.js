import { useEffect, useState } from "react";
import "./styles.css";
import Room from "./Room";

import {FormattedMessage} from "react-intl";

function Space(props) {
  const [spaces, setSpaces] = useState([]);
  const [show, setShow] = useState(null);
  const [detail, setDetail] = useState();

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("spaces") === null) {

      } else {
        let sp = JSON.parse(localStorage.getItem("spaces"));
        setSpaces(sp);
      }
    } else {
      fetch(
        "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json",
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          localStorage.setItem("spaces", JSON.stringify(res));
          setSpaces(res);
        });
    }
  }, []);

  useEffect(() => {
    setDetail(getDetail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  var content;
  if (!spaces || spaces.length === 0) {
    content = (
      <div className="container" id="content">
        <p> <FormattedMessage id="EmptySpaces" /></p>
      </div>
    );
  } else {
    content = (
      <div className="container" id="content">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {spaces.map((space) => {
            return (
              <div className="col" key={space.id}>
                <div
                  onClick={() => setShow(space)}
                  className="card h-100 spaceShdw"
                >
                  <img
                    className="card-img-top imgCards"
                    src={
                      require(space.type.includes("house")
                        ? "../assets/house.jpeg"
                        : "../assets/loft.jpeg").default
                    }
                    alt={space.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{space.name}</h5>
                    <div className="card-text">{space.address}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  function getDetail() {
    if (show) {
      return (
        <div className="container det">
          <h3>{show.name}</h3>
          <p><FormattedMessage id="Address" />: {show.address}</p>
          <p><FormattedMessage id="Phone" />: {show.phone}</p>
          <p><FormattedMessage id="Type" />: {show.type}</p>
          <p><FormattedMessage id="IsActive" />:{"" + show.isActive}</p>
          <h3><FormattedMessage id="TitleRooms" /></h3>
          <Room id={show.id} room={null} key={show.id}/>
          
        </div>
      );
    }
  }

  return (
    <div>
      <div>{content}</div>
      <div>{detail}</div>
    </div>
  );
}

export default Space;
