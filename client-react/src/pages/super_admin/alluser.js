import React , {useEffect} from 'react';
import {Link} from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {useParams, useHistory, useLocation}from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import {getAllUser, getUSER} from './../../redux'
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  
  const useStyles = makeStyles({
    table: {
      minWidth: 700,
    },
  });
export default function AllUser() {
    const classes = useStyles();
    const Data = useSelector(state => state.user.userData)
    const auth = useSelector(state => state.auth)
    
    const dispatch=useDispatch()
    const history=useHistory()
    const location=useLocation()
    useEffect(() => {
      dispatch(getAllUser());
    },[]);
    const handleLocation=(user) => {
      location.state=user;
      console.log(location)
      console.log(history)
    }
    
    const rowdata= Data.map((user,i) => (
        <StyledTableRow key={i}>
          <StyledTableCell ><Link  to={`/superadmin/users/${user._id}`} onClick={()=> handleLocation(user)}>{user.fname} {user.mname} {user.lname}</Link></StyledTableCell>
          <StyledTableCell align="right">{user.email}</StyledTableCell>
          <StyledTableCell align="right">{user.gender}</StyledTableCell>
          <StyledTableCell align="right">{user.address}</StyledTableCell>
          <StyledTableCell align="right">{user.state}</StyledTableCell>
          <StyledTableCell align="right">{user.city}</StyledTableCell>
          <StyledTableCell align="right">{user.zip}</StyledTableCell>
        </StyledTableRow>
      ))
    return (
      <>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Gender</StyledTableCell>
            <StyledTableCell align="right">Address</StyledTableCell>
            <StyledTableCell align="right">State</StyledTableCell>
            <StyledTableCell align="right">City</StyledTableCell>
            <StyledTableCell align="right">Zip</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rowdata
          }
        </TableBody>
      </Table>
    </TableContainer>
    </>
    )
}
