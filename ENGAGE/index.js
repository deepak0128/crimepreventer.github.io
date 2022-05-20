let name='Mota';
let secName='Total'; 
let per={
    name:'Mota',
    age:16,
    name2:'Shiru'
}
per['name']='Hi';
let arr=['red','blue'];
arr[2]='yello';
function fun_name(){
    console.log(arr[0]);
}
fun_name();
console.log(arr);
for(let i=0;i<10;i++){
    console.log(arr[i%3]+'\n');
}