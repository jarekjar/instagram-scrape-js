import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import pikachu from '../img/Pokemon.svg'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  pikachu: {
      width: "70px",
      paddingRight: "20px"
  }
}));

const NavBar = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={pikachu} className={classes.pikachu}></img>
          <Typography variant="h6" className={classes.title}>
            Pikachu's Instagram Scraping App! 
          </Typography>
          {/* <Button color="inherit">Help</Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;