import './App.css';
import {
    Alert,
    Box,
    createTheme, Snackbar,
} from "@mui/material";
import FormComic from "./FormComic";
import FormImage from "./FormImage";
import {useState} from "react";
import {query, uploadToImgur} from "./api";
import mergeImages from "merge-images";



function SnackBarBasic({imageIndex, imageText, deleteImage, open, setOpen, errMsg, type}){
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(false)}
        >
            <Alert onClose={() => setOpen(false)} severity={type} sx={{ width: '100%' }}>
                {errMsg}
            </Alert>
        </Snackbar>
    )
}

function App() {
    const [numImages, setNumImages] = useState(0);
    const [imgIds, setImgIds] = useState(1);
    const [open, setOpen] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [errType, setErrType] = useState("info");
    let [imageArr, setImageArr] = useState({});

    const updateText = async (text, index) => {
        if (errorHandling(text)){
            let imgObj = {...imageArr[index], isLoading: true, text: text};
            // using anon functions to update state
            setImageArr(prevState => {
                let newState = {...prevState};
                newState[index] = imgObj;
                return newState;
            });
            const imageUrl = await getImageWithErrHandling(text)
            imgObj["isLoading"] = false;
            imgObj["url"] = imageUrl;
            //TODO handle for when image is deleted while it is still being fetched
            setImageArr(prevState => {
                let newState = {...prevState};
                newState[index] = imgObj;
                return newState;
            });
        }
    }

    const errorHandling = (text) => {
        if (text === "") {
            showErrorMessage("The prompt cannot be empty", "error");
            return false;
        }else if (Object.keys(imageArr).length >= 10){
            showErrorMessage("You can only generate/have 10 images at a time", "error");
            return false;
        }else{
            return true;
        }
    }

    const showErrorMessage = (text, type) => {
        setOpen(true)
        setErrMsg(text);
        setErrType(type);
    }

    const getImageWithErrHandling = async (text) => {
        try {
            const response = await query({"inputs": text});
            return URL.createObjectURL(response);
        }catch(error){
            showErrorMessage("An error occurred while generating the image", "error");
            console.log(error);
        }
    }

    const generateImage = async (text) => {
        if (errorHandling(text)) {
            setNumImages(prevState => prevState + 1);
            // incrementing image ids
            const imagePos = imgIds;
            setImgIds(prevState => prevState + 1);
            let imageObj = {"text": text, "url": "", "isLoading": true};
            setImageArr(prevState => {
                let newState = {...prevState};
                newState[imagePos] = imageObj;
                return newState;
            });
            const imageUrl = await getImageWithErrHandling(text)
            imageObj["isLoading"] = false;
            imageObj["url"] = imageUrl;
            //TODO handle for when image is deleted while it is still being fetched
            setImageArr(prevState => {
                let newState = {...prevState};
                newState[imagePos] = imageObj;
                return newState;
            });
        }
    }

    const deleteImage = (imageIndex) => {
        setImageArr(prevState => {
            let newState = {...prevState};
            delete newState[imageIndex];
            return newState;
        });
        setNumImages(prevState => prevState - 1);
    }
    // imgBlob={value["url"]} imgText={value["text"]} isLoading={value["isLoading"]}
    const comicImages = Object.entries(imageArr).map(([key, value]) => {
        return (
            // a separate div for padding as the card elements are getting wonky with direct padding
            <div style={{padding: 5}} key={key}>
                <FormImage imgObj={value} imageIndex={key}  deleteImage={deleteImage} updateText={updateText}/>
            </div>
        )
    })

    const handleShare = async () => {
        let count = 0;
        const mergeArr = Object.entries(imageArr).map(([key, value]) => {
            if(value["url"] !== ""){return {src: value["url"], x: 0, y: count++ * 512};}
        })
        const mergeImg = await mergeImages(mergeArr);
        const response = await uploadToImgur(mergeImg);
        if(response["success"]){
            await navigator.clipboard.writeText(response["data"]["link"]);
            showErrorMessage("The link has been copied to your clipboard", "success");
        }else{
            showErrorMessage("An error occurred while uploading the image to Imgur", "error");
        }

    }

    return (
        <Box>
            <div className={"img-box"}>
                {comicImages}
            </div>
            <div className={"text-flex"}>
                <FormComic updateText={updateText} key={0} formIndex={0} generateImg={generateImage} handleShare={handleShare}/>
            </div>
            <SnackBarBasic open={open} setOpen={setOpen} errMsg={errMsg} type={errType}/>
        </Box>
  );
}

export default App;
// <div className="app-body">
//     <div className="forms-list">
//         {comicForms}
//     </div>
//     <div className="image-list">
//         {comicImages}
//     </div>
// </div>
// <Grid container spacing={2}>
//     <Grid item xs={2}>
//         {comicForms}
//     </Grid>
//     <Grid item>
//         <ImageList>
//             {comicImages}
//         </ImageList>
//     </Grid>
// </Grid>