import React from 'react';
import "./Card.css";

/**
 * Card
 *
 */
const Card = React.forwardRef(
  (
    {
      ...props
    }
  ) => {

    return (
      <div className="card">
          <div className="card-photo" style={{ backgroundImage: `url("${props.vehicle.Image.replace('http','https')}")` }}></div>
          <span className="card-vehicle">{props.vehicle.Make} {props.vehicle.Model}</span>
          <span className="card-version">{props.vehicle.Version}</span>
          <span className="card-price">{props.vehicle.Price}</span>
          <span className="card-year">{`${props.vehicle.YearFab}/${props.vehicle.YearModel}`}</span>

      </div>      
    )
  }
)

export default Card;
