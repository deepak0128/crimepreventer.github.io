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
const imageInput = document.querySelector('#image_input');
const imageName = document.querySelector('#image_name');
const videoInput = document.querySelector('#upload_video');
const defaultBtn = document.querySelector('#image_input');
const customBtn = document.querySelector('#custom-btn');

// Declaring global varibles which will be used multiple times and with variant values.

var suspectsUploadName = new Array(); // Array to store Name of the Suspects.
var suspectsUploadLength = new Map(); //Map to store number of images of the Suspects.
var imagesUploaded = new Map(); // Map to store images of the Suspects.
let numberOfSuspects = -1;
let leastImgUploaded = -1;
var uploadImg = "";
var canvas;

document.getElementById('saved').addEventListener('click', function () {
    /*
        Before allowing the user to select a video a stream,
        checking if atleast a suspect name and a image is uploaded. 
    */
    if (numberOfSuspects == -1) {
        alert("First Please Upload the credentials.");
    }
    else {
        document.querySelector('.bg-modal-video').style.display = 'flex';
        document.querySelector('.fade').style.filter = 'blur(2px)';
        document.querySelector('.banner').style.filter = 'blur(10px)';
    }
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
    videoInput.click();
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
        numberOfSuspects = numberOfSuspects + 1;
        console.log('Suspect Inputed Name : '+nameInput);
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
imageInput.addEventListener("change", (e) => {
    leastImgUploaded = 1;
    // So first we check if the browser supports the File API (almost all browser supports).
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const files = e.target.files;
        var nameInput ;
        let resultInput;
        console.log(files.length)
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
                // console.log(`Image Loaded of ${resultInput} to :`+picReader.result);
            })
            picReader.readAsDataURL(files[i]);
        }
        nameInput = document.getElementById('image_name').value;
        // Now storing name+length in "suspectsUploadLength" array.
        suspectsUploadLength.set(`${nameInput}`,files.length)
        console.log('Name stores in our required Case: '+files.length);
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

try {
    faceapi.nets.faceRecognitionNet.loadFromUri('./models');
} catch (error) {
    console.log('Error Handled');
    location.reload(true);
}

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
]).then().catch((error) => {
    console.log('Error Handled');
    location.reload(true);
});


/*
    Now the following two EventListener and one function that are for invoking our main fucntion,
    these selects any one of the stream i.e. either LiveStream, Youtube Stream and Uploaded Video.
*/
livestream.addEventListener('click', function (e) {
    document.querySelector('.bg-videoshow').style.display = 'flex';
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
        video.setAttribute("src", src);
        console.log('Video uploaded !');
    }
    reader.readAsDataURL(file);
    document.querySelector('.bg-videoshow').style.display = 'flex';
    document.querySelector('.videoshow').style.display = 'flex';
    // Now calling our main Function.
    recognizeFaces();
}

// Function to set live option in video stream.
function start() {
    document.querySelector('.videoshow').style.display = 'flex';
    //Setting our video source to WebCam / Live Video.
    navigator.getUserMedia(
        { video: {} },
        stream => {
            video.srcObject = stream
            window.localStream = stream;
        },
        err => console.log('WebCam Error: '+err)
    )
    // Now calling our main Function.
    recognizeFaces();
}

/*
    This function "recognizeFaces()" is our main function which will recognize the face of the suspect,
    first it calls the a fucntion "loadUploadImagesLength()", then after recieving the data it matches 
    with the video stream through different function provided by Face API.
*/
async function recognizeFaces() {
    // So first it calls the "loadUploadImagesLength()" fucntion and stores its data. 
    const suspectedDescriptors = await loadUploadImagesLength();
    const faceMatcher = new faceapi.FaceMatcher(suspectedDescriptors, 0.6);
    alert('Now you can play');
    // So the event is triggered when the play button is hit.
    video.addEventListener('play', () => {
        console.log('Playing the Video Stream.');
        // So now a canvas is made from video trhough function provided by Face API.
        canvas = faceapi.createCanvasFromMedia(video);
        document.body.append(canvas);
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize); // Dimension are matched w.r.t. video dimensions.

        /*
            So now we have a setInterval function with the timer of 100 miliseconds,
            it first matches all the faces in video through the "detectAllFaces(parameters)" function,
            with their landmarks by "withFaceLandmarks()" and with "withFaceDescriptors()".
        */
        let intervalID = setInterval(async () => {

            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors();
            // So as detection is done now we will resize them through "resizeResults(parameter)" by Face API.
            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            // Now before showing the result on the canvas, we clear it so that previous don't stack up.
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            /*
                Now as we have all the detections in "resizedDetetion" we will find the best match 
                faces in video through "findBestMatch(parameters)" function by passing their respective 
                desciptor again provided by Face API and then we will store them in result.
            */
            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor);
            })
            var flag = 1
            // So as we got all result we will make a drawbox for all faces and then display it on canvas.
            results.forEach((result, i) => { 
                const box = resizedDetections[i].detection.box; 
                let weGot = result.label;
                console.log(weGot);
                if(weGot=="unknown"){
                    flag=0;
                }
                else{
                    flag++;
                }
                if(flag>=2 && result.distance >= 0.5){
                    console.log('yes')
                    video.pause();
                    document.getElementById("suspectDetectedName").innerHTML = 'Suspect Name : ' + weGot;
                    document.querySelector('.suspectFound').style.display = 'flex';
                    canvas.style.display='block';
                }
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() });
                drawBox.draw(canvas);
            })

            video.addEventListener('pause', function () {
                console.log('Process Done');
                clearInterval(intervalID);
                canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
                canvas.style.display = 'none';
                return;
            })
        }, 100);

        // Now as if we get any request which will be stop the function we will handle that event.
        document.getElementById('close-video-show').addEventListener('click', function () {
            console.log('Process Done');
            clearInterval(intervalID);
            video.pause();
            document.querySelector('.suspectFound').style.display = 'none';
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
            video.src = "";  
            // Closing WebCam Feed if Open
            return;
        })
    })
}

/*
    These function "loadUploadImagesLength()" will extract the face data from the photos of suspect,
    and then store it the descriptors and then return it back which is used in our "recognizeFaces()".
*/
function loadUploadImagesLength() {
    return Promise.all(
        // So we will itereate over "suspectsUploadName" array which we had stored SuspectName.
        suspectsUploadName.map(async (suspectName) => {
            const descriptions = [];
            // We will extract the number of images uploaded user.
            var len = suspectsUploadLength.get(`${suspectName}`)
            var suspectRealName = suspectName;
            console.log(len)
            for (let i = 0; i < len; i++) {
                var nameInput = suspectRealName;
                let resultInput = nameInput.concat(`${i}`);
                /*
                    Then for all the Images stored in map with that user tag we will detect the face from it,
                    with the "detectSingleFace(parameters)" function, with their landmarks by "withFaceLandmarks()"
                    and with "withFaceDescriptors()" provided by Face API.
                */
                const img = await faceapi.fetchImage(imagesUploaded.get(`${resultInput}`));
                try {
                    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
                    descriptions.push(detections.descriptor);
                } catch (error) {
                    console.log('Invalid data Found')
                }
                
            }
            console.log('Loaded Face of '+suspectRealName);
            //Then we will return the descriptors of the all suspects for all suspects to the "recognizeFaces()".
            return new faceapi.LabeledFaceDescriptors(suspectRealName, descriptions);
        })
    )
}