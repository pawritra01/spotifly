"use client";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import {
  Avatar,
  Box,
  List,
  ListItemButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const { items } = useAppSelector((state) => state.user.playlists);
  const matches = useMediaQuery("(min-width:768px)");

  const [expanded, setExpanded] = useState(true);

  const shouldShowSidebar = expanded && matches;

  return (
    <Box
      width={shouldShowSidebar ? 300 : "auto"}
      bgcolor="ActiveBorder"
      display="inline-block"
      color="whitesmoke"
      paddingBottom={16}
    >
      <ListItemButton
        sx={{
          gap: 2,
          paddingY: 3,
          justifyContent: shouldShowSidebar ? "flex-start" : "center",
        }}
        onClick={() => setExpanded((prev) => !prev)}
      >
        <FolderCopyIcon fontSize="medium" />
        {shouldShowSidebar && (
          <Typography variant="body1" fontWeight={600}>
            Your Library
          </Typography>
        )}
      </ListItemButton>
      <List
        disablePadding
        sx={{
          maxHeight: "calc(100% - 24px)",
          overflow: "hidden auto",
        }}
      >
        {items.map(({ name, images, id, type }) => (
          <Link to={`/${type}s/${id}`} key={id}>
            <ListItemButton key={id}>
              {shouldShowSidebar ? (
                <ListItem name={name} />
              ) : (
                <Avatar
                  variant="rounded"
                  src={images[images.length - 1].url}
                  sx={{ padding: 0 }}
                  alt={name}
                />
              )}
            </ListItemButton>
          </Link>
        ))}
      </List>
    </Box>
  );
}

function ListItem({ name }: { name: string }) {
  return (
    <Typography
      maxWidth="75%"
      variant="body1"
      fontWeight={600}
      sx={{
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",
      }}
    >
      {name}

      <Typography
        component="span"
        color="textSecondary"
        sx={{
          fontSize: 12,
          maxWidth: "25%",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          overflow: "hidden",
          marginLeft: 0.5,
        }}
      >
        . Playlist
      </Typography>
    </Typography>
  );
}
