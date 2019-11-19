import React, {useCallback , useState} from 'react'
import {useDropzone} from 'react-dropzone'
import classes from "./FileDropper.module.css";

const FileDroper = (props) => {
  const [geoJSON, setJeoJSON] = useState({features: [{geometry: {type: "point"}}]});
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {

        const binaryStr = reader.result;
        let data = JSON.parse(binaryStr)
        setJeoJSON(data);
        props.getData(data);
        // console.log(data);
      }
      reader.readAsText(file);
    })
    
  }, [props])
  const {getRootProps, getInputProps} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p className={classes.dropper}><span className={classes.inputLine}>Drag 'n' drop GeoJSON files here, or click to select files from your system.</span></p>
    </div>
  )
}
export default FileDroper;