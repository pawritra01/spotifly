import { Card, CardContent, CardMedia, Typography } from "@mui/material";
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
  rounded?: boolean;
}
export default function ItemCard({
  name,
  image,
  description,
  to,
  rounded,
}: Props) {
  const classes = useStyles();

  console.log(to);
  return (
    <Card component={to ? Link : "div"} className={classes.root} to={to}>
      <CardMedia
        sx={{
          width: rounded ? "90%" : "100%",
          aspectRatio: "1",
          borderRadius: rounded ? "100%" : 0,
          margin: rounded ? "8px auto" : 0,
        }}
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
