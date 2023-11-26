import './App.css';
import {
    createTheme,
    ThemeProvider,
} from "@mui/material";
import FormComic from "./FormComic";
import FormImage from "./FormImage";
import {useState} from "react";
import query from "./api";


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});


function App() {
    const [numImages, setNumImages] = useState(0);
    const [imgIds, setImgIds] = useState(1);
    let [imageArr, setImageArr] = useState({});

    const updateText = async (text, index) => {
        let imgObj = {...imageArr[index], isLoading: true, text: text};
        // using anon functions to update state
        setImageArr(prevState => {
            let newState = {...prevState};
            newState[index] = imgObj;
            return newState;
        });
        const response = await query({"inputs": text});
        const imageUrl = URL.createObjectURL(response);
        imgObj["isLoading"] = false;
        imgObj["url"] = imageUrl;
        setImageArr(prevState => {
            let newState = {...prevState};
            newState[index] = imgObj;
            return newState;
        });
    }

    const generateImage = async (text) => {
        // incrementing image ids
        const imagePos = imgIds;
        setImgIds(prevState => prevState + 1);
        let imageObj = {"text": text, "url": "", "isLoading": true};
        setImageArr(prevState => {
            let newState = {...prevState};
            newState[imagePos] = imageObj;
            return newState;
        });
        const response = await query({"inputs": text});
        const imageUrl = URL.createObjectURL(response);
        imageObj["isLoading"] = false;
        imageObj["url"] = imageUrl;
        setImageArr(prevState => {
            let newState = {...prevState};
            newState[imagePos] = imageObj;
            return newState;
        });
        setNumImages(prevState => prevState + 1);
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
        return <FormImage imgObj={value}  key={key} imageIndex={key}  deleteImage={deleteImage} updateText={updateText}/>
    })

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={"img-box"}>
                {comicImages}
            </div>
            <div className={"text-flex"}>
                <FormComic updateText={updateText} key={0} formIndex={0} generateImg={generateImage}/>
            </div>
        </ThemeProvider>
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