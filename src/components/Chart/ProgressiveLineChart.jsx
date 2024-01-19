import { Chart } from "react-chartjs-2";
import "chart.js/auto";
const ProgressiveLineChart = ({ data, data2, ...props }) => {
  const totalDuration = 5000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) => (ctx.index === 0 ? ctx.chart.scales.y.getPixelForValue(100) : ctx.chart.getDatasetMeta(ctx.datasetIndex).data[ctx.index - 1].getProps(["y"], true).y);
  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const currentData = {
    datasets: [
      {
        borderColor: "#FF2982",
        borderWidth: 1,
        radius: 0,
        data: data,
      },
      {
        borderColor: "#4393BE",
        borderWidth: 1,
        radius: 0,
        data: data2,
      },
    ],
  };

  const options = {
    animation,
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        type: "linear",
      },
    },
  };

  return <Chart type="line" data={currentData} options={options} {...props} />;
};

export default ProgressiveLineChart;
