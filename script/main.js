const coursedescriptionBTN = document.getElementById("course-description");
const labnotesBTN = document.getElementById("lab-notes");
const zoomlinksBTN = document.getElementById("zoom-links");
const feedbackBTN = document.getElementById("feedback");

coursedescriptionBTN.addEventListener("click", ()=>loadTemplate("templateCourseDescription"));
labnotesBTN.addEventListener("click", ()=>loadTemplate("templateTAnotes"));
zoomlinksBTN.addEventListener("click", ()=>loadTemplate("templateZoomLinks"));
feedbackBTN.addEventListener("click", ()=>loadTemplate("templateEvaluation"));



function loadTemplate(templateString) {
    const templateContainer = document.getElementById("templates");
    templateContainer.innerHTML = "";
    const template = document.getElementById(templateString);
    const clone = template.content.cloneNode(true);
    templateContainer.appendChild(clone);
}

// init
loadTemplate("templateTAnotes");