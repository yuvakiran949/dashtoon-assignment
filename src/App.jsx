import './App.css';
import {
    Skeleton,
    IconButton,
    Card,
    CardMedia,
    CardActions,
    CardContent,
    createTheme,
    ThemeProvider,
    styled,
    useMediaQuery,
} from "@mui/material";
import FormComic from "./FormComic";
import {useState} from "react";
import query from "./api";
import {Delete} from "@mui/icons-material";
import EditText from "./EditImage";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});



// card content with no padding
const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

function FormImage({imageIndex, deleteImage, imgObj, updateText}) {
    // trying to make a responsive design
    const matches = useMediaQuery('(min-width:600px)');
    const imgSize = matches ? 512 : 256;
    const imgBlob = imgObj["url"];
    const imgText = imgObj["text"];
    const isLoading = imgObj["isLoading"];
    const loadingEle = <Skeleton variant="rectangular" width={imgSize} height={imgSize} animation="wave" />;
    // objectfit contain to keep aspect ratio
    const imgEle = <CardMedia image={imgBlob} height={imgSize} component="img"/>;
    const imgRend = isLoading ? loadingEle : imgEle;

    return (
        <Card sx={{maxWidth: 512}}>
            {imgRend}
            <CardContentNoPadding>
                {imgText}
            </CardContentNoPadding>
            <CardActions>
                <EditText imgIndex={imageIndex} imgObj={imgObj} updateText={updateText}/>
                <IconButton onClick={() => deleteImage(imageIndex)}>
                    <Delete />
                </IconButton>
            </CardActions>
        </Card>
    )
}


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