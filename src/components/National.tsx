import Card from "./Card/Card";


export const National = ({ data }: any) => {
  let canada = data.filter((item: any) => item.name === "Canada");
  return (
    <>
      {canada.map((item: any, i:number) => (
        <div key={i}>
          <div>
            <h5>Date Updated: {item.date}</h5>
          </div>
          <div className="row center">
            <Card total={item.totalCases} type={"cases"} change={item.cases} />
            <Card
              total={item.totalDeaths}
              type={"deaths"}
              change={item.deaths}
            />
            <Card
              total={item.totaltested}
              type={"tested"}
              change={item.tested}
            />
          </div>
        </div>
      ))}
    </>
  );
};
