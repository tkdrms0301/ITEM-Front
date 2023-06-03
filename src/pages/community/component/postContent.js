import { Box, Chip, CircularProgress, Typography } from "@mui/material";
import { DateView } from "./date";

export const PostContent = ({ postId, post }) => {
  if (post === null) {
    return <CircularProgress />;
  }

  const MultiLineTextView = ({ text }) => {
    return (
      <>
        {text.split("\n").map((txt, index) => (
          <Typography variant="body1" key={index}>
            {txt}
            <br key={index} />
          </Typography>
        ))}
      </>
    );
  };

  
  return (

    <Box>
      <Typography variant="h5" style={{ wordWrap: "break-word" }}>
        {post.title}
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mr: "1%", color: "inherit", textDecoration: "none" }}
        >
          {post.memberName} ·
        </Typography>

        <DateView date={post.date} />
      </Box>
      <hr />
      <MultiLineTextView text={post.content}></MultiLineTextView>
      {post.images &&
        post.images.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={"ImageNotFound"}
            style={{
              marginTop: "2%",
              width: "100%",
              height: "auto",
            }}
          />
        ))}
      {post.productName && <Chip label={post.productName} sx={{ mt: "5%" }} />}
    </Box>
  );
};
