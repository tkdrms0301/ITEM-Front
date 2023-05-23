// @mui
import PropTypes from "prop-types";
import { Card, Typography, CardHeader, CardContent, Grid } from "@mui/material";
import { format } from "date-fns";
import {
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@mui/lab";
import { Box, Container } from "@mui/system";

function fDateTime(date, newFormat) {
  const fm = newFormat || "yyyy MMM dd p";

  return date ? format(new Date(date), fm) : "";
}

PointOrderTimeline.propTypes = {
  title: PropTypes.string,
  subheader: PropTypes.string,
  list: PropTypes.array.isRequired,
};

export default function PointOrderTimeline({
  title,
  subheader,
  list,
  ...other
}) {
  return (
    <>
      <CardHeader title={title} subheader={subheader} />

      <CardContent
        sx={{
          "& .MuiTimelineItem-missingOppositeContent:before": {
            display: "none",
          },
        }}
      >
        <Timeline>
          {list.map((item, index) => (
            <OrderItem
              key={item.id}
              item={item}
              isLast={index === list.length - 1}
            />
          ))}
        </Timeline>
      </CardContent>
    </>
  );
}

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  isLast: PropTypes.bool,
  item: PropTypes.shape({
    time: PropTypes.string,
    title: PropTypes.string,
    point: PropTypes.string,
    type: PropTypes.string,
  }),
};

function OrderItem({ item, isLast }) {
  const { type, title, time, point } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          color={
            (type === "order1" && "primary") ||
            (type === "order2" && "success") ||
            (type === "order3" && "info") ||
            (type === "order4" && "warning") ||
            "error"
          }
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>

      <TimelineContent>
        <Grid container>
          <Grid item xs={8} sx={{ display: "flex" }}>
            <Typography variant="subtitle2">{title}</Typography>
          </Grid>

          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            {point}p
          </Typography>
        </Grid>

        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}
