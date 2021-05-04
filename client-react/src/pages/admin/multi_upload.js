import React, {useState} from 'react'

    var fileArray = [];
export default function MultipleImageUploadComponent() {
    const [files, setFiles] = useState([])

    const uploadMultipleFiles=(e) =>{
        var fileObj = [];
        fileObj.push(e.target.files)
        for (let i = 0; i < fileObj[0].length; i++) {
            fileArray.push(URL.createObjectURL(fileObj[0][i]))
        }
        setFiles(fileArray)
    }
    const uploadFiles=(e) =>{
        e.preventDefault()
        console.log(files)
    }
   function deleteFiles(e) {
        const s = fileArray.filter((item,i) => i !== e);
        setFiles([s]);
        console.log(files);
    }
    return (
        <form>
        <div className="form-group preview">
                {fileArray.length > 0 &&
                fileArray.map((item, index) => {
                    return (
                    <div key={item} className="img_show">
                        <span id="close" onClick={()=>deleteFiles(index)}>X</span>
                        <img src={item} alt="" width="120px" height="120px"/>
                    </div>
                    );
                })}
            </div>

        <div className="form-group">
            <input type="file" className="form-control" onChange={uploadMultipleFiles} multiple />
        </div>
        <button type="button" className="btn btn-danger btn-block" onClick={uploadFiles}>Upload</button>
    </form >
    )
}

/* import React, { Component } from 'react';

export default class MultipleImageUploadComponent extends Component {

    fileObj = [];
    fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [null]
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
    }

    uploadMultipleFiles(e) {
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }

    uploadFiles(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        return (
            <form>
                {(this.fileArray || []).map((url, i) => (
                <div className="form-group multi-preview" key={i}>
                    <img src={url} alt="..." width="120px" height="120px"/>
                </div>
                ))}

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                </div>
                <button type="button" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>
            </form >
        )
    }
} */