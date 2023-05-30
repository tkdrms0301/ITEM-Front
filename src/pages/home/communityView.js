import PropTypes from "prop-types";
import {
  Box,
  Stack,
  Card,
  Button,
  Divider,
  Typography,
  CardHeader,
  Link,
  alpha,
  useTheme,
} from "@mui/material";
import Iconify from "../../theme/Iconify";
import Scrollbar from "../../component/scrollbar/Scrollbar";
import { useNavigate } from "react-router";
import { format } from "date-fns";
import palette from "../../theme/palette";

// ----------------------------------------------------------------------

CommunityView.propTypes = {
  title: PropTypes.string,
  communityData: PropTypes.array.isRequired,
};

export default function CommunityView({
  title,
  subheader,
  communityData,
  color = "success",
  ...other
}) {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <CardHeader
        title={title}
        sx={{
          py: 2,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(
              theme.palette["success"].darker,
              0
            )} 0%, ${alpha(theme.palette[color].darker, 0.07)} 100%)`,
          bgcolor: (theme) => theme.palette["success"].lighter,
          color: (theme) => theme.palette["success"].contrastText,
        }}
      />
      <Stack>
        {communityData.map((posts) => (
          <PostItem key={posts.postId} posts={posts} />
        ))}
      </Stack>
      <Divider />
      <Box
        sx={{
          p: 2,
          textAlign: "right",
          bgcolor: (theme) => theme.palette["success"].lighter,
          color: (theme) => theme.palette["success"].contrastText,
        }}
      >
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon={"eva:arrow-ios-forward-fill"} />}
          onClick={(e) => navigate(`/community`)}
          sx={{}}
        >
          내 IT기기 묻고 답하기
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

function fDateTime(date, newFormat) {
  const fm = newFormat || "yyyy.MM.dd/HH:mm";

  return date ? format(new Date(date), fm) : "";
}

function PostItem({ posts }) {
  const { postId, title, content, image, date } = posts;

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ borderBottom: `1px solid ${palette.grey[500]}`, py: 1 }}
    >
      {image !== null ? (
        <Box
          component="img"
          alt={title}
          src={image}
          sx={{
            width: 80,
            height: "auto",
            borderRadius: 1.5,
            flexShrink: 0,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        />
      ) : (
        <Box sx={{ width: 15, borderRadius: 1.5, flexShrink: 0 }} />
      )}

      <Box
        sx={{
          minWidth: 50,
          flexGrow: 1,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        <Link
          color="inherit"
          variant="subtitle2"
          underline="hover"
          href={`/community/post/${postId}`}
          sx={{}}
        >
          {title}
        </Link>

        <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
          {content}
        </Typography>
      </Box>

      <Typography
        variant="caption"
        sx={{ pr: 2, flexShrink: 0, color: "text.secondary" }}
      >
        {fDateTime(date)}
      </Typography>
    </Stack>
  );
}
