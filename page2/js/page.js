document.getElementById('upload-btn').addEventListener('click',
    function(){
        document.querySelector('.bg-modal').style.display='flex';
        document.querySelector('.topSection').style.filter='blur(5px)';
});

document.querySelector('.close').addEventListener('click',function(){
    document.querySelector('.bg-modal').style.display='none';
    document.querySelector('.topSection').style.filter='none';
});

const defaultBtn=document.querySelector('#default-btn');
const customBtn=document.querySelector('#custom-btn');
function defaultBtnActive(){
    defaultBtn.click();
    document.querySelector('.bg-modal').style.display='flex';
    document.querySelector('.topSection').style.filter='blur(5px)';
}

const image_input = document.querySelector('#default-btn')
var uploadImg="";

image_input.addEventListener("change",function(){
    const reader = new FileReader();
    reader.addEventListener("load",()=>{
        // uploadImg = reader.result;
        window.localStorage.setItem("recent-image",reader.result);
        //document.body.append(reader)
        console.log(reader.result)
    })
    reader.readAsDataURL(this.files[0]);
})