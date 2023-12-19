import { ApexOptions } from "apexcharts";
import React from "react";
import ApexChart from "react-apexcharts";

const MixedChart = () => {
  const chartData: ApexOptions = {
    series: [
      {
        name: "Open Rate",
        type: "column",
        data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      },
      {
        name: "Click Rate",
        type: "column",
        data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      },
      {
        name: "Expectations",
        type: "line",
        data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
      },
    ],
    chart: {
      height: 350,
      type: "line", // or 'area', 'bar', etc.
      stacked: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: [1, 1, 4],
    },
    title: {
      text: "", //You can add text here.
      align: "left",
      offsetX: 110,
    },
    xaxis: {
      categories: ["Mon", "Tues", "Weds", "Thurs", "Fri", "Sat", "Sun"],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#008FFB",
        },
        labels: {
          style: {
            colors: "#008FFB",
          },
        },
        title: {
          text: "# of Emails Opened (thousand crores)",
          style: {
            color: "#008FFB",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Click Rate",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#00E396",
        },
        labels: {
          style: {
            colors: "#00E396",
          },
        },
        title: {
          text: "# of Links Clicked (thousand crores)",
          style: {
            color: "#00E396",
          },
        },
      },
      {
        seriesName: "Campaign Expectations",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#FEB019",
        },
        labels: {
          style: {
            colors: "#FEB019",
          },
        },
        title: {
          text: "Campaign Expectations (Goals)",
          style: {
            color: "#FEB019",
          },
        },
      },
    ],
    tooltip: {
      fixed: {
        enabled: true,
        position: "topLeft",
        offsetY: 30,
        offsetX: 60,
      },
    },
    legend: {
      horizontalAlign: "left",
      offsetX: 40,
    },
  };

  return (
    <ApexChart
      options={chartData}
      series={chartData.series}
      type="line"
      height={350}
    />
  );
};

export default MixedChart;
