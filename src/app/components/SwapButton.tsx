import * as MaterialUI from "@mui/material";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";

interface swapButtonProp {
  onClick: () => void;
}

export default function SwapButton({ onClick }: swapButtonProp) {
  return (
    <MaterialUI.IconButton
      onClick={onClick}
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        "&:hover": {
          backgroundColor: "primary.dark",
          transform: "scale(1.1)",
        },
        transition: "all 0.2s ease",
        width: 48,
        height: 48,
        borderRadius: "50%",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
      aria-label="Swap currencies"
    >
      <SwapHorizIcon />
    </MaterialUI.IconButton>
  );
}
