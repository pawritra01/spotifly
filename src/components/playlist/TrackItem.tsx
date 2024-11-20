import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

interface Props {
  image?: string;
  name: string;
  artists: { id: string; name: string }[];
}
export default function TrackItem({ image, name, artists }: Props) {
  return (
    <Box overflow="hidden">
      <Box display="flex" gap={2}>
        <Box>
          <Typography
            noWrap
            fontSize={13}
            fontWeight={500}
            textOverflow="ellipsis"
          >
            {name}
          </Typography>
          <Box
            sx={{
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
            }}
          >
            {artists.map((artist, index) => (
              <Fragment key={artist.id}>
                {index !== 0 && (
                  <Typography color="textSecondary" sx={{ marginX: 0.5 }}>
                    .
                  </Typography>
                )}
                <Typography
                  to={`/artists/${artist.id}`}
                  component={Link}
                  onClick={(e) => e.stopPropagation()}
                  fontSize={11}
                  noWrap
                  textOverflow="ellipsis"
                  color="textSecondary"
                >
                  {artist.name}
                </Typography>
              </Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
