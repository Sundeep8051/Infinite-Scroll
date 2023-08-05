const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

let totalImages = 0;
let imagesLoaded = 0;
let ready = false;

function onImageLoad(){
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded == totalImages)
        {
            ready = true;
            loader.hidden = true;
        }
}

let photosArray = [];
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        //item.setAttribute('href', photo.links.html);
        //item.setAttribute('target', '_blank');
        setAttributes(item, {
            href:photo.links.html,
            target: '_blank'
        })

        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);

        setAttributes(img, {
            src:photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        });

        img.addEventListener('load', onImageLoad);

        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

const count = 30;
const apiKey = ""; //replace with api key

const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    }
    catch(error){
        alert(error);
    }
}

function fetchImages(){
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)
    {
        console.log("load");
        ready = false;
        getPhotos();
    }
}

window.addEventListener('scroll', fetchImages);
getPhotos();