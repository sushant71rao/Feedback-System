
import Chart from "react-apexcharts";
interface props {
  State: any;
  count: number;
  vertical: boolean;
}

const Apex = (Props: props) => {
  let options: ApexCharts.ApexOptions = {
    xaxis: {
      categories: Object.keys(Props.State || {}),
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: [
      "#1f77b4", // Blue
      "#ff7f0e", // Orange
      "#2ca02c", // Green
      "#d62728", // Red
      "#9467bd", // Purple
      "#8c564b", // Brown
      "#e377c2", // Pink
      "#7f7f7f", // Gray
    ],

    plotOptions: {
      bar: {
        distributed: true,
        horizontal: !Props.vertical,
        borderRadius: 2,
      },
    },
    responsive: [
      {
        breakpoint: 900,
        options: {
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
        },
      },
    ],
  };
  let series: ApexAxisChartSeries | ApexNonAxisChartSeries = [
    {
      data: Object.values(Props.State || {}).map((e) => {
        return Number(((Number(e) * 100) / (Props.count * 5)).toFixed(2));
      }),
    },
  ];

  return <Chart options={options} series={series} type="bar"></Chart>;
};

export default Apex;
