import React from "react";


// format a number to add commas
function formatNumber(num: string) {
  if(num === null) {
    return 'null';
  }
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Card = ( props: any) => {
  const { total, type, change } = props;
  if(total === null || change === null || type === null) {
    console.log(total, change, type);
    return (
      <div
      style={{
        height: "100px",
        width: "250px",
        border: "1px solid black",
        borderRadius: "10px",
        backgroundColor: "rgb(44,44, 46)",
        color: "rgb(229,229, 234",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        margin: "10px",
        textAlign: "center",
      }}
    >
      <p style={{fontWeight: "bold" , fontSize:'20px'}}>
        {formatNumber(total)} {(type)}
      </p>
      <p style={{fontWeight:'bold'}}>{change} today</p>
    </div>
    )
  }
  return (
    <div
      style={{
        height: "100px",
        width: "250px",
        border: "1px solid black",
        borderRadius: "10px",
        backgroundColor: "rgb(44,44, 46)",
        color: "rgb(229,229, 234",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.75)",
        margin: "10px",
        textAlign: "center",
      }}
    >
      <p style={{fontWeight: "bold" , fontSize:'20px'}}>
        {formatNumber(total)} {(type)}
      </p>
      <p style={{fontWeight:'bold'}}>{formatNumber(change)} today</p>
    </div>
  );
};

export default Card;
