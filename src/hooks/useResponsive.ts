import { useMediaQuery } from "@mui/material";

export default function useResponsive() {
  const isMobile = useMediaQuery(`(min-width:480px)`);
  const isTablet = useMediaQuery(`(min-width: 600px)`);
  const isUpDesktop = useMediaQuery(`(min-width:768px)`);
  const isDownDesktop = useMediaQuery(`(max-width:768px)`);

  return {
    isMobile,
    isTablet,
    isUpDesktop,
    isDownDesktop,
  };
}
