import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { useEffect, useState } from "react";
import useMediaQuery from '@mui/material/useMediaQuery';
import { getStats } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";

const Dashboard = () => {
  const theme = useTheme();
  const lg = useMediaQuery(theme.breakpoints.up('lg'));
  const md = useMediaQuery(theme.breakpoints.up('md'));
  const [span, setSpan] = useState("")
  const [stats, setStats] = useState({inProgress: 0, total: 0, completed: 0, archived: 0});
  const dispatch = useDispatch();
  const myApp = useSelector(state => state.myApp);

  const colors = tokens(theme.palette.mode);
  
  useEffect(() => {
    if (lg) {
      setSpan("span 3")
    } else if (md) {
      setSpan("span 6");
    } else {
      setSpan("span 12")
    }
  }, [lg, md])

  useEffect(() => {
    dispatch(getStats())
  }, [])

  useEffect(() => {
    setStats(myApp.stats)
  }, [myApp.stats])

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to PMS dashboard" />

      </Box>
      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn={span}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.total}
            subtitle="Total Projects"
            progress="0.75"
            increase="+14%"
            icon={
              <ContentCopyOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={span}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.completed}
            subtitle="Completed"
            progress="0.50"
            increase="+21%"
            icon={
              <CheckCircleOutlineOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={span}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.archived}
            subtitle="Archived"
            progress="0.30"
            increase="+5%"
            icon={
              <ArchiveOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn={span}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={stats.inProgress}
            subtitle="In Progress"
            progress="0.80"
            increase="+43%"
            icon={
              <PendingOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
