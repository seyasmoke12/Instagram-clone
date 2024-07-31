import { useState } from 'react';
import useShowToast from './toosts';

function usePreviewImg() {
    const [selectedFile, setSelectedFile] = useState(null);
    const maxFileSizeInBytes = 2 * 1024 * 1024; // 2MB
    const show = useShowToast();
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            if (file.size > maxFileSizeInBytes) {
                show("Error", "File size must be less than 2MB", "error");
                setSelectedFile(null);
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            show("Error", "Please select an image file", "error");
            setSelectedFile(null);
        }
    };

    return { selectedFile, handleImageChange, setSelectedFile };
}

export default usePreviewImg;











// import { useState } from 'react'

// function usePreviewimg() {
    
//         const {selectedFile,setSelectedFile} = useState(null)
//         const maxFileSizeInBytes  = 2 * 1024 //2mb
//         const handleImageChange = (e) =>{
//             const file = e.target.files[0]
//             if(file && file.type.startsWith("image/")){
//                 if(file.size > maxFileSizeInBytes){
//                     alert('file size must be less than 2mb')
                    
//                     setSelectedFile(null)
//                     return
//                 }
//                 const reader =new FileReader()
//                 reader.onloadend = () =>{
//                     setSelectedFile(reader.result)
//                 }
//                 reader.readAsDataURL(file)
//             }else{
//                 alert('please select upload an image file')
//                 setSelectedFile(null)
//             }
//         }
// return{selectedFile,handleImageChange,setSelectedFile}
// }

// export default usePreviewimg