/*  
    This program is written for Microsoft Engage 2022 Mentorship Program by Shishir Bhalerao.
    As the main theme of my project is based on Face Recogintion, this program prevents crime using it.
    The functionality of fuctions are explained with proper Comments and Documentation,
    also proper indentation, code grouping, naming convention and line length are followed which
    helps to understand code easily.
*/

//Declaring some HTML Elements with global scope as they will be used multiple times and 
// declaring them as const (constant) as no modification is required for them.

const video = document.getElementById('videoInput');
const saved = document.getElementById('saved');
const livestream = document.getElementById('livestream');
const youtubestream = document.getElementById('youtubestream');
const image_input = document.querySelector('#image_input');
const image_name = document.querySelector('#image_name');
const video_input = document.querySelector('#upload_video');
const defaultBtn = document.querySelector('#image_input');
const customBtn = document.querySelector('#custom-btn');

// Declaring global varibles which will be used multiple times and with variant values.

var suspectsUploadName = new Array(); // Array to store Name of the Suspects.
var suspectsUploadLength = new Array(); //Array to store number of images of the Suspects.
var imagesUploaded = new Map(); // Map to store images of the Suspects.
let no_of_suspects = -1;
let leastImgUploaded = -1;
var uploadImg = "";
var canvas;

// Some Styling for HTML ddocument (like pop-up).
document.getElementById('pop-up').addEventListener('click', function () {
    document.querySelector('.bg-modal').style.display = 'flex';
    document.querySelector('.banner').style.filter = 'blur(10px)';
    document.querySelector('.fade').style.filter = 'blur(2px)';
});

document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('.bg-modal').style.display = 'none';
    document.querySelector('.banner').style.filter = 'none';
    document.querySelector('.fade').style.filter = 'none';
});

document.getElementById('saved').addEventListener('click', function () {
    /*
        Before allowing the user to select a video a stream,
        checking if atleast a suspect name and a image is uploaded. 
    */
    if (no_of_suspects == -1) {
        alert("First Please Upload the credentials.");
    }
    else {
        document.querySelector('.bg-modal-video').style.display = 'flex';
        document.querySelector('.fade').style.filter = 'blur(2px)';
        document.querySelector('.banner').style.filter = 'blur(10px)';
    }
});
document.getElementById('close-video').addEventListener('click', function () {
    document.querySelector('.bg-modal-video').style.display = 'none';
    document.querySelector('.banner').style.filter = 'none';
    document.querySelector('.fade').style.filter = 'none';
});
document.getElementById('close-video-show').addEventListener('click', function () {
    document.querySelector('.bg-videoshow').style.display = 'none';
    document.querySelector('.videoshow').style.display = 'none';
    document.querySelector('.banner').style.filter = 'none';
    document.querySelector('.fade').style.filter = 'none';
});

// This function is to active the button to upload image of the suspect from HTML document.
function defaultBtnActive() {
    var nameInput = document.getElementById('image_name').value;
    /*
        First a condition to check if the name is entered or not.
    */
    if (nameInput.length == 0) {
        alert('Please Enter A Valid Name First.');
    }
    else defaultBtn.click();
}

//This function is to trigger the button to upload video from HTML document.
function uploadButtonActive() {
    video_input.click();
}

/*
    This function take the names which are give by the user,
    after checking all the conditions it stores name in the "suspectsUploadName" array.
    This fucntion is called directly from the HTML document.
*/
function nameinputFunction() {
    var nameInput = document.getElementById('image_name').value;
    // Firstly it checkes if atleast one image is uploaded. 
    if (leastImgUploaded == -1) {
        alert('First Please Select Atleast One Image of the Suspect');
    }
    // Then also it checks if the name is also inputed or not.
    else if (nameInput.length == 0) { 
        alert('Please Enter A Valid Name.');
    }
    else {
        no_of_suspects = no_of_suspects + 1;
        console.log(nameInput);
        suspectsUploadName.push(`${nameInput}`);
        document.querySelector('.bg-modal').style.display = 'none';
        document.querySelector('.banner').style.filter = 'none'
        document.querySelector('.fade').style.filter = 'none';
    }
}

/*
    This event is taken after images are uploaded by the user ,
    after checking all the conditions the function stores images in the "imagesUploaded" map.
*/
image_input.addEventListener("change", (e) => {
    leastImgUploaded = 1;
    // So first we check if the browser supports the File API (almost all browser supports).
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const files = e.target.files;
        var nameInput ;
        let resultInput;
        // Now iterating the number of files and saving them.
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match("image")) continue;
            const picReader = new FileReader();
            // So as the file is loaded to the picReader.
            picReader.addEventListener("load", () => {
                nameInput = document.getElementById('image_name').value;
                resultInput = nameInput.concat(`${i}`);
                /* 
                    Now Saving the Images Inputed with the format of "suspectName+indexNumber"
                    in the "imagesUploaded" map.
                */
                imagesUploaded.set(`${resultInput}`, picReader.result);
                console.log(picReader.result);
            })
            picReader.readAsDataURL(files[i]);
        }
        nameInput = document.getElementById('image_name').value;
        resultInput = nameInput.concat(`${files.length}`);
        // Now storing name+length in "suspectsUploadLength" array.
        suspectsUploadLength.push(`${resultInput}`);
        console.log(suspectsUploadLength);
    }
    else {
        alert("Your Browser Does Not Support File API");
    }
})

/* 
    Here is the main API which is used i.e. Face API.js. 
    So we are loading Face API.js's models which will help us to load and recognize faces.
    I have downloaded this models (in ./models folder) and 
    all Face API's pre-requisite files(in ./js folders). 
    I learned this from the following Git Document:
    https://justadudewhohacks.github.io/face-api.js/docs/index.html  
*/

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
]).then().catch((error) => {
    console.log('handled');
    location.reload(true);
});


/*
    Now the following two EventListener and one function that are for invoking our main fucntion,
    these selects any one of the stream i.e. either LiveStream, Youtube Stream and Uploaded Video.
*/
livestream.addEventListener('click', function (e) {
    document.querySelector('.bg-videoshow').style.display = 'flex';
    document.querySelector('.banner').style.filter = 'blur(10px)';
    document.querySelector('.fade').style.filter = 'blur(2px)';
    // Calling the start function that will select video source as web cam video.
    start()
});
youtubestream.addEventListener('click', function (e) {
    var ytlink = document.getElementById('ytlink').value;
    console.log(ytlink);
    // Setting video source to the youtube link.
    video.src = `${ytlink}`;
    document.querySelector('.bg-videoshow').style.display = 'flex';
    document.querySelector('.banner').style.filter = 'blur(10px)';
    document.querySelector('.fade').style.filter = 'blur(2px)';
    // Now calling our main Function.
    recognizeFaces();
})

// Function to select the video stream as uploaded video.
function selectedVid(self) {
    var file = self.files[0];
    var reader = new FileReader();
    // Setting our video src to the viddeo uploaded by the user.
    reader.onload = function (e) {
        var src = e.target.result;
        console.log('src');
        video.setAttribute("src", src);
        console.log('video ki src' + video.src);
    }
    reader.readAsDataURL(file);
    document.querySelector('.bg-videoshow').style.display = 'flex';
    document.querySelector('.banner').style.filter = 'blur(10px)';
    document.querySelector('.fade').style.filter = 'blur(2px)';
    document.querySelector('.videoshow').style.display = 'flex';
    // Now calling our main Function.
    recognizeFaces();
}

// Function to set live option in video stream.
function start() {
    document.querySelector('.videoshow').style.display = 'flex';
    //Setting our videi=o source to WebCam / Live Video.
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.log(err)
    )
    // Now calling our main Function.
    recognizeFaces();
}

async function recognizeFaces() {
    const suspectedDescriptors = await loadUploadImagesLength();
    const faceMatcher = new faceapi.FaceMatcher(suspectedDescriptors, 0.6);
    alert('Now you can play');
    video.addEventListener('play', () => {
        console.log('playing');

        canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        let intervalID = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor);
            })
            var flag = 1
            results.forEach((result, i) => {
                const box = resizedDetections[i].detection.box;
                console.log('canvas is drawing');
                let weGot = result.toString();
                if (weGot[0] == 'S') {
                    console.log(result.toString());
                    flag = 0;
                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
                    drawBox.draw(canvas);
                    return;
                }
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
                drawBox.draw(canvas);
            })

            if (flag == 0) {
                return;
            }
        }, 100);
        document.getElementById('close-video-show').addEventListener('click', function () {
            console.log('hello done');
            clearInterval(intervalID);
            video.pause();
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
            video.src = "";
            return;
        })
        document.getElementById('close-video').addEventListener('click', function () {
            console.log('hello done');
            clearInterval(intervalID);
            video.pause();
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
            video.src = "";
            return;
        })
        document.querySelector('.close').addEventListener('click', function () {
            console.log('hello done');
            clearInterval(intervalID);
            video.pause();
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
            video.src = "";
            return;
        })
    })
}

function loadUploadImagesLength() {
    return Promise.all(
        suspectsUploadLength.map(async (suspect) => {
            const descriptions = [];
            var len = parseInt(suspect[suspect.length - 1]);
            console.log(len);
            var suspect_real = suspect.substring(0, suspect.length - 1);
            console.log(suspect_real);
            for (let i = 0; i < len; i++) {
                var nameInput = suspect_real;
                let resultInput = nameInput.concat(`${i}`);

                const img = await faceapi.fetchImage(imagesUploaded.get(`${resultInput}`));
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections.descriptor);
            }

            console.log(suspect_real + ' Faces Loaded|' + 'haa bhai sahi mein hogya');
            return new faceapi.LabeledFaceDescriptors(suspect_real, descriptions);
        })
    )
}