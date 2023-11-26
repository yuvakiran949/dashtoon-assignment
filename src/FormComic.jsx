import {useRef, useState} from "react";
import {IconButton, InputBase, Paper} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";

function FormComic({updateText, formIndex, generateImg}) {
    let textInput = useRef(null);
    const handleSubmit = (event) => {
        // hasSubmitted = true;
        event.preventDefault();
        // console.log(text);
        generateImg(textInput.current.value);
        textInput.current.value = "";
    }
    return (
        <div className="text-box">
            <Paper
                component="div"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    id={"text"}
                    name={"text"}
                    placeholder="Enter text to generate image"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    // onChange={handleChange}
                    inputRef={textInput}

                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSubmit}>
                    <DoneIcon />
                </IconButton>
            </Paper>
        </div>

    );
}

export default FormComic;