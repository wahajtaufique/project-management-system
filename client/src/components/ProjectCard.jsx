import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Menu, MenuItem } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateProject } from '../store/actions';

const options = [
    "Completed",
    "Archive"
]

const ProjectCard = ({ id, title, image, description, repo, live, startDate, editable}) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handler = (option) => {
    dispatch(updateProject({
      id, status: option == "Completed" ? "completed" : "archived"
    }))
    handleClose();
  }

  return (
    <Card>
      <CardHeader
        action={
          editable && (<IconButton aria-label="settings" onClick={handleClick}>
            <EditIcon />
          </IconButton>)
        }
        title={title}
        subheader={startDate}
      />
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: 48 * 4.5,
            width: '20ch',
          },
        } }
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => handler(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt=""
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {repo && (
          <IconButton aria-label="view">
            <VisibilityIcon />
          </IconButton>
        )}
        {live && (
          <IconButton aria-label="open-in-browser">
            <OpenInNewIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
}

export default ProjectCard