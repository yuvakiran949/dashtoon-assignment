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

function SnackBarBasic({imageIndex, imageText, deleteImage, open, setOpen, errMsg}){
    return (
        <Snackbar
            open={open}
            autoHideDuration={4000}
            onClose={() => setOpen(false)}
        >
            <Alert onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
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
            setImageArr(prevState => {
                let newState = {...prevState};
                newState[index] = imgObj;
                return newState;
            });
        }
    }

    const errorHandling = (text) => {
        if (text === "") {
            setErrMsg("The prompt cannot be empty")
            setOpen(true)
            return false;
        }else if (Object.keys(imageArr).length > 10){
            setErrMsg("You can only generate 10 images at a time")
            setOpen(true)
            return false;
        }else{
            return true;
        }
    }
    const getImageWithErrHandling = async (text) => {
        try {
            const response = await query({"inputs": text});
            return URL.createObjectURL(response);
        }catch(error){
            setErrMsg("An error occurred while generating the image")
            setOpen(true)
            console.log(error)
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

    return (
        <Box>
            <div className={"img-box"}>
                {comicImages}
            </div>
            <div className={"text-flex"}>
                <FormComic updateText={updateText} key={0} formIndex={0} generateImg={generateImage}/>
            </div>
            <SnackBarBasic open={open} setOpen={setOpen} errMsg={errMsg}/>
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