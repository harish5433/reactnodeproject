import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useFormik } from "formik";
import * as Yup from 'yup'
import {Modal, Button} from 'react-bootstrap'
import {getAllCategory} from './../../redux'
import {useDispatch, useSelector} from 'react-redux'

// yup validation schema ..............
    const FILE_SIZE = 10000;
    const SUPPORTED_FORMATS = [
      "image/jpg",
      "image/jpeg",
      "image/gif",
      "image/png"
  ];
  const validationSchema = Yup.object().shape({
    category: Yup.string()
      .required("Category is required"),
    name: Yup.string()
      .required("Name is required"),
    price: Yup.string()
      .required("Price is required")
      .matches(/^[0-9]/,"Price must be number"),
    offer: Yup.string()
    .required("Offer is required")
    .matches(/^[0-9]/,"Offer must be number"),
    quantity : Yup.string()
    .required("Quantity is required")
    .matches(/^[0-9]/,"Quantity must be number"),
    des: Yup.string()
      .required("Description is required")
      .min(30,"At least 30 Character")
    /* .test(
      "fileSize",
      "File too large",
      values => values && values.size <= FILE_SIZE
    ) */
    /* .test(
      "fileFormat",
      "Unsupported Format",
      values => {
        for(let i=0; i<values; i++) {
          values[i] && SUPPORTED_FORMATS.includes(values[i].type)
        }
      }
    ) */
  })

export default function Product() {
  var ffl=[];
  var img=[];
  const [indx, setIndx]=useState([0]);
    const [editfileshow, setEditfileshow] = useState([]);
    const [edit, setEdit] = useState(false);
    const [imgShow, setImgShow] = useState([]);
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(false);
    const [list, setList] = useState([]);
    const [imgurl, setImgUrl] = useState("");

    //....................declare initial value..................
    const [initialValues, setInitialValues] = useState({
      category: "",
      name: "",
      price: "",
      offer: "",
      quantity: "",
      des: "",
    });

    /* ......................modal open handle................ */
    const handleClose = () => {
      setShow(false) 
      setInitialValues({})
      setFiles([])
      setImgShow([]);
      setEditfileshow([])
      ffl=[];
      img=[];
    };
    const handleShow = () => setShow(true);

//.... get dropdown data............................
    const Data = useSelector(state => state.category)
      const dispatch=useDispatch()
      useEffect(() => {
        dispatch(getAllCategory());
      },[]);

//.................image handle ..................................

  const handleImageChange=(e) =>{
    var fileObj = []
    fileObj.push(e.target.files)
    for (let i = 0; i < fileObj[0].length; i++) {
      ffl.push(fileObj[0][i])
      img.push(URL.createObjectURL(fileObj[0][i]))  
    }
    setFiles(files.concat(ffl))
    setImgShow(imgShow.concat(img))
  }

    //................... multi image delete...................
  function deleteFiles(e) {
    const editfile = editfileshow.filter((item, index) => item !== e);
    const filedata = files.filter((item, index) => index !== e);
    const fileurl = imgShow.filter((item, index) => item !== e);
    setEditfileshow(editfile)
    setFiles(filedata)
    setImgShow(fileurl)
  }
  console.log(" deletecase", files)
//............ edit handle ......................
  const handleEdit=(data)=>{
    setEdit(true);
    setEditfileshow(data.images)
    setFiles(data.images)
    setImgShow([]);
    handleShow();
    setInitialValues(data)
  }
  console.log(files)
 // .......... delete by api ........... 
  const handleDelete=(data)=>{
    axios.post('http://localhost:8000/product/delete'+data._id, data._id)
      .then(res=>{
        console.log("delete")
      })
      .catch(error=>{
        console.log(error)
      })
  }
  

//....................formik ..... ........//
  const { handleSubmit,handleChange, setFieldValue, resetForm, values, errors, touched} = useFormik({
    initialValues:initialValues,
    enableReinitialize:true , 
    validationSchema, 
    onSubmit(values, e){
    // e.preventDefault()
      const formData = new FormData();
      for ( let key in  values) {
          formData.append(key, values[key]);
      } 
      for (let i=0; i<files.length; i++) {
        formData.append("image", files[i]);
      }

      axios.post('http://localhost:8000/product/add', formData)
      .then(res=>{
        setList([...list, res.data.result])
      })
      .catch(error=>{
        console.log(error)
      })
      handleClose();
      resetForm({})
    }
  });

  //............ api for get data...............................
      useEffect(() => {
        axios.get('http://localhost:8000/product')
        .then(res=>{
          console.log(res.data.result)
          setList(res.data.result)
          const url="http://localhost:8000/image/"
          setImgUrl(url)
        })
        .catch(error=>{
          console.log(error)
        })
      }, []);

return (
    <div className="container pt-3">
        <div className="text-center">
          <button className="btn btn-success" onClick={handleShow}><strong>+</strong> ADD PRODUCT</button>
        </div>

        {/* ...........Model ................ */}
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          size="sm"
        >
          <form  onSubmit={handleSubmit} > 
          <Modal.Header closeButton className="bg-success">
          <Modal.Title >Add New Product</Modal.Title>
          </Modal.Header>
          <Modal.Body >
              <div className="form-row">
                  <div className="form-group col-sm-12">
                  <label>Category</label>
                  <select name="category" 
                  className={`custom-select custom-select-lg mb-3 ${errors.category && touched.category ? 'invalid' : ''}`}
                  value={values.category}
                  onChange={handleChange}
                  >
                  <option></option>
                      {
                          Data.catData.map((item, i)=>(
                              <option key={i}>{item.cat_name}</option>
                          ))
                      }
                  </select>
                  { errors.category && touched.category ?<span style={{color:"red"}}>{errors.category}</span>:null}
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-sm-6">
                  <label>Product Name</label>
                  <input 
                  type="text" 
                  name="name"  
                  value={values.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name && touched.name ? 'invalid' : ''}`}
                  />
                  { errors.name && touched.name ?<span style={{color:"red"}}>{errors.name}</span>:null}
                  </div>
                  <div className="form-group col-sm-6">
                  <label>Price</label>
                  <input 
                  type="text" 
                  name="price"  
                  className={`form-control ${errors.price && touched.price ? 'invalid' : ''}`}
                  value={values.price}
                  onChange={handleChange}
                  
                  />
                  { errors.price && touched.price ?<span style={{color:"red"}}>{errors.price}</span>:null}
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-sm-6">
                  <label>Offer</label>
                  <input 
                  type="text" 
                  name="offer"  
                  className={`form-control ${errors.offer && touched.offer ? 'invalid' : ''}`}
                  value={values.offer}
                  onChange={handleChange}
                  
                  />
                  { errors.offer && touched.offer ?<span style={{color:"red"}}>{errors.offer}</span>:null}
                  </div>
                  <div className="form-group col-sm-6">
                  <label>Quantity</label>
                  <input 
                  type="text" 
                  name="quantity"  
                  className={`form-control ${errors.quantity && touched.quantity ? 'invalid' : ''}`}
                  value={values.quantity}
                  onChange={handleChange}
                  
                  />
                  { errors.quantity && touched.quantity ?<span style={{color:"red"}}>{errors.quantity}</span>:null}
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-sm-12">
                  <label>Description</label>
                  <textarea name="des" 
                  className={`form-control ${errors.des && touched.des ? 'invalid' : ''}`}
                  value={values.des}
                  onChange={handleChange}
                  ></textarea>
                  { errors.des && touched.des ?<span style={{color:"red"}}>{errors.des}</span>:null}
                  </div>
              </div>
              <div className="form-row">
                  <div className="form-group col-sm-12">
                  <label className="custom-file-label"/* {`custom-file-label ${errors.image && touched.image ? 'invalid' : ''}`} */>upload</label>
                  <input type="file" 
                  name="image" 
                  multiple
                  className="custom-file-input"
                    /* onChange={(e) => {
                    setFieldValue('image', e.target.files);
                    setFiles(e.target.files);
                  }} */
                  onChange={(e)=>handleImageChange(e)}
                  />
                  {/* { errors.image && touched.image ?<span style={{color:"red"}}>{errors.image}</span>:null} */}
                  </div>
                  
              </div>
              <div className="form-row">
              <div className="form-group col-sm-12" style={{display: "flex"}}>
                {edit && editfileshow.length > 0 &&
                editfileshow.map((item, index) => (
                    <div key={item} className="img_show">
                      {
                        setIndx(index+indx)
                      }
                        <span id="close" onClick={() => deleteFiles(indx)}>X</span>
                        <img src={`${imgurl}${item.filename}`} alt="" width="50px" height="50px"/>
                    </div>
                ))}
                {imgShow.length > 0 &&
                imgShow.map((item, index) => (
                    <div key={item} className="img_show">
                      {
                        setIndx(index+indx)
                      }
                        <span id="close" onClick={() => deleteFiles(indx)}>X</span>
                        <img src={item} alt="" width="50px" height="50px"/>
                    </div>
                ))}
            </div>
              {/* {img.length > 0 && img.map((value)=> (
                <div style={{display: "flex"}}>
                    <img src={value} width="30" height="30"/>
                </div>
              ))} */}
              </div>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Close
          </Button>
          <Button type="submit" variant="success">ADD</Button>
          </Modal.Footer>
          </form>
        </Modal>
    {/* ...........Model ................ */}

        {/* ...... product show./.......... */}
      <table className="tbl">
          <thead>
              <tr>
                <td>S. No.</td>
                <td>Product name</td>
                <td>Category</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Offer</td>
                <td>Image</td>
                <td colSpan="2">Action</td>
              </tr>
          </thead>
          <tbody>
            {
              list.map((item,i)=>(
                <tr key={i}>
                <td >{i+1}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>{item.offer}</td>
                <td>{item.quantity}</td>
                <td>
                {
                  item.images.map((img,i)=>(
                    <span key={i}><img src={`${imgurl}${img.filename}`} width="40px" height="40px"/></span>
                  ))
                }
                </td>
                <td >Delete</td>
                <td onClick={()=>handleEdit(item)}>Edit</td>
              </tr>
              ))
            }
          </tbody>
      </table>     
  </div>
);



// function validateData(values) {
//   var errors= {};
//   if (!values?.category) {
//       errors.category = "category Required";
//   }
//   if (!values?.name) {
//       errors.name = "name Required";
//   }
//   if (!values?.price) {
//       errors.price = "price Required";
//   }
//   if (!values?.offer) {
//       errors.offer = "offer Required";
//   }
//   if (!values?.quantity) {
//       errors.quantity = "quantity Required";
//   }
//   if (!values?.des) {
//       errors.des = "des Required";
//   }
//   if (!values?.image) {
//     errors.image = "image Required";
// }
//   return errors;
// }

//     const [show, setShow] = useState(false);
//     const [list, setList] = useState([]);
//     const [imgurl, setImgUrl] = useState("");
//     const handleClose = () => {
//       setShow(false) 
//     };
//     const handleShow = () => {
//       setShow(true)
//     };
//     const [files, setFiles] = useState("");
//     const [selectedValue, setSelectedValue] = React.useState({});
//     const [values, setValues] = useState(selectedValue);
//     const [errors, setErrors] = useState({ selected: undefined });
//     const [formValidate, setSubmitting] = React.useState({
//       isSubmitting: false,
//       error: undefined,
//     });
//     React.useEffect(() => {
//       const validationErrors = validateData(values);
//       let noErrors = Object.keys(validationErrors).length == 0;
//       let currentError = validationErrors[errors.selected];
//       setSubmitting({ isSubmitting: noErrors, error: currentError });
//   }, [errors]);
//   React.useEffect(() => {
//       const validationErrors = validateData(selectedValue);
//       let noErrors = Object.keys(validationErrors).length == 0;
//       let currentError = validationErrors[errors.selected];
//       setValues({
//           ...selectedValue,
//       });
//       setSubmitting({ isSubmitting: noErrors, error: currentError });
//   }, [selectedValue]);
// //.... get dropdown data.........
// const dispatch=useDispatch()
// const Data = useSelector(state => state.category)

// const handleChange = (event) => {
//   setValues({
//       ...values,
//       [event?.target.name]: event?.target.value,
//   });
//   setErrors({ ...errors, selected: event?.target.name });
// };

// const handleImageChange=(e)=>{
//   setFiles(e.target.files)
//   setValues({
//     ...values,
//     ["image"]: files,
// });
// setErrors({ ...errors, selected: "image" });
// }

//   const handleEdit=(data)=>{
//     setSelectedValue(data)
//     handleShow();
    
//   }

//   const handleSubmit = (e) => {
//       e.preventDefault();
//     if (formValidate.isSubmitting) {
//         let userdata = values;
//         console.log(userdata)
//       //  setShow(false)
//     }
// };
// console.log("fggf", files)
// console.log(errors)
// useEffect(() => {
//   axios.get('http://localhost:8000/product')
//       .then(res=>{
//         console.log(res.data.result)
//         setList(res.data.result)
//         const url="http://localhost:8000/image/"
//         setImgUrl(url)
//       })
//       .catch(error=>{
//         console.log(error)
//       })
//       dispatch(getAllCategory());
// }, []);

// return (
//     <div className="container pt-3">
//         <div className="text-center"><button className="btn btn-success" onClick={handleShow}><strong>+</strong> ADD PRODUCT</button></div>
//         {/* ...........Model ................ */}
//             <Modal
//             show={show}
//             onHide={handleClose}
//             backdrop="static"
//             keyboard={false}
//             size="sm"
//             >
//             <form > 
//             <Modal.Header closeButton className="bg-success">
//             <Modal.Title >Add New Product</Modal.Title>
//             </Modal.Header>
//             <Modal.Body >
//                 <div className="form-row">
//                     <div className="form-group col-sm-12">
//                     <label>Category</label>
//                     <select name="category" 
//                     className={`custom-select custom-select-lg mb-3 '}`}
//                     onChange={(input) => handleChange(input)}
//                     value={values.category}
//                     >
//                     <option></option>
//                         {
//                             Data.catData.map((item, i)=>(
//                                 <option key={i}>{item.cat_name}</option>
//                             ))
//                         }
//                     </select>
//                     {
//                       errors?.selected == "category"
//                         ? <span style={{color: "red"}}>{formValidate?.error}</span>
//                         : ""
//                     }
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group col-sm-6">
//                     <label>Product Name</label>
//                     <input 
//                      className={`form-control `}
//                     type="text" 
//                     name="name"  
//                     onChange={(input) => handleChange(input)}
//                     value={values.name}
                    
//                     />
//                     {
//                       errors?.selected == "name"
//                         ? <span style={{color: "red"}}>{formValidate?.error}</span>
//                         : ""
//                     }
//                     </div>
//                     <div className="form-group col-sm-6">
//                     <label>Price</label>
//                     <input 
//                     type="text" 
//                     name="price"  
//                     className={`form-control `}
//                     onChange={(input) => handleChange(input)}
//                     value={values.price}
                    
//                     />
//                     {
//                       errors?.selected == "price"
//                         ? <span style={{color: "red"}}>{formValidate?.error}</span>
//                         : ""
//                     }
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group col-sm-6">
//                     <label>Offer</label>
//                     <input 
//                     type="text" 
//                     name="offer"  
//                     className={'form-control'}
//                     onChange={(input) => handleChange(input)}
//                     value={values.offer}
                    
//                     />
//                     {
//                       errors?.selected == "offer"
//                         ? <span style={{color: "red"}}>{formValidate?.error}</span>
//                         : ""
//                     }
//                     </div>
//                     <div className="form-group col-sm-6">
//                     <label>Quantity</label>
//                     <input 
//                     type="text" 
//                     name="quantity"  
//                     className={`form-control `}
//                     onChange={(input) => handleChange(input)}
//                     value={values.quantity}
                    
//                     />
//                    {
//                       errors?.selected == "quantity"
//                         ? <span style={{color: "red"}}>{formValidate?.error}</span>
//                         : ""
//                     }
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group col-sm-12">
//                     <label>Description</label>
//                     <textarea name="des" 
//                     className={`form-control `}
//                     onChange={(input) => handleChange(input)}
//                     value={values.des}
//                     ></textarea>
//                     {
//                       errors?.selected == "des"
//                         ? <span style={{color: "red"}}>{formValidate?.error}</span>
//                         : ""
//                     }
//                     </div>
//                 </div>
//                 <div className="form-row">
//                     <div className="form-group col-sm-12">
//                     <label className={`custom-file-label`}>upload</label>
//                     <input type="file" 
//                     name="image" 
//                     multiple
//                     className="custom-file-input"
//                     onChange={handleImageChange}
//                     />
//                     </div>
//                     {
//                       errors?.selected == "image"
//                         ? <span style={{color: "red"}}>{formValidate?.error}</span>
//                         : ""
//                     }
//                 </div>
//             </Modal.Body>
//             <Modal.Footer>
//             <Button variant="secondary" onClick={handleClose}>
//                 Close
//             </Button>
//             <Button type="submit" onClick={handleSubmit} variant="success"
//               disabled={!formValidate.isSubmitting}
//             >ADD</Button>
//             </Modal.Footer>
//             </form>
//         </Modal>
//     {/* ...........Model ................ */}

//  {/* ...... product show./.......... */}
//           <table className="tbl">
//               <thead>
//                   <tr>
//                     <td>S. No.</td>
//                     <td>Product name</td>
//                     <td>Category</td>
//                     <td>Price</td>
//                     <td>Quantity</td>
//                     <td>Offer</td>
//                     <td>Image</td>
//                     <td colSpan="2">Action</td>
//                   </tr>
//               </thead>
//               <tbody>
//                 {
//                   list.map((item,i)=>(
//                     <tr key={i}>
//                     <td >{i+1}</td>
//                     <td>{item.name}</td>
//                     <td>{item.category}</td>
//                     <td>{item.price}</td>
//                     <td>{item.offer}</td>
//                     <td>{item.quantity}</td>
//                     <td>
//                     {
//                       item.images.map((img,i)=>(
//                         <span key={i}><img src={`${imgurl}${img.filename}`} width="40px" height="40px"/></span>
//                       ))
//                     }
//                     </td>
//                     <td >Delete</td>
//                     <td onClick={()=>handleEdit(item)}>Edit</td>
//                   </tr>
//                   ))
//                 }
//               </tbody>
//           </table>     
//       </div>
// );
 }
