
const video = document.getElementById('videoInput')
const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
var labelsUpload = new Array();
var labelsUploadLength = new Array();
var imagesUploaded = new Map();
let no_of_labels = -1;
let leastImgUploaded = -1
const live = document.getElementById('live')
const saved = document.getElementById('saved')
const livestream = document.getElementById('livestream')
const youtubestream = document.getElementById('youtubestream')
const image_input = document.querySelector('#image_input')
const image_name = document.querySelector('#image_name')
const video_input = document.querySelector('#upload_video')
var uploadImg = "";

//upper added
document.getElementById('pop-up').addEventListener('click',
    function () {
        document.querySelector('.bg-modal').style.display = 'flex';
        document.querySelector('.banner').style.filter = 'blur(10px)';
        document.querySelector('.fade').style.filter = 'blur(2px)';
        // document.querySelector('.topSection').style.filter='blur(5px)';
    });

document.querySelector('.close').addEventListener('click', function () {
    document.querySelector('.bg-modal').style.display = 'none';
    document.querySelector('.banner').style.filter = 'none'
    document.querySelector('.fade').style.filter = 'none';
});

document.getElementById('saved').addEventListener('click', function () {
    if (no_of_labels == -1) {
        alert("First Please Upload the credentials.")
    }
    else {
        document.querySelector('.bg-modal-video').style.display = 'flex';
        document.querySelector('.fade').style.filter = 'blur(2px)';
        document.querySelector('.banner').style.filter = 'blur(10px)'
    }
})
document.getElementById('close-video').addEventListener('click', function () {
    document.querySelector('.bg-modal-video').style.display = 'none';
    document.querySelector('.banner').style.filter = 'none';
    document.querySelector('.fade').style.filter = 'none';
})
document.getElementById('close-video-show').addEventListener('click', function () {
    document.querySelector('.bg-videoshow').style.display = 'none';
    document.querySelector('.videoshow').style.display = 'none';
    document.querySelector('.banner').style.filter = 'none'
    document.querySelector('.fade').style.filter = 'none';
})

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
]).then().catch((error) => {
    console.log('handled')
    location.reload(true);
})

console.log(image_name)
const defaultBtn = document.querySelector('#image_input');
const customBtn = document.querySelector('#custom-btn');
function defaultBtnActive() {
    var nameInput = document.getElementById('image_name').value;
    if (nameInput.length == 0) {
        alert('Please Enter A Valid Name First.')
    }
    else defaultBtn.click();
}
function uploadButtonActive() {
    video_input.click();
}
function nameinputFunction() {
    var nameInput = document.getElementById('image_name').value;
    if (leastImgUploaded == -1) {
        alert('First Please Select Atleast One Image of the Suspect');
    }
    else if (nameInput.length == 0) {
        alert('Please Enter A Valid Name.')
    }
    else {
        no_of_labels = no_of_labels + 1
        console.log(nameInput)
        // labelsUpload[no_of_labels]=nameInput;
        labelsUpload.push(`${nameInput}`);
        // console.log(labelsUpload[0])
        document.querySelector('.bg-modal').style.display = 'none';
        document.querySelector('.banner').style.filter = 'none'
        document.querySelector('.fade').style.filter = 'none';
    }
}
async function addFace() {
    no_of_labels = no_of_labels + 1
}

image_input.addEventListener("change", (e) => {
    leastImgUploaded = 1;
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        const files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match("image")) continue;
            const picReader = new FileReader();
            picReader.addEventListener("load", () => {
                // uploadImg = reader.result;
                var nameInput = document.getElementById('image_name').value;
                let resultInput = nameInput.concat(`${i}`);
                imagesUploaded.set(`${resultInput}`,picReader.result)
                // window.localStorage.setItem(`${resultInput}`, picReader.result);
                // document.body.append(reader)
                console.log(picReader.result)
            })
            picReader.readAsDataURL(files[i]);
        }
        var nameInput = document.getElementById('image_name').value;
        let resultInput = nameInput.concat(`${files.length}`);
        labelsUploadLength.push(`${resultInput}`);
        // const reader = new FileReader();
        // reader.addEventListener("load",()=>{
        //     // uploadImg = reader.result;
        //     var nameInput = document.getElementById('image_name').value;
        //     window.localStorage.setItem(`${nameInput}`,reader.result);
        //     // document.body.append(reader)
        //     console.log(reader.result)
        // })
        // reader.readAsDataURL(this.files[0]);
        console.log(labelsUploadLength);
    }
    else {
        alert("Your Browser Does Not Support File API")
    }
})

//Perfectly Working
// video_input.addEventListener("change",function(){
//     if (window.File && window.FileReader && window.FileList && window.Blob) {
//         const reader = new FileReader();
//         reader.addEventListener("load",()=>{
//             // uploadImg = reader.result;
//             window.localStorage.setItem("video-input",reader.result);
//             // document.body.append(reader)
//             console.log(reader.result)
//         })
//         reader.readAsDataURL(this.files[0]);
//     }
//     else{
//         alert("Your Browser Does Not Support File API")
//     }
// })
// saved.addEventListener('click',function(e){
//     start(1)
// });

live.addEventListener('click', function (e) {
    if (no_of_labels == -1) {
        alert("First Please Upload the credentials.")
    }
    else {
        document.querySelector('.bg-videoshow').style.display = 'flex';
        document.querySelector('.videoshow').style.display = 'none';
        document.querySelector('.banner').style.filter = 'blur(10px)'
        document.querySelector('.fade').style.filter = 'blur(2px)';
        start(2)
    }

});
livestream.addEventListener('click', function (e) {
    document.querySelector('.bg-videoshow').style.display = 'flex';
    document.querySelector('.banner').style.filter = 'blur(10px)'
    document.querySelector('.fade').style.filter = 'blur(2px)';
    start(2)
});
youtubestream.addEventListener('click', function (e) {
    var ytlink = document.getElementById('ytlink').value;
    console.log(ytlink);
    video.src = `${ytlink}`
    document.querySelector('.bg-videoshow').style.display = 'flex';
    document.querySelector('.banner').style.filter = 'blur(10px)'
    document.querySelector('.fade').style.filter = 'blur(2px)';
    recognizeFaces()
})

function selectedVid(self) {
    var file = self.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        var src = e.target.result;
        console.log('src')
        video.setAttribute("src", src);
        console.log('video ki src' + video.src)
    }
    reader.readAsDataURL(file);
    document.querySelector('.bg-videoshow').style.display = 'flex';
    document.querySelector('.banner').style.filter = 'blur(10px)'
    document.querySelector('.fade').style.filter = 'blur(2px)';
    document.querySelector('.videoshow').style.display = 'flex';
    recognizeFaces();
}

function start(option) {
    // document.body.append('Models Loaded')
    document.querySelector('.videoshow').style.display = 'flex';
    if (option == 1) video.src = './videos/age.mp4'
    else {
        navigator.getUserMedia(
            { video: {} },
            stream => video.srcObject = stream,
            err => console.log(err)
        )
    }
    recognizeFaces()
}

var canvas;
async function recognizeFaces() {
    //const labeledDescriptors = await loadLabelImages()
    //const labeledDescriptors = await loadUploadImages()
    const labeledDescriptors = await loadUploadImagesLength()
    const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6)
    alert('Now you can play')
    // console.log('Now you can play')
    video.addEventListener('play', () => {
        console.log('playing')

        canvas = faceapi.createCanvasFromMedia(video)
        document.body.append(canvas)
        const displaySize = { width: video.width, height: video.height }
        faceapi.matchDimensions(canvas, displaySize)

        let intervalID = setInterval(async () => {
            const detections = await faceapi.detectAllFaces(video).withFaceLandmarks().withFaceDescriptors()
            //if(detections!='') console.log('yes')
            const resizedDetections = faceapi.resizeResults(detections, displaySize)
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
            const results = resizedDetections.map((d) => {
                return faceMatcher.findBestMatch(d.descriptor)
            })
            var flag = 1
            results.forEach((result, i) => {
                const box = resizedDetections[i].detection.box
                console.log('canvas is drawing')
                let weGot = result.toString();
                if (weGot[0] == 'S') {
                    console.log(result.toString())
                    flag = 0
                    const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                    drawBox.draw(canvas)
                    return
                }
                const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
                drawBox.draw(canvas)
            })

            if (flag == 0) {
                return
            }
        }, 100);
        document.getElementById('close-video-show').addEventListener('click', function () {
            console.log('hello done')
            clearInterval(intervalID);
            video.pause();
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
            video.src = "";
            return
        })
        document.getElementById('close-video').addEventListener('click', function () {
            console.log('hello done')
            clearInterval(intervalID);
            video.pause();
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
            video.src = "";
            return
        })
        document.querySelector('.close').addEventListener('click', function () {
            console.log('hello done')
            clearInterval(intervalID);
            video.pause();
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
            canvas.style.display = 'none';
            video.src = "";
            return
        })
    })
}
function loadLabelImages() {
    return Promise.all(
        labels.map(async (label) => {
            const descriptions = []
            for (let i = 1; i <= 2; i++) {
                const img = await faceapi.fetchImage(`./labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)

            }
            console.log(label + ' Faces Loaded|')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

function loadUploadImages() {
    return Promise.all(
        labelsUpload.map(async (label) => {
            const descriptions = []
            for (let i = 1; i <= 2; i++) {
                //const img = await faceapi.fetchImage(`./labeled_images/${label}/${i}.jpg`)
                const img = await faceapi.fetchImage(localStorage.getItem(`${label}`))
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }

            console.log(label + ' Faces Loaded|' + 'haa bhai sahi mein hogya')
            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

function loadUploadImagesLength() {
    return Promise.all(
        labelsUploadLength.map(async (label) => {
            const descriptions = []
            var len = parseInt(label[label.length - 1])
            console.log(len)
            var label_real = label.substring(0, label.length - 1)
            console.log(label_real)
            for (let i = 0; i < len; i++) {
                //const img = await faceapi.fetchImage(`./labeled_images/${label}/${i}.jpg`)
                var nameInput = label_real
                let resultInput = nameInput.concat(`${i}`);
                //const img = await faceapi.fetchImage(localStorage.getItem(`${resultInput}`))
                const img = await faceapi.fetchImage(imagesUploaded.get(`${resultInput}`));
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }

            console.log(label_real + ' Faces Loaded|' + 'haa bhai sahi mein hogya')
            return new faceapi.LabeledFaceDescriptors(label_real, descriptions)
        })
    )
}