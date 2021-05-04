import React, {useState ,useEffect} from 'react'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';
import {Modal, Button} from 'react-bootstrap'

import {useDispatch, useSelector, shallowEqual} from 'react-redux'
import {getAllCategory, addCategory, getCategory, deleteCategory, updateCategory } from './../../redux'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  Typography: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    textTranseform: "uppercase"
  },
  editIcon: {
    color: "blue"
  },
  deleteIcon: {
    color: "#ef2a4e"
  },
  heading: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    textAlign: 'center',
    padding:theme.spacing(2),
    backgroundColor: "skyBlue",
    border: "1px solid tomato",
    borderCollapse: "collapse"
  },
  head: {
    color: theme.palette.text.secondary,
    fontWeight: 600,
    textAlign: 'center',
    padding:theme.spacing(2),
    backgroundColor: "#9c9695",
    border: "1px solid tomato",
    borderCollapse: "collapse"
  },
  

}));

export default function Category() {
  const classes = useStyles();
const [editId, setEditId]= useState(0)
const [name,setName]= useState({cat_name:""})
const [show, setShow] = useState(false);

// modal open close .........................
  const handleClose = () => {
    setShow(false)
  };
  const handleShow = () => setShow(true);
  const dispatch=useDispatch()
  const Data = useSelector( state => state.category)
// all data get for table ........................
   useEffect(() => {
    dispatch(getAllCategory());
  },[]);
// edit data .........................
  const editData=(id)=>{
   // dispatch(getCategory(id))
   setEditId(id)
    const editdata=Data.catData.find((post) => (post._id === id ?  post: null))
    handleShow()
     setName({...name,
      ['cat_name']:editdata.cat_name
    })
  }
// on change value set .........................
  const changeHandle=(e)=> {
    setName({...name,
        [e.target.name]:e.target.value
    })
  }
// submit.................
  const onSubmit=(e)=>{
    e.preventDefault();
    if(editId === 0){
      dispatch(addCategory(name))
    }
    else{
      dispatch(updateCategory(editId, name))
    }
  }

    return(
    <div className="container">
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <form onSubmit={onSubmit}> 
        <Modal.Header closeButton className="bg-success">
          <Modal.Title >Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="form-group">
              <label>Category</label>
              <input 
              type="text" 
              name="cat_name"  
              className="form-control"
              value={name.cat_name}
              onChange={changeHandle}
              />
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {
            editId ? <Button type="submit" variant="primary" onClick={handleClose}>Update</Button>
            :<Button type="submit" variant="primary" onClick={handleClose}>ADD</Button>
          }
        </Modal.Footer>
        </form>
      </Modal>
{/* <table className="tbl">
  <thead>
    <tr>
      <th colSpan="4"><Button variant="success" onClick={handleShow}  className="right">ADD Category</Button></th>
    </tr>
    <tr>
      <th>S. No.</th>
      <th>Category</th>
      <th colSpan="2">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      Data.catData.map((cat, i)=>(
      <tr key={i}>
      <td>{i+1}</td>
      <td>{cat.cat_name}</td>
      <td><button onClick={()=>dispatch(deleteCategory(`${cat._id}`))}>Delete</button></td>
      <td><button onClick={()=>editData((`${cat._id}`))}>Edit</button></td>
    </tr>
      ))
    }
  </tbody>
</table> */}
     
<div className={classes.root}>
        <Grid container spacing={0}>
        <Grid container spacing={0} className={classes.heading}>
          <Grid item xs={12} sm={8} >
            <Typography >Category Data</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography style={{color: "green"}} onClick={handleShow}><AddIcon/>ADD Category</Typography>
          </Grid>
        </Grid>
        <Grid container spacing={0} className={classes.head}>
          <Grid item xs={12} sm={2}>
            <Typography >S.No.</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography >Category</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography >Action</Typography>
          </Grid>
        </Grid>
          {
        Data.catData.map((cat, i)=>(
          <Grid container spacing={0}>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.Typography}>{i+1}</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.Typography}>{cat.cat_name}</Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.deleteIcon} onClick={()=>dispatch(deleteCategory(`${cat._id}`))}><DeleteIcon/></Typography>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Typography className={classes.editIcon} onClick={()=>editData((`${cat._id}`))}><BorderColorIcon/></Typography>
            </Grid>
          </Grid>
        ))}
        </Grid>
    </div>
   </div>
    )
}
/* import React, { Component } from 'react'
import {connect} from 'react-redux'
import { Formik } from 'formik'
import * as Yup from 'yup'
import {Modal, Button} from 'react-bootstrap'
import {getAllCategory, addCategory, getCategory, deleteCategory, updateCategory } from './../../redux'

class Category extends Component {
      constructor(props) {
        super(props)
        this.state= {
          show: false,
          editId: null, 
          formValues:{
            cat_name: ""
          }
        }
      }
      handleClose = () => {
        this.setState({
          show: false
        })
        
      };
      handleShow = () =>  {
        this.setState({
          show: true,
        })
      }
      componentDidMount() {
        //this.props.getAllCategory()
        this.props.getAllCategory()
      }
      onEdit=(id)=> {
        const editdata=this.props.catData.find((post) => (post._id === id ?  post: null))
          this.handleShow()
         this.setState({
            editId:id,
            formValues:{
              cat_name: editdata.cat_name
            }
          })
      }
      Reset=()=> {
          
      }
  render() {
    return (
      <Formik
      initialValues= {
        this.state.formValues
      }
      enableReinitialize={true} 
      validationSchema = {
          Yup.object().shape({
          cat_name: Yup.string()
              .required('Category is required'),
          })
      }
      onSubmit={(values)=> {
        if(this.state.editId !==null)
        {
          console.log(this.editId)
          this.props.updateCategory(this.state.editId, values)
          this.handleClose()
        }
        else{
          this.props.addCategory(values)
          this.handleClose()
        }
        this.setState({
          editId:null,
          formValues:{
            cat_name: ""
          }
        })
      }}
     >
       
    {({values, errors, touched, handleChange, handleBlur , handleSubmit, isSubmitting}) => (
        <div className="container">
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <form onSubmit={handleSubmit}> 
          <Modal.Header closeButton className="bg-success">
            <Modal.Title >Add New Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="form-group">
                <label>Category</label>
                <input 
                type="text" 
                name="cat_name"  
                className="form-control"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.cat_name}
                />
                <span style={{color: "red"}}>{errors.cat_name && touched.cat_name ? errors.cat_name:null}</span>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button type="reset" variant="dark" onClick={this.Reset}>Reset</Button>
            {
              this.state.editId? <Button type="submit" variant="primary" onClick={this.handleClose}>Update</Button>
              :<Button type="submit" variant="primary">ADD</Button>
            }
          </Modal.Footer>
          </form>
        </Modal>
              <table className="tbl">
                <thead>
                  <tr>
                    <th colSpan="4"><Button variant="success" onClick={this.handleShow}  className="right">ADD Category</Button></th>
                  </tr>
                  <tr>
                    <th>S. No.</th>
                    <th>Category</th>
                    <th colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    this.props.catData.map((cat, i)=>(
                    <tr key={i}>
                    <td>{i+1}</td>
                    <td>{cat.cat_name}</td>
                    <td><button onClick={()=>this.props.deleteCategory(`${cat._id}`)}>Delete</button></td>
                    <td><button onClick={()=>this.onEdit(`${cat._id}`)}>Edit</button></td>
                  </tr>
                    ))
                  }
                </tbody>
              </table>
          </div>
      )}
     </Formik>
    )
  }
}
const mapStateToProps=(state) =>{
  return {
    catData: state.category.catData
  }
}
export default connect(mapStateToProps,{getAllCategory, addCategory, getCategory, deleteCategory, updateCategory })(Category) */

