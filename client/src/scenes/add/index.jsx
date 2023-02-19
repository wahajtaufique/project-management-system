import { Box, Button, TextField, Select, Chip, MenuItem, Alert } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addProject, resetProjectStates } from "../../store/actions";

const names = [
  'JavaScript',
  'PHP',
  'Python',
  'MongoDB',
  'MySQL',
  'Laravel',
  'Express',
  'NodeJS',
  'React'
];

const AddProject = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [tags, setTags] = useState(["Tags: "]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const myApp = useSelector(state => state.myApp);

  const handleFormSubmit = (values) => {
    let tagsArr = tags;
    tagsArr.shift();
    values['tags'] = tagsArr;
    dispatch(addProject(values))
  };

  const handleChangeTags = (event) => {
    const {
      target: { value },
    } = event;
    setTags(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  useEffect(() => {
    if (myApp.projects?.error) {
      setError(myApp.projects.error);
      setSuccess("");
      setTimeout(() => {
        setError("");
        dispatch(resetProjectStates())

      }, 3000);
    }
    if (myApp.projects?.success) {
      setSuccess(myApp.projects.success);
      setError("");
      setTimeout(() => {
        setSuccess("");
        dispatch(resetProjectStates())
      }, 3000)
    }
  }, [myApp.projects])

  return (
    <Box m="20px">
      <Header title="ADD PROJECT" subtitle="Add a New Project" />
      {success && (
        <Alert variant="outlined" severity="success" style={{marginBottom: '20px'}}>{success}</Alert>
      )}
      {error && (
        <Alert variant="outlined" severity="error" style={{marginBottom: '20px'}}>{error}</Alert>
      )}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Project Name*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.projectName}
                name="projectName"
                error={!!touched.projectName && !!errors.projectName}
                helperText={touched.projectName && errors.projectName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Description*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                name="description"
                error={!!touched.description && !!errors.description}
                helperText={touched.description && errors.description}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Start Date*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.startDate}
                name="startDate"
                error={!!touched.startDate && !!errors.startDate}
                helperText={touched.startDate && errors.startDate}
                sx={{ gridColumn: "span 1" }}
              />

              <TextField
                variant="filled"
                type="text"
                label="Image Link*"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.image}
                name="image"
                error={!!touched.image && !!errors.image}
                helperText={touched.image && errors.image}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Github Repo"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.repo}
                name="repo"
                error={!!touched.repo && !!errors.repo}
                helperText={touched.repo && errors.repo}
                sx={{ gridColumn: "span 1" }}
              />
              <TextField
                variant="filled"
                type="text"
                label="Live URL"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.live}
                name="live"
                error={!!touched.live && !!errors.live}
                helperText={touched.live && errors.live}
                sx={{ gridColumn: "span 1" }}
              />
              <Select
                variant="filled"
                error={!!touched.tags && !!errors.tags}
                helperText={touched.tags && errors.tags}
                multiple
                sx={{ gridColumn: "span 4" }}
                value={tags}
                name="tags"
                onBlur={handleBlur}
                onChange={handleChangeTags}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, paddingBottom: '20px' }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Box>
                <Button
                  type="submit" color="secondary" variant="contained"
                  sx={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "bold",
                    padding: "10px 20px",
                  }}
                >
                  Add Project
                  <DownloadOutlinedIcon sx={{ ml: "10px" }} />
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const date = /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/;

const checkoutSchema = yup.object().shape({
  projectName: yup.string().required("required"),
  description: yup.string().required("required"),
  live: yup.string(),
  repo: yup.string(),
  image: yup.string().required("required"),
  startDate: yup
    .string()
    .matches(date, "Date format should be YYYY-MM-DD")
    .required("required"),
});
const initialValues = {
  projectName: "",
  description: "",
  live: "",
  repo: "",
  image: "",
  startDate: "",
  tags: "",
};

export default AddProject;
