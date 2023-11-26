import {useRef} from "react";
import {IconButton, InputBase, Paper} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import {Share} from "@mui/icons-material";

function FormComic({updateText, formIndex, generateImg, handleShare}) {
    // using media query to make responsive design
    // const matches = useMediaQuery('(min-width:600px)');
    // const inputSize = matches ? "512" : "80%";
    let textInput = useRef(null);
    const handleSubmit = () => {
        // hasSubmitted = true;
        // console.log(text);
        generateImg(textInput.current.value);
        textInput.current.value = "";
    }

    return (
            <Paper
                component="div"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: "80%",
                    position: "fixed", bottom: "20px", maxWidth: "512px"}}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    id={"text"}
                    name={"text"}
                    placeholder="Enter text to generate image"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    // onChange={handleChange}
                    inputRef={textInput}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmit();
                        }
                    }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit}>
                    <DoneIcon />
                </IconButton>
                <IconButton onClick={handleShare}>
                    <Share />
                </IconButton>
            </Paper>

    );
}

export default FormComic;