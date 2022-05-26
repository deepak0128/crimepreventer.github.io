
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
document.getElementById('suspect-show').addEventListener('click', function () {
    document.querySelector('.suspectFound').style.display = 'none';
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
});