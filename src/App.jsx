import './App.css';
import {TextField, Button} from "@mui/material";
import {useState} from "react";



function FormComic() {
    const [text, setText] = useState("");

    function handleSubmit(event) {
        // hasSubmitted = true;
        setText(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField/>
            <Button type="submit">Hello</Button>
        </form>
    );
}

function afterSubmit(){

}

function App() {
    return (
    <div className="App">
      <header className="App-header">
        <FormComic/>
      </header>
    </div>
  );
}

export default App;
