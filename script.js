let applications =
JSON.parse(localStorage.getItem("applications")) || [];


loadData();
loadApplications();
updateDashboard();


function saveSkills() {

    const skills = {

        html: document.getElementById("htmlSkill").value,
        js: document.getElementById("jsSkill").value,
        python: document.getElementById("pythonSkill").value,
        sql: document.getElementById("sqlSkill").value

    };

    localStorage.setItem(
        "skills",
        JSON.stringify(skills)
    );

    updateDashboard();
}


function updateSavings() {

    localStorage.setItem(
        "currentSavings",
        document.getElementById("currentSavings").value
    );

    localStorage.setItem(
        "targetSavings",
        document.getElementById("targetSavings").value
    );

    updateDashboard();
}


function addApplication() {

    const company =
        document.getElementById("companyName")
        .value.trim();

    if (company === "") {
        alert("Enter company name");
        return;
    }

    applications.push(company);

    localStorage.setItem(
        "applications",
        JSON.stringify(applications)
    );

    document.getElementById("companyName").value = "";

    loadApplications();
    updateDashboard();
}


function loadApplications() {

    const applicationList =
        document.getElementById("applicationList");

    applicationList.innerHTML = "";

    applications.forEach((company, index)=> {

        const li =
            document.createElement("li");

        li.innerHTML = 
       ` ${company}
        <button onclick="deleteApplication(${index})">Clear</button>
        `;

        applicationList.appendChild(li);

    });

}


function calculateReadiness() {

    const skills =
        JSON.parse(
            localStorage.getItem("skills")
        ) || {

            html: 70,
            js: 60,
            python: 50,
            sql: 40

        };

    const skillScore =
        (
            Number(skills.html) +
            Number(skills.js) +
            Number(skills.python) +
            Number(skills.sql)
        ) / 4;

    const level =
        document.getElementById("germanLevel").value;

    let languageScore = 20;

    if (level === "A2") languageScore = 40;
    if (level === "B1") languageScore = 60;
    if (level === "B2") languageScore = 80;
    if (level === "C1") languageScore = 100;

    const current =
        Number(
            localStorage.getItem(
                "currentSavings"
            )
        ) || 0;

    const target =
        Number(
            localStorage.getItem(
                "targetSavings"
            )
        ) || 1;

    const savingsScore =
        Math.min(
            (current / target) * 100,
            100
        );

    const applicationScore =
        Math.min(
            applications.length * 10,
            100
        );

    return Math.round(

        (skillScore * 0.4) +
        (languageScore * 0.2) +
        (savingsScore * 0.2) +
        (applicationScore * 0.2)

    );
}

function updateDashboard() {

    const scoreValue =
        calculateReadiness();

    document.getElementById("score").textContent = scoreValue + "%";

    document.getElementById("applicationCount").textContent = applications.length;

    const current =
        Number(
            localStorage.getItem(
                "currentSavings"
            )
        ) || 0;

    const target =
        Number(
            localStorage.getItem(
                "targetSavings"
            )
        ) || 1;

    const savingsPercent =
        Math.min(
            (current / target) * 100,
            100
        );

    document.getElementById("savingPercent")
        .textContent =
        Math.round(savingsPercent) + "%";

    let message =
        "Beginner Stage";

    if (scoreValue >= 40)
        message =
        "Developing Profile";

    if (scoreValue >= 70)
        message =
        "Germany Ready";

    if (scoreValue >= 90)
        message =
        "Strong Candidate";

    document.getElementById("readinessMessage")
        .textContent =
        message;
}


function loadData() {

    const skills =
        JSON.parse(
            localStorage.getItem("skills")
        );

    if (skills) {

        document.getElementById("htmlSkill").value =
            skills.html;

        document.getElementById("jsSkill").value =
            skills.js;

        document.getElementById("pythonSkill").value =
            skills.python;

        document.getElementById("sqlSkill").value =
            skills.sql;
    }

    document.getElementById("currentSavings").value =
        localStorage.getItem("currentSavings") || "";

    document.getElementById("targetSavings").value =
        localStorage.getItem("targetSavings") || "";
}


document.getElementById("germanLevel")
    .addEventListener(
        "change",
        updateDashboard
    );
    function clearApplications(){
        if(confirm("Delete All Applications?")){
            applications=[];
            localStorage.setItem(
                "applications",JSON.stringify([])
            );
            document.getElementById("applicationList").innerHTML="";
            document.getElementById("applicationCount").innerHTML="0";
            updateDashboard();
        }
    }

    function deleteApplication(index){
        applications.splice(index,1);

        localStorage.setItem(
    
            "applications",
    
            JSON.stringify(applications)

        );

        loadApplications();

        updateDashboard();

    }