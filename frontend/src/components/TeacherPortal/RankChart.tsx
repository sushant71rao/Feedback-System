import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

import Chart from "react-apexcharts";
import { AuthContext } from "../../context/AuthContext";
import { Teacher } from "../../types/types";
interface props {
  State: any;
  count: number;
  vertical: boolean;
  id: string;
}

const RankCharts = (Props: props) => {
  let { teacher } = React.useContext(AuthContext);
  let Teachers = useQuery<Teacher[]>(["Teachers"], async () => {
    let res = await axios.get(
      import.meta.env.VITE_GET_TEACHERS + `${teacher?.DEPARTMENT}`,
      {
        withCredentials: true,
      }
    );
    // console.log(res);
    return res?.data?.teacher;
  });
  let options: ApexCharts.ApexOptions = {
    xaxis: {
      categories: Props.State?.map((e: any) => {
        return Teachers?.data?.find((el) => {
          return String(el?._id) == Object.keys(e)[0];
        })?.NAME;
      }),
    },
    chart: {
      type: "bar",
      // height: 350,
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
    },
    colors: Props.State?.map((e: any) => {
      return Object.keys(e)[0] == Props?.id ? "#FF9B50" : "#4D2DB7";
    }),

    plotOptions: {
      bar: {
        distributed: true,
        horizontal: !Props.vertical,
        // borderRadius: 2,
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
      data: Props?.State.map((e: any) => {
        return Number(Object.values(e || {})[0]).toFixed(2);
      }),
    },
  ];
  console.log(
    Props.State?.map((e: any) => {
      return Teachers?.data?.find((el) => {
        return String(el?._id) == Object.keys(e)[0];
      })?.NAME;
    })
  );

  return <Chart options={options} series={series} type="bar"></Chart>;
};

export default RankCharts;
