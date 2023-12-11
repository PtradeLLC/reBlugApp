import React, { useState, useEffect } from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartData {
  series: number[];
  chart: {
    height: number;
    type: "radialBar"; // Adjusted type to be specific
  };
  plotOptions: {
    radialBar: {
      offsetY: number;
      startAngle: number;
      endAngle: number;
      hollow: {
        margin: number;
        size: string;
        background: string;
        image: undefined;
      };
      dataLabels: {
        name: {
          show: boolean;
        };
        value: {
          show: boolean;
        };
      };
    };
  };
  colors: string[];
  labels: string[];
  legend: {
    show: boolean;
    floating: boolean;
    fontSize: string;
    position: string;
    offsetX: number;
    offsetY: number;
    labels: {
      useSeriesColors: boolean;
    };
    markers: {
      size: number;
      show: boolean;
    };
    formatter: (
      seriesName: string,
      opts: {
        w: { globals: { series: { [x: string]: string } } };
        seriesIndex: string | number;
      }
    ) => string;
    itemMargin: {
      vertical: number;
    };
  };
  responsive: {
    breakpoint: number;
    options: {
      legend: {
        show: boolean;
      };
    };
  }[];
  options?: ApexOptions;
}

const CircleChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartData>({
    series: [0, 0, 0, 0],
    chart: {
      height: 390,
      type: "radialBar",
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
          image: undefined,
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: false,
          },
        },
      },
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    labels: ["Delivered", "Engagement", "Facebook", "LinkedIn"],
    legend: {
      show: true,
      floating: true,
      fontSize: "14px",
      position: "right",
      offsetX: 160,
      offsetY: 15,
      labels: {
        useSeriesColors: true,
      },
      markers: {
        size: 0,
        show: true,
      },
      formatter: (seriesName, opts) => {
        return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
      },
      itemMargin: {
        vertical: 3,
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
    options: undefined,
  });

  useEffect(() => {
    const chartElement = document.querySelector("#chart");

    if (chartElement) {
      const chart = new ApexCharts(chartElement, {
        ...chartData,
        options: {
          ...chartData.options,
          chart: {
            ...chartData.options?.chart,
            ...chartData.chart,
          },
          plotOptions: {
            ...chartData.options?.plotOptions,
            ...chartData.plotOptions,
          },
          // Add other options as needed
        },
      });

      chart.render();
    }
  }, [chartData]);

  return (
    <div>
      {/* You can add any additional components or content here */}
      <ApexCharts
        options={{
          chart: chartData.chart,
          plotOptions: chartData.plotOptions,
          colors: chartData.colors,
          labels: chartData.labels,
          legend: chartData.legend as ApexOptions["legend"], // Adjust the type here
          responsive: chartData.responsive,
          // Add other options as needed
        }}
        series={chartData.series}
        type="radialBar"
        height={chartData.chart.height}
      />
    </div>
  );
};

export default CircleChart;
