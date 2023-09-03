import Chart from "react-apexcharts";

import { Vote } from "../../types/types";

interface props {
  State: [Vote] | [any];
  count: number;
}
const LineChart = (Props: props) => {
  let options: ApexCharts.ApexOptions = {
    xaxis: {
      categories: Object.keys(Props.State[0].voteValue),
    },
    stroke: {
      width: [5, 7, 5],
      curve: "straight",
      dashArray: [0, 6, 13],
    },
    colors: [
      "#1f77b4",
      "#2ca02c",
      "#d62728",
      "#9467bd",
      "#e377c2",
      "#7f7f7f",
      "#8c564b",
      "#ff7f0e",
    ],
  };
  let series: ApexAxisChartSeries | ApexNonAxisChartSeries = Props.State.map(
    (e, i) => {
      return {
        name: String(e.info.Session_id),
        data: [
          ...Object.values(e.voteValue).map((e) =>
            Number(
              ((Number(e) * 20) / Number(Props.State[i].info.count)).toFixed(2)
            )
          ),
        ],
      };
    }
  );

  //   console.log(JSON.stringify(series));
  return <Chart type="line" options={options} series={series}></Chart>;
  //   return <>hii</>;
};

export default LineChart;
