import { Box, Grid, InputBase, IconButton } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import ProjectCard from "../../components/ProjectCard";
import { tokens } from "../../theme";
import SortIcon from '@mui/icons-material/Sort';
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getProjects } from "../../store/actions";

const Archived = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [rotate, setRotate] = useState("0");
  const [searchText, setSearchText] = useState("");
  const [sort, setSort] = useState("asc");
  const dispatch = useDispatch();
  const myApp = useSelector(state => state.myApp);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    dispatch(getProjects({
      filter: "archived"
    }))
    setProjects([]);
  }, [])

  const handleSearch = () => {
    dispatch(getProjects({
      filter: "archived",
      sort: sort,
      ...(searchText.length > 0 && { keyword: searchText })
    }))
  }

  const handleRotate = () => {
    if (rotate == "0") {
      setRotate("180");
      setSort("desc")
      dispatch(getProjects({
        filter: "archived",
        sort: "desc",
        ...(searchText.length > 0 && { keyword: searchText })
      }))
    } else {
      setRotate("0");
      setSort("asc");
      dispatch(getProjects({
        filter: "archived",
        sort: "asc",
        ...(searchText.length > 0 && { keyword: searchText })
      }))
    }
  }

  useEffect(() => {
    setProjects(myApp.projects.projectsData)
  }, [myApp.projects.projectsData])


  return (
    <Box m="20px">
      <Header
        title="ARCHIVED"
        subtitle="List of Archived Projects"
      />
      <Box display="flex" justifyContent="space-between">
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
        >
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Box>
          <IconButton type="button" sx={{ p: 1 }} onClick={handleRotate} >
            <SortIcon
              style={{ rotate: `${rotate}deg` }}
            />
          </IconButton>
        </Box>
      </Box>
      <Grid container display="flex" spacing={2} style={{ marginTop: "20px" }}>
        {projects.map((project, idx) => (
          <Grid item xs={9} md={6} lg={4}>
            <ProjectCard
              key={idx}
              id={project._id}
              title={project.projectName}
              description={project.description}
              repo={project.repo}
              live={project.live}
              image={project.image}
              startDate={new Date(project.startDate).toLocaleString()}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Archived;
