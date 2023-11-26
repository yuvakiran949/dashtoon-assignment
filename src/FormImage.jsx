// card content with no padding
import {Card, CardActions, CardContent, CardMedia, IconButton, Skeleton, styled, useMediaQuery} from "@mui/material";
import {Delete} from "@mui/icons-material";
import EditText from "./EditImage";

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

export default FormImage;