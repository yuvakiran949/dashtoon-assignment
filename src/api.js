async function query(data) {
    const response = await fetch(
        "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud",
        {
            headers: {
                "Accept": "image/png",
                "Authorization": "Bearer VknySbLLTUjbxXAXCjyfaFIPwUTCeRXbFSOjwRiCxsxFyhbnGjSFalPKrpvvDAaPVzWEevPljilLVDBiTzfIbWFdxOkYJxnOPoHhkkVGzAknaOulWggusSFewzpqsNWM",
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
        "image": imgBlob
    }
    const response = await fetch(
        "https://api.imgur.com/3/image",
        {
            headers: {
                "Authorization": "Client-ID {{clientId}}"
            },
            method: "POST",
            body: postData
        }
    )
    const result = await response.json();

    const shareURL = result.data.link;
    return shareURL;
}

// let blob = query({"imputs": "A cute dog"})

export { uploadToImgur, query };