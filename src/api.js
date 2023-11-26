async function query(data) {
    const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
            headers: {
                "Accept": "image/png",
                "Authorization": `Bearer ${process.env.REACT_APP_AUTHORIZATION_TOKEN}`,
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    const result = await response.blob();
    return result;
}

async function uploadToImgur(imgBlob){
    const postData = {
        image: imgBlob,
        type: "base64",
        title: "testing"
    }
    const response = await fetch(
        "https://api.imgur.com/3/upload",
        {
            headers: {
                "Authorization": `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
            },
            method: "POST",
            body: JSON.stringify(postData),
            // formData: JSON.stringify(postData)
        }
    )
    const result = await response.json();
    return result;
}

// let blob = query({"imputs": "A cute dog"})

export { uploadToImgur, query };