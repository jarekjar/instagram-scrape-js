import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserTable = ({data}) => {
  const classes = useStyles();

  console.log(data)

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="right">Username</TableCell>
            <TableCell align="right">Full Name</TableCell>
            <TableCell align="right">Follows You</TableCell>
            <TableCell align="right">Followed By You</TableCell>
            <TableCell align="right">Is Private</TableCell>
            <TableCell align="right">Is Verified</TableCell>
            <TableCell align="right">Requested</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((user) => {
            const userData = user.node;
            return (
            <TableRow key={userData.id}>
              <TableCell scope="row">
                <img crossorigin="" src={userData.profile_pic_url}></img>
              </TableCell>
              <TableCell align="right">{userData.username}</TableCell>
              <TableCell align="right">{userData.full_name}</TableCell>
              <TableCell align="right">{userData.follows_viewer ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{userData.followed_by_viewer ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{userData.is_private ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{userData.is_verified ? 'Yes' : 'No'}</TableCell>
              <TableCell align="right">{userData.requested_by_viewer ? 'Yes' : 'No'}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default UserTable;