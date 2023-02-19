import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const logoutUser = () => {
    localStorage.removeItem("@token");
    localStorage.removeItem("authUser");
    window.location.reload();
  }

  return (
    <Box display="flex" justifyContent="end" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton onClick={logoutUser}>
          <PowerSettingsNewRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
