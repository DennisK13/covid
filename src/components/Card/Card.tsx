interface Props {
  total: any;
  type: any;
  change: any;
  today?: boolean;
}
const Card = (props: any) => {
  const { total, type, change, today } = props;
  if (total === null || change === null || type === null) {
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
        <p style={{ fontWeight: "bold", fontSize: "20px" }}>
          {total} {type}
        </p>
        <p style={{ fontWeight: "bold" }}>{change}</p>
      </div>
    );
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
      <p style={{ fontWeight: "bold", fontSize: "20px" }}>
        {total} {type}
      </p>
      <p style={{ fontWeight: "bold" }}>
        {change} {today ? "moving average" : "today"}
      </p>
    </div>
  );
};

export default Card;
