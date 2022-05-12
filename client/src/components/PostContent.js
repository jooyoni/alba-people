
import React, { useMemo, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const PostContent = ({value, setValue, editThumb}) =>
 {
  const quillRef = useRef();
  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click(); 
    input.addEventListener('change', async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append('img', file); 
      try {
        const result = await axios.post('http://localhost:5000/img', formData);
        editThumb(result.data.url.split("uploads/")[1]);
        const IMG_URL = result.data.url;
        const editor = quillRef.current.getEditor(); 
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', IMG_URL);
      } catch (error) {
        console.log('실패했어요ㅠ');
      }
    });
  };
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ['image'],
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    };
  }, []);
  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'image',
  ];

  return (
    <>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        placeholder="내용을 입력해주세요."
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        style={{height:"400px"}}
      />
    </>
  );
};

export default PostContent;