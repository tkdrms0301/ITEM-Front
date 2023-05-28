import PropTypes from "prop-types";
import ReactApexChart from "react-apexcharts";
// @mui
import { Box, Card, CardHeader, Typography } from "@mui/material";
// utils
import { useChart } from "./chart";
import { fNumber } from "./utils/formatNumber";

// ----------------------------------------------------------------------

AppConversionRates.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  chartData: PropTypes.array.isRequired,
};

export default function AppConversionRates({
  title,
  subheader,
  chartData,
  ...other
}) {
  const chartLabels = chartData.map((i) => i.label);

  const chartSeries = chartData.map((i) => i.value);

  const chartOptions = useChart({
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => "",
        },
      },
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: "28%", borderRadius: 2 },
    },
    xaxis: {
      categories: chartLabels,
    },
  });

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      {chartData.length !== 0 ? (
        <Box sx={{ px: 3 }} dir="ltr">
          <ReactApexChart
            type="bar"
            series={[{ data: chartSeries }]}
            options={chartOptions}
            height={300}
          />
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pb: 3,
            height: 300,
          }}
        >
          <Typography variant="h5">데이터가 존재하지 않습니다.</Typography>
        </Box>
      )}
    </Card>
  );
}
