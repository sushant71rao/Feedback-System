import Chart from "react-apexcharts";
import { Vote } from "../../types/types";

interface props {
  State: Vote[] | [];
  Marks: { [key: string]: Number };
  count: number;
}

const PieChart = (Props: props) => {
  console.log(Props);

  let options: ApexCharts.ApexOptions = {
    stroke: {
      show: false,
    },
    labels:
      Props?.State?.length != 0
        ? Props.State.map((e) => {
            return String(e.info.Session_id);
          })
        : Object.keys(Props?.Marks || []),
    colors: [
      "#FFBB5C",
      "#9D44C0",
      "#94A684",
      "#9A3B3B",
      "#7091F5",
      "#FF6969",
      "#352F44",
      "#A2678A",
      "#69d2e7",
    ],
    legend: {
      show: true,
      showForSingleSeries: true,
      showForNullSeries: true,
      showForZeroSeries: true,
      position: "bottom",
      horizontalAlign: "center",
      floating: false,
      fontSize: "14px",
      // fontFamily: "Trebuchet MS",

      fontWeight: 500,
      formatter: undefined,
      inverseOrder: false,
      width: undefined,
      height: undefined,
      tooltipHoverFormatter: undefined,
      customLegendItems: [],
      offsetX: 0,
      offsetY: 0,
      labels: {
        colors: ["#00000"],
      },
      markers: {
        // width: 14,
        // height: 14,
        strokeWidth: 0,
        fillColors: undefined,
        radius: 16,
        customHTML: undefined,
        onClick: undefined,
        offsetX: 0,

        offsetY: 0,
      },
      onItemClick: {
        toggleDataSeries: true,
      },
      onItemHover: {
        highlightDataSeries: true,
      },
    },
  };
  let series: ApexAxisChartSeries | ApexNonAxisChartSeries =
    Props?.State?.length != 0
      ? Props.State.map((e) => {
          return Number(((e.info.Avg * 100) / 40).toFixed(2));
        })
      : Object.values(Props?.Marks || []).map((e) => {
          return (Number(e) * 20) / Props.count;
        });

  return <Chart options={options} series={series} type="pie"></Chart>;
};

export default PieChart;
