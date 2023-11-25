import './App.css';
import {TextField, IconButton, Grid, ImageList, ImageListItem, CircularProgress} from "@mui/material";
import DoneIcon from '@mui/icons-material/Done';
import {useEffect, useState} from "react";
import query from "./api";


function FormComic({updateText, formIndex}) {
    function handleSubmit(event) {
        // hasSubmitted = true;
        event.preventDefault();
        const text = event.target.elements.text.value;
        // console.log(text);
        updateText(text, formIndex);
    }

    return (
        <div className="text-box">
            <form onSubmit={handleSubmit}>
                <TextField id="text"/>
                <IconButton type="submit">
                    <DoneIcon/>
                </IconButton>
            </form>
        </div>

    );
}
function FormImage({imgBlob, getImage, imageIndex}) {

    return (
        <ImageListItem key={imageIndex} className="image-list-item">
            <img src={imgBlob} loading="lazy" alt="generated using prompt"/>
        </ImageListItem>
    )
}

function Slider(){

}

function App() {
    const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [textArr, setTextArr] = useState(Array(10).fill(""))
    let [imageArr, setImageArr] = useState({})

    const updateText = async (text, index) => {
        // console.log(text);
        // console.log(index);
        setTextArr(prevState => {
            let newState = [...prevState];
            newState[index] = text;
            return newState;
        });
        await updateImage(index, text);
    }

    const updateImage = async (imagePos, text) => {
        setImageArr(prevState => {
            let newState = {...prevState};
            newState[imagePos] = "public/giphy.webp";
            return newState;
        });
        const response = await query({"inputs": text});
        const imageUrl = URL.createObjectURL(response);
        setImageArr(prevState => {
            let newState = {...prevState};
            newState[imagePos] = imageUrl;
            return newState;
        });
    }


    const comicForms = ids.map((id) => {
        return <FormComic updateText={updateText} key={id} formIndex={id}/>
    })
    const comicImages = Object.entries(imageArr).map(([key, value]) => {
        return <FormImage imgBlob={value} key={key} imageIndex={key}/>
    })

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                {comicForms}
            </Grid>
            <Grid item>
                <ImageList>
                    {comicImages}
                </ImageList>
            </Grid>
        </Grid>
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