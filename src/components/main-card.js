import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IGIcon from "../img/IG.svg";
import Typography from "@material-ui/core/Typography";
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(6, "auto"),
      padding: theme.spacing(3),
    }
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  igIconContainer: {
      textAlign: "center",
      marginBottom: "20px"
  },
  igIcon: {
      width: "50px",
      margin: "2px auto",
  },
  container: {
      minWidth: "500px"
  },
  textbox: {
      margin: "10px 0"
  },
  textboxLower: {
      margin: "0 0 10px 0",
  },
  link: {
      marginTop: "5px"
  }
}));

const MainCard = () => {

    const [followersChecked, setFollowersChecked] = useState(true);

    const [followingChecked, setFollowingChecked] = useState(false);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Container component="main" className={classes.container}>
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.igIconContainer}>
            <img src={IGIcon} className={classes.igIcon}/>
          </div>
          <Typography component="h1" variant="h5" className={classes.textbox}>
            Enter a valid session ID
          </Typography>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              fullWidth
              id="sessionID"
              label="Session ID"
              name="session"
              autoFocus
            />
            <Grid item xs className={classes.link}>
              <Link href="#" variant="body2">
                How do I get this?
              </Link>
            </Grid>
            <Typography component="h1" variant="h5" className={classes.textbox}>
            IG Account Link To Scrape
          </Typography>
          <TextField
              variant="outlined"
              fullWidth
              id="igaccount"
              label='Link "instagram.com/champagnepapi/"'
              name="IG Account Link"
              autoFocus
              className={classes.textboxLower}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={followersChecked} onClick={() => setFollowersChecked(!followersChecked)} disabled />}
              label="Followers"
            />
            <br></br>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" checked={followingChecked} onClick={() => setFollowingChecked(!followingChecked)} />}
              label="Following"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Scrape!
            </Button>
          </div>
        </div>
        </Container>
      </Paper>
    </div>
  );
};

export default MainCard;
