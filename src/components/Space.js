import { useEffect, useState } from "react";
import "./space.css";
import Room from "./Room";

function Space(props) {
  const [spaces, setSpaces] = useState([]);
  const [show, setShow] = useState(null);
  const [detail, setDetail] = useState();

  useEffect(() => {
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
        setSpaces(res);
      });
  },[]);

  useEffect(() => {
    setDetail(getDetail())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show])

  var content;
  if (!spaces || spaces.length === 0) {
    content = (
      <div className="container" id="content">
        <p> No spaces available</p>
      </div>
    );
  } else {
    content = (
      <div className="container" id="content">
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
          {spaces.map((space) => {
            return (
              <div className="col" key={space.id}>
                <div onClick={() => setShow(space)} className="card h-100">
                  <img
                    className="card-img-top imgCardZonas"
                    src={
                      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1774&q=80"
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

  function getDetail(){
      if(show){return(
        <div className="container" id="content">
          <h4>{show.name}</h4>
          <p>Address: {show.address}</p>
          <p>Phone: {show.phone}</p>
          <p>Type: {show.type}</p>
          <p>isActive: {show.isActive}</p>

          <Room id={show.id}/>
        </div>
      );}
  }


  return <div><div>{content}</div><div>{detail}</div></div>;
}

export default Space;
