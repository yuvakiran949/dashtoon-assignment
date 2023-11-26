Note: The App is hardcoded to have a maximum of 10 images. This can be changed by changing the `REACT_APP_MAX_IMAGES` environment variable.

# Installation
1. Clone the repository
2. set the environment variables `REACT_APP_MAX_IMAGES`, `REACT_APP_IMGUR_CLIENTID` and `REACT_APP_AUTHORIZATION_TOKEN` to appropriate values
3. Run `npm install`
4. Run `npm start`
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser

# Implemented Features
- Edit the prompt text to regenerate images
- Regenerate images with the same prompt text
- Delete an image
- Share button directly uploads the image to Imgur and copies the link to clipboard
- Download button downloads the images to the local machine