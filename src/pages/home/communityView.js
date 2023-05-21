import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Link,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
} from "@mui/material";
import Iconify from "../../theme/Iconify";
import Scrollbar from "../../component/scrollbar/Scrollbar";
import { useNavigate } from "react-router";

// ----------------------------------------------------------------------

CommunityView.propTypes = {
  title: PropTypes.string,
  communityData: PropTypes.array.isRequired,
};

export default function CommunityView({
  title,
  subheader,
  communityData,
  ...other
}) {
  const navigate = useNavigate();

  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {communityData.map((posts) => (
            <PostItem key={posts.postId} posts={posts} />
          ))}
        </Stack>
      </Scrollbar>
      <Divider />

      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
          onClick={(e) => navigate(`/community`)}
        >
          View all
        </Button>
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

PostItem.propTypes = {
  posts: PropTypes.shape({
    postId: PropTypes.number,
    title: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    date: PropTypes.string,
  }),
};

function PostItem({ posts }) {
  const { postId, title, content, image, date } = posts;

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Box
        component="img"
        alt={title}
        src={image}
        sx={{ width: 48, height: 48, borderRadius: 1.5, flexShrink: 0 }}
      />

      <Box sx={{ minWidth: 140, flexGrow: 1 }}>
        <Link color="inherit" variant="subtitle2" underline="hover" noWrap>
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {content}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 3, flexShrink: 0, color: "text.secondary" }}
      >
        {date}
      </Typography>
    </Stack>
  );
}
