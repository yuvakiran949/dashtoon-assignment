import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    Skeleton,
    styled,
    useMediaQuery
} from "@mui/material";
import {Delete, Replay} from "@mui/icons-material";
import EditText from "./EditImage";

// const CardContentNoPadding = styled(CardContent)(`
//   padding: 0;
//   &:last-child {
//     padding-bottom: 0;
//   }
// `);

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
        <Card sx={{maxWidth: imgSize}}>
            {imgRend}
            <Box sx={{display: "flex", flexDirection: "row"}}>
                <CardContent>
                    {imgText}
                </CardContent>
                <CardActions sx={{marginLeft: "auto"}}>
                    <EditText imgIndex={imageIndex} imgObj={imgObj} updateText={updateText}/>
                    <IconButton onClick={() => updateText(imgText, imageIndex)}>
                        <Replay/>
                    </IconButton>
                    <IconButton onClick={() => deleteImage(imageIndex)}>
                        <Delete />
                    </IconButton>
                </CardActions>
            </Box>
        </Card>
    )
}

export default FormImage;