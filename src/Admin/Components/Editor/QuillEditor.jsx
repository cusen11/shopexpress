import React, { useRef } from 'react'; 
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill'; 
import axios from 'axios';

import Quill from 'quill'; 
 


function QuillEditor(props) {
    const { urlAPI } = props
    let quillRef = useRef(null)
    let inputOpenImageRef = useRef() 
    const imageHandler = () => {
        inputOpenImageRef.current.click() 
    } 
    const insertImage = (e) => {  
        const quill = quillRef.getEditor()
        var range = quill.getSelection()  
        const formUpload = new FormData()
        formUpload.append('file', e.target.files[0])
        formUpload.append('upload_preset', 'iiyoqzoi')
        formUpload.append('cloud_name', 'senclound') 

        axios.post(urlAPI,formUpload)
        .then(async res=>{   
            quill.insertEmbed(range.index + 1, 'image', res.data.secure_url);
        }) 
        .catch(err => console.log(err))  
    }
 
    const modules = { 
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
        }, 
        toolbar: {
            container:  [
                [{ 'header': [1, 2, false] }],
                ['bold', 'italic', 'underline','strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                'image': imageHandler
            }
        } 
    } 
    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'color','image'
    ] 

    const onChangeContent = (content, delta, source, editor) =>{ 
        props.onChangeEditor(content)
    }  
    return (
        <>
            <input type="file" accept="image/*" ref={inputOpenImageRef} style={{ display: "none" }} onChange={insertImage} />
            <div className="text-editor"> 
                <ReactQuill theme="snow"
                            modules={modules}
                            formats={formats}
                            onChange = {onChangeContent} 
                            ref={(el) => { quillRef = el }}
                            >
                            
                </ReactQuill>            
            </div>
        </>
    );
}

export default QuillEditor;