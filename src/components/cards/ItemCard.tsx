import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: "180px",
    backgroundColor: "rgba(255,255,255,0.01)",
    padding: 2,
    "& :hover": {
      backgroundColor: "rgba(255,255,255,0.02)",
    },
  },
}));

interface Props {
  to?: string;
  image: string;
  name: string;
  description: string;
}
export default function ItemCard({ name, image, description, to }: Props) {
  const classes = useStyles();

  console.log(to);
  return (
    <Card component={to ? Link : "div"} className={classes.root} to={to}>
      <CardMedia
        sx={{ width: "100%", aspectRatio: "1" }}
        image={image}
        title={name}
      />
      <CardContent>
        <Typography noWrap textOverflow="ellipsis" variant="subtitle2">
          {name}
        </Typography>
        {description && <Typography>{description}</Typography>}
      </CardContent>
    </Card>
  );
}
