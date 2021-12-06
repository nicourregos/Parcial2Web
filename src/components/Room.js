import { useEffect, useState } from "react";
import "./styles.css";
import Chart from "./Chart";
import { FormattedMessage } from "react-intl";

function Room(props) {
  const [rooms, setRooms] = useState([]);
  const [show, setShow] = useState(props.room);

  useEffect(() => {
    if (!navigator.onLine) {
      if (localStorage.getItem("rooms") === null) {
      } else {
        let rm = JSON.parse(localStorage.getItem("rooms"));
        setRooms(rm);
      }
    } else {
      fetch(
        "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json",
        {
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          localStorage.setItem("rooms", JSON.stringify(res));
          setRooms(res);
        });
    }
  }, []);

  var content;
  if (!rooms || rooms.length === 0) {
    content = (
      <div className="container" id="content">
        <p>
          {" "}
          <FormattedMessage id="EmptyRooms" />
        </p>
      </div>
    );
  } else {
    content = (
      <div>
        <div className="row">
          <div className="col-12 col-md-6 col-lg-7">
            <div className="row row-cols-3 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-2">
              {rooms.map((room) => {
                // eslint-disable-next-line array-callback-return
                if (props.id !== room.homeId) return;
                return (
                  <div className="col" key={room.homeId + room.name}>
                    <div onClick={() => setShow(room)} className="card h-100">
                      <div className="card-body">
                        <h5 className="card-title">{room.name}</h5>
                        <div className="card-text">{room.address}</div>
                      </div>
                      <img
                        className="card-img-top imgCardRoom"
                        src={
                          require(room.type.includes("kitcken")
                            ? "../assets/kitchen.jpeg"
                            : "../assets/room.jpeg").default
                        }
                        alt={room.name}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5">{getDetail()}</div>
        </div>
        <div className="marTop">
          <Chart
            data={rooms.filter((room) => room.homeId === props.id)}
            key={props.id}
          />
        </div>
      </div>
    );
  }

  function getDetail() {
    if (show) {
      return (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ID</th>
              <th scope="col">
                <FormattedMessage id="Device" />
              </th>
              <th scope="col">
                <FormattedMessage id="Value" />
              </th>
            </tr>
          </thead>
          <tbody>
            {show.devices.map((device, i) => {
              return (
                <tr key={device.id + "" + device.desired.value}>
                  <th scope="row">{i+1}</th>
                  <td>{device.id}</td>
                  <td>{device.name}</td>
                  <td>{"" + device.desired.value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  }

  return (
    <div>
      <div>{content}</div>
    </div>
  );
}

export default Room;
