# Crime Preventer Web-Application
## Submission for Microsoft Engage 2022 

Crime Preventer Using **Face API** of JavaScript by **recognizing faces** of the suspects.

## Overview
This project is based on the **Face Recognition and Detection.** <br>
As we know that with the advancement of human race, unfortunately  the crime rate is also increasing. But with these technologies we can prevent it. With the help of this face recognition technology and face data of the supect, we can prevent crime by alerting the right government bodies.

**Idea :** <br> 
The **Face API** is used to detect and recognize face.
For training our model we can either provide single or multiple images of the suspect.
Then faces can be detected in a live video stream or a prerecorded video and the suspect is recognized after it matches the face with minimum accuracy.

## Features and Interfaces
1. Home Page and Contact Us 
   - Home Page to the website with a small but crisp overview with responsive Navigation Bar and Demo Button.
   - <img src="./readmeImages/Screenshot (243).png" alt="image">

   - Just to connect or to discuss issue or give a feedback, we have a Connect Us. 
   - <img src="./readmeImages/Screenshot (247).png" alt="image">

2. Features Explained in Home Page
   - API used and About the Project
   - <img src="./readmeImages/Screenshot (244).png" alt="image">
   - <img src="./readmeImages/Screenshot (245).png" alt="image">
   - Main Features with eye catching animation.
   - <img src="./readmeImages/Screenshot (248).png" alt="image">

3. Main Page and How To Use
   - First we have some overview and two buttons(discussed below)
   - <img src="./readmeImages/Screenshot (249).png" alt="image">
   - How To Use
   - <img src="./readmeImages/Screenshot (250).png" alt="image">
 
4. Register and Catch Suspect
   - To register click **Resgister Suspect**, then enter name and images of suspect (if either one missing it shows alert) then submit form.
   - <img src="./readmeImages/Screenshot (251).png" alt="image">
   - Now to monitor click **Catch Suspect**, then select a video stream either live or prerecorded and after instruction play the video.
   - <img src="./readmeImages/Screenshot (252).png" alt="image">
   - <img src="./readmeImages/Screenshot (253).png" alt="image">
5. Some Exapmles
   - **First Select Images**
   - <img src="./readmeImages/Screenshot (256).png" alt="image">
   - **By Saved Video**
   - <img src="./readmeImages/Screenshot (257).png" alt="image">
   - <img src="./readmeImages/Screenshot (254).png" alt="image">
   - **By Live Video**
   - <img src="./readmeImages/Screenshot (259).png" alt="image">
### Languages, Tools and Frameworks Used: 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> <a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://git-scm.com/" target="_blank"> <img src="https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg" alt="git" width="40" height="40"/>   </a> <a href="https://www.mongodb.com/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.tensorflow.org" target="_blank"> <img src="https://www.vectorlogo.zone/logos/tensorflow/tensorflow-icon.svg" alt="tensorflow" width="40" height="40"/> </a> </p>


## UI/UX
The website is implemented such that it can support **every resolution** and provide same features. So anyone at any platform can use this.<br>
Along with that the navigation and contact us bar , Button and Feature **Animations** with a balanced theme and perfect images makes website UI very interactive.<br>
Every feature of the project is well explained in the pages only like in working section, timeline section and how to use section in main page which makes UX very easy and interactive. <br>
Also the **alert sound** makes interactions better. <br>

## Coding Best Practices
These some practices I followed which made this code easy to understand.
- A proper and consistent **indentaion** is followed througout.
- Proper **Comments** are specified wherever needed.
- **Camel case** convention with meaningful name is followed throughout.
- Code is **grouped** and **line limit** is also respected.
- File and folder are **stuctured** and named well to understand.


## Points to remember while testing the app


1. Allow **permissions** for camera when asked.
2. Wait for the **alert messages** before playing the video feed.
3. When using live stream option provide **proper ligthing.**


## Instructions


1. `git clone https://github.com/shishir-b/crimepreventer.github.io.git`  
2. Install node dependencies 
   - `npm install`
3. Now you can either start the program by live server extension or skip this step. 
4. Start the server
   - `node src/program.js`
5. The app is now running at http://localhost:3000

## Dataset to try
I could not find a perfect data with respect to my project so I created one. <br>
These dataset include nearly a hundred images of two renowned actors and two diffrent videos of them. <br>
The images are choosen randomly so they have different dimensions, angles and lighting conitions.
- Also uploaded on this repository's Dataset Folder (or)
- [Link For Dataset](https://drive.google.com/drive/folders/1UGBaS86goNV-7EBEaCEojIjMiNwHhWX_?usp=sharing)

## Future Scope
This are the some future thoughts occures in my mind, I tried them but as per time constrain I delayed them for future.
1. A **multi live video** crime preventer using any video calling SDK just like any of the online meeting application.
2. A **automated mail** to the mentioned email address when suspect is detected.

## License and Copyright

&copy; **Shishir Bhalerao**
Licensed under [MIT License](/LICENSE) .


## Useful Links
- [Deployed Website](Now Blank)
- [Demo Video](Now Blank)
- [Time Line](https://docs.google.com/presentation/d/1JbjXtlUo9oX1Nt3KcCjNvbegIx7x1BnW/edit?usp=sharing&ouid=115596621425655826146&rtpof=true&sd=true)
- [Presentaion](https://drive.google.com/file/d/1ik17DaUR9vSjJSZ_E0manHRbK18Hv1AW/view?usp=sharing)
- [Face API Documents](https://justadudewhohacks.github.io/face-api.js/docs/index.html)


## If Any Help Needed.

Feel free to ping me on [LinkedIn](https://www.linkedin.com/in/shishir-bhalerao-76b583237/) 

