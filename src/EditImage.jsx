import {Box, IconButton, Modal, TextField} from "@mui/material";
import {Close, Done, Edit} from "@mui/icons-material";
import {useRef, useState} from "react";

// style for edit text popup
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 1,
};


function EditText({imgIndex, imgObj, updateText}) {
    let textInput = useRef(null);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handleSubmit = () => {
        updateText(textInput.current.value, imgIndex);
        handleClose();
    }

    return (
        <div>
            <IconButton onClick={handleOpen}>
                <Edit />
            </IconButton>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={style}>
                    <TextField
                        id={"updated-text"}
                        variant={"standard"}
                        inputRef={textInput}
                        placeholder={"Enter the new prompt"}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSubmit();
                            }
                        }}
                    />
                    <IconButton
                        onClick={handleSubmit}
                    >
                        <Done />
                    </IconButton>
                    <IconButton onClick={handleClose}>
                        <Close />
                    </IconButton>
                </Box>
            </Modal>
        </div>

    )
}

export default EditText;