import React , {useState} from 'react'

export default function SingleImageUploadComponent() {
    const [file, setFile] = useState(null);

    function uploadSingleFile(e) {
        if(e.target.files[0]){
            setFile(URL.createObjectURL(e.target.files[0]));
            console.log("file", file);
        }
    }

    function upload(e) {
        e.preventDefault();
        console.log(file);
    }

    // multiple single with delete
    const [files, setFiles] = useState([]);

        function uploadSingleFiles(e) {
            setFiles([...files, URL.createObjectURL(e.target.files[0])]);
            console.log("files", files);
        }

        function uploads(e) {
            e.preventDefault();
            console.log(files);
        }

        function deleteFiles(e) {
            const s = files.filter((item, index) => index !== e);
            setFiles(s);
            console.log(s);
        }

    return (
    <>
        <form>
      <div className="form-group preview">
        {file && <img src={file} alt="" width="120px" height="120px"/>}
      </div>
      <div className="form-group">
        <input
          type="file"
          className="form-control"
          onChange={uploadSingleFile}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary btn-block"
        onClick={upload}
      >
        Upload
      </button>
    </form>

    <h3> Upload single with delete</h3>
         
         <form>
            <div className="form-group preview">
                {files.length > 0 &&
                files.map((item, index) => {
                    return (
                    <div key={item} className="img_show">
                        <span id="close" onClick={() => deleteFiles(index)}>X</span>
                        <img src={item} alt="" width="120px" height="120px"/>
                    </div>
                    );
                })}
            </div>

            <div className="form-group">
                <input
                type="file"
                disabled={files.length === 5}
                className="form-control"
                onChange={uploadSingleFiles}
                />
            </div>
            <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={uploads}
            >
                Upload single with delete
            </button>
            </form>
    </>
    )
}

/* import React, { Component } from 'react';

export default class SingleImageUploadComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            file: null
        }
        this.uploadSingleFile = this.uploadSingleFile.bind(this)
        this.upload = this.upload.bind(this)
    }

    uploadSingleFile(e) {
        this.setState({
            file: URL.createObjectURL(e.target.files[0])
        })
    }

    upload(e) {
        e.preventDefault()
        console.log(this.state.file)
    }

    render() {
        let imgPreview;
        if (this.state.file) {
            imgPreview = <img src={this.state.file} alt='' width="120px" height="120px"/>;
        }
        return (
            <form>
                <div className="form-group preview">
                    {imgPreview}
                </div>

                <div className="form-group">
                    <input type="file" className="form-control" onChange={this.uploadSingleFile} />
                </div>
                <button type="button" className="btn btn-primary btn-block" onClick={this.upload}>Upload</button>
            </form >
        )
    }
} */