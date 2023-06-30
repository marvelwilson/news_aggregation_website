import React from 'react'
import {
  MDBCol,
  MDBIcon,
  MDBRipple,
  MDBRow,
} from "mdb-react-ui-kit";
export default function NewsContent(props) {
  return (
    <><MDBCol {...props} lg="4" md="6" className="mb-4 mb-lg-0">
      <div>
        <MDBRipple
          className="bg-image hover-overlay shadow-1-strong ripple rounded-5 mb-4"
          rippleTag="div"
          rippleColor="light"
        >
          <img
            src={props.contents.image ? props.contents.image : "../public/unavailable-image.jpg"}
            className="img-fluid"
          />
          <span>
            <div
              className="mask"
              style={{ backgroundColor: "rgba(251, 251, 251, 0.15)" }}
            ></div>
          </span>
        </MDBRipple>
        <MDBRow className="mb-3">
          <MDBCol col="6">
            <span className="text-default  ">
              <MDBIcon fas icon="plane" />
              {props.contents.from} | {props.contents.source}
            </span>
          </MDBCol>
          <MDBCol col="6" className="text-end">
            <u> {props.contents.publish_date}</u>
          </MDBCol>
        </MDBRow>
        <span className="text-dark">
          <h5>{props.contents.titleContent?.split('://')[0] == 'https' ?
            props.contents.content
            :
            props.contents.titleContent
          }</h5>
          <MDBRow className="mb-3">
            <MDBCol col="6">
              <span className="text-dark">
                <MDBIcon fas icon="plane" />
                <b>Author:</b>
              </span>
            </MDBCol>
            <MDBCol col="6" className="text-end">
              <b> {props.contents.author}</b>
            </MDBCol>
          </MDBRow>
          <p>
            {props.contents.titleContent?.split('://')[0] == 'https' ?
              <a href={props.contents.titleContent}>Read more..</a>
              :
              props.contents.content
            }
          </p>
        </span>
      </div>
    </MDBCol></>
    // <div>{props.contents.content}</div>
  )
}
