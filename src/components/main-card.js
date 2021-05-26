import React, { useEffect, useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import IGIcon from "../img/IG.svg";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import CssBaseline from "@material-ui/core/CssBaseline";
import UserTable from "./table";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

import data from "../services/results";

import { getFollowers, getStatus } from "../services/axios";

const LinearProgressWithLabel = (props) => {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(6, "auto"),
      padding: theme.spacing(3),
    },
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  igIconContainer: {
    textAlign: "center",
    marginBottom: "20px",
  },
  igIcon: {
    width: "50px",
    margin: "2px auto",
  },
  container: {
    minWidth: "500px",
  },
  textbox: {
    margin: "10px 0",
  },
  textboxLower: {
    margin: "0 0 10px 0",
  },
  link: {
    marginTop: "5px",
  },
  input: {
    margin: "10px 0;",
  },
  loader: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
    margin: "0 auto",
    flexDirection: "column",
    flexWrap: "nowrap",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "stretch",
    height: "400px",
  },
  linearLoad: {
    width: "100%",
  },
}));

const MainCard = () => {
  const [followersChecked, setFollowersChecked] = useState(true);
  const [followingChecked, setFollowingChecked] = useState(false);
  const [username, setUsername] = useState({ text: null, error: false });
  const [password, setPassword] = useState({ text: null, error: false });
  const [account, setAccount] = useState({ text: null, error: false });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [progress, setProgress] = useState(0);

  const classes = useStyles();

  const onTextEdit = (setter, data) => {
    setter({ text: data.target.value, error: false });
  };

  const onScrapeClick = async () => {
    if (!username.text || username.text.length === 0) {
      setUsername({ text: null, error: true });
    }
    if (!password.text || password.text.length === 0) {
      setPassword({ text: null, error: true });
    }
    if (!account.text || account.text.length === 0) {
      setAccount({ text: null, error: true });
    }
    if (
      username.text &&
      username.text.length > 0 &&
      password.text &&
      password.text.length > 0 &&
      account.text &&
      account.text.length > 0
    ) {
      //call the api here
      setLoading(true);
      const data = await getFollowers({
        username: username.text,
        password: password.text,
        account: account.text,
      })
        .then((response) => response.data)
        .catch(({ response }) => {
          alert("API Error, try again");
          window.location.reload();
        });
      setProgress(data?.progress);
      setTotalFollowers(data?.totalFollowers);

      //setLoading(false);
      //setResults(data.data);

      const statusInterval = setInterval(async () => {
        const result = await getStatus()
          .then((response) => response.data)
          .catch(({ response }) => {
            alert(response?.data);
            clearInterval(statusInterval);
          });
        if (!isNaN(result.progress)) {
          setProgress(result.progress);
        }
        if (result.data) {
          setResults(result.data);
          clearInterval(statusInterval);
        }
      }, 1000);
    }
  };

  return (
    <div className={classes.root}>
      {results && <UserTable data={results} />}
      {!results && (
        <Paper elevation={3}>
          <Container component="main" className={classes.container}>
            <CssBaseline />
            {!loading ? (
              <div className={classes.paper}>
                <div className={classes.igIconContainer}>
                  <img src={IGIcon} className={classes.igIcon} />
                </div>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.textbox}
                >
                  Credentials For The Account To Scrape With
                </Typography>
                <Grid item xs className={classes.link}>
                  <Link href="#" variant="body2">
                    Why do I need this?
                  </Link>
                </Grid>
                <div className={classes.form}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    className={classes.input}
                    required
                    error={username.error}
                    onChange={(data) => onTextEdit(setUsername, data)}
                    helperText={username.error && "Please enter a username"}
                  />
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="password"
                    label="Password"
                    name="password"
                    className={classes.input}
                    type="password"
                    required
                    error={password.error}
                    onChange={(data) => onTextEdit(setPassword, data)}
                    helperText={password.error && "Please enter a password"}
                  />
                  <Typography
                    component="h1"
                    variant="h5"
                    className={classes.textbox}
                  >
                    IG Account To Scrape
                  </Typography>
                  <TextField
                    variant="outlined"
                    fullWidth
                    id="igaccount"
                    label="Ex: champagnepapi "
                    name="IG Account Link"
                    className={classes.textboxLower}
                    required
                    error={account.error}
                    onChange={(data) => onTextEdit(setAccount, data)}
                    helperText={account.error && "Please enter an account"}
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        checked={followersChecked}
                        onClick={() => setFollowersChecked(!followersChecked)}
                        disabled
                      />
                    }
                    label="Followers"
                  />
                  <br></br>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        checked={followingChecked}
                        onClick={() => setFollowingChecked(!followingChecked)}
                        disabled
                      />
                    }
                    label="Following"
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={onScrapeClick}
                  >
                    Scrape!
                  </Button>
                </div>
              </div>
            ) : (
              <div className={classes.loader}>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.textbox}
                >
                  Getting followers....
                </Typography>
                <div className={classes.linearLoad}>
                  <LinearProgressWithLabel
                    value={Math.floor((progress / totalFollowers) * 100)}
                  />
                </div>
                <Typography
                  component="h1"
                  variant="h5"
                  className={classes.textbox}
                >
                  {progress} / {totalFollowers}
                </Typography>
              </div>
            )}
          </Container>
        </Paper>
      )}
    </div>
  );
};

export default MainCard;
