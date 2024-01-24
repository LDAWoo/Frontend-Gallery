import { Chart } from "react-chartjs-2";
let width, height, gradient;
function getGradient(ctx, chartArea) {
  const chartWidth = chartArea.right - chartArea.left;
  const chartHeight = chartArea.bottom - chartArea.top;
  if (!gradient || width !== chartWidth || height !== chartHeight) {
    width = chartWidth;
    height = chartHeight;
    gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
    gradient.addColorStop(0, "#4393BE");
    gradient.addColorStop(0.5, "yellow");
    gradient.addColorStop(1, "#CC2168");
  }

  return gradient;
}

const LinerGradientChart = ({ ...props }) => {
  function generateChartData() {
    const DATA_COUNT = 7;
    const NUMBER_CFG = { count: DATA_COUNT, min: -100, max: 100 };

    const labels = ["January", "February", "March", "April", "May", "June", "July"];
    const data = Array.from({ length: DATA_COUNT }, () => Math.random() * (NUMBER_CFG.max - NUMBER_CFG.min) + NUMBER_CFG.min);

    return { labels, data };
  }

  const { labels, data } = generateChartData();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
    tooltips: {
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      titleFontColor: "black",
      bodyFontColor: "black",
      borderColor: "black",
      borderWidth: 1,
    },
  };

  const currentData = {
    labels: labels,
    datasets: [
      {
        label: "Price History",
        data: data,
        borderColor: function (context) {
          if (context) {
            const chart = context.chart;
            const chartArea = chart.chartArea;
            if (!chartArea) {
              return;
            }
            return getGradient(chart.ctx, chartArea);
          }
          return "black";
        },
      },
    ],
  };

  return <Chart type="line" data={currentData} options={options} {...props} style={{ width: "100%", height: "100%" }} />;
};

export default LinerGradientChart;
