import { Box } from "@mui/material";

interface Props<T> {
  distribution: { width: string; visible: boolean; key: string }[];
  items: T[];
}
export default function Table<T>({ items }: Props<T>) {
  console.log(items);
  return <Box width="100%"></Box>;
}
