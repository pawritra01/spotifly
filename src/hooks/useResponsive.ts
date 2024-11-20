import { useMediaQuery } from "@mui/material";

export default function useResponsive() {
  const isMobile = useMediaQuery(`(min-width:480px)`);
  const isTablet = useMediaQuery(`(min-width: 600px)`);
  const isDesktop = useMediaQuery(`(min-width:768px)`);
  const isMaxDesktop = useMediaQuery(`(max-width:768px)`);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMaxDesktop,
  };
}
