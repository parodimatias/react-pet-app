import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import css from "./style.css";
const thumbsContainer: any = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const thumb: any = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
};

const img = {
  display: "block",
  width: "auto",
  height: "100%",
};

export function Dropzone(props) {
  const [files, setFile] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      const processedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFile(processedFiles);
      props.callback(processedFiles);
    },
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  //   useEffect(() => {
  //     // Make sure to revoke the data uris to avoid memory leaks
  //     files.forEach((file) => URL.revokeObjectURL(file.preview));
  //   }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: css["dropzone"] })}>
        <input {...getInputProps()} />
        <span className={css["dropzone-text"]}>
          Drag 'n' drop some files here, or click to select files
        </span>
      </div>
      <aside style={thumbsContainer as any}>{thumbs}</aside>
    </section>
  );
}
