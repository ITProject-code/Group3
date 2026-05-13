// USERS
let users = {
    "gse_admin": {password:"3526", role:"admin"},
    "GSE_01": {password:"1243", role:"teacher"}
};

// STUDENTS (FROM YOUR IMAGE)
let students = {
    "gse_001": {name:"Abdurahman Tajudin", results:[]},
    "gse_002": {name:"Aliyi Muhammad Hussein", results:[]},
    "gse_003": {name:"Asanti Sulxan", results:[]},
    "gse_004": {name:"Asma Tajudin", results:[]},
    "gse_005": {name:"Asha Muhammad", results:[]},
    "gse_006": {name:"Bona Jamal", results:[]},
    "gse_007": {name:"Chali Hussein", results:[]},
    "gse_008": {name:"Isra Yasir", results:[]},
    "gse_009": {name:"Fenet Abdul Karim", results:[]},
    "gse_010": {name:"Fraol Kebada", results:[]},
    "gse_011": {name:"Hidaya Ahmed", results:[]},
    "gse_012": {name:"Horenus Gamule", results:[]},
    "gse_013": {name:"Kalid Abdulsemaad", results:[]},
    "gse_014": {name:"Kalid Isa", results:[]},
    "gse_015": {name:"Qanani Awal", results:[]},
    "gse_016": {name:"Makfira Abdulsemaad", results:[]},
    "gse_017": {name:"Manal Isak", results:[]},
    "gse_018": {name:"Muhammad Adam", results:[]},
    "gse_019": {name:"Museyba Nure", results:[]},
    "gse_020": {name:"Nabila Muhammad Isa", results:[]},
    "gse_021": {name:"Naif Amin", results:[]},
    "gse_022": {name:"Nanati Hailu", results:[]},
    "gse_023": {name:"Naol Jemal", results:[]},
    "gse_024": {name:"Nesradin Adam", results:[]},
    "gse_025": {name:"Nebila Muhammad Amin", results:[]},
    "gse_026": {name:"Naima Mohammed", results:[]},
    "gse_027": {name:"Najat Siraj", results:[]},
    "gse_028": {name:"Najum Mikear", results:[]},
    "gse_029": {name:"Rebah Muhammad", results:[]},
    "gse_030": {name:"Reyan Jibril", results:[]},
    "gse_031": {name:"Samir Ahmed", results:[]},
    "gse_032": {name:"Robel Ayela", results:[]},
    "gse_033": {name:"Sami Haile", results:[]},
    "gse_034": {name:"Sami Tilaye", results:[]},
    "gse_035": {name:"Samar Kedi", results:[]},
    "gse_036": {name:"Sena Guddata", results:[]},
    "gse_037": {name:"Sifan Hussein", results:[]},
    "gse_038": {name:"Sifan Adunya", results:[]},
    "gse_039": {name:"Sinbona Abi", results:[]},
    "gse_040": {name:"Soretti Muftih", results:[]},
    "gse_041": {name:"Yusra Kamil", results:[]},
    "gse_042": {name:"Zakir Sultan", results:[]},
    "gse_043": {name:"Kahin Zakarias", results:[]},
    "gse_044": {name:"Seron", results:[]}
};

// ADD ALL STUDENTS TO LOGIN
for(let id in students){
    users[id] = {password:"2345", role:"student"};
}

// HOMEWORK
let homework = [];

// LOGIN
function login(){
    let id = document.getElementById("id").value;
    let pass = document.getElementById("pass").value;

    if(!users[id] || users[id].password !== pass){
        alert("Wrong login");
        return;
    }

    hideAll();

    if(users[id].role==="admin") show("admin");
    if(users[id].role==="teacher") {
        show("teacher");
        showHW();
    }
    if(users[id].role==="student") {
        show("student");
        loadStudent(id);
    }
}

// SHOW
function show(id){
    document.getElementById(id).classList.remove("hidden");
}

// HIDE
function hideAll(){
    ["login","admin","teacher","student"].forEach(i=>{
        document.getElementById(i).classList.add("hidden");
    });
}

// LOGOUT
function logout(){
    hideAll();
    show("login");
}

// ADD STUDENT
function addStudent(){
    let id = sid.value;
    let name = sname.value;

    users[id] = {password:"1234", role:"student"};
    students[id] = {name:name, results:[]};

    alert("Student Added");
}

// ADD RESULT
function addResult(){
    let id = rid.value;
    let subject = sub.value;
    let score = parseInt(score.value);

    if(!students[id]) return alert("No student");

    students[id].results.push({subject, score});
    alert("Result Added");
}

// LOAD STUDENT
function loadStudent(id){
    let st = students[id];
    stName.innerText = st.name;

    table.innerHTML="";
    let total=0;

    st.results.forEach(r=>{
        total+=r.score;
        table.innerHTML += `<tr><td>${r.subject}</td><td>${r.score}</td></tr>`;
    });

    let avg = total/(st.results.length||1);
    avgSpan.innerText = avg.toFixed(1);

    calcRank(id);
    showStudentHW();
}

// RANK
function calcRank(id){
    let arr=[];

    for(let s in students){
        let res = students[s].results;
        let avg = res.reduce((a,b)=>a+b.score,0)/(res.length||1);
        arr.push({id:s, avg});
    }

    arr.sort((a,b)=>b.avg-a.avg);

    let rank = arr.findIndex(x=>x.id===id)+1;
    rankSpan.innerText = rank;
}

// HOMEWORK
function addHW(){
    homework.push(hw.value);
    showHW();
}

function showHW(){
    hwList.innerHTML="";
    homework.forEach(h=>{
        hwList.innerHTML+=`<p>${h}</p>`;
    });
}

function showStudentHW(){
    studentHW.innerHTML="";
    homework.forEach(h=>{
        studentHW.innerHTML+=`<p>${h}</p>`;
    });
}

// ELEMENTS
let sid = document.getElementById("sid");
let sname = document.getElementById("sname");
let rid = document.getElementById("rid");
let sub = document.getElementById("sub");
let score = document.getElementById("score");

let table = document.getElementById("table");
let avgSpan = document.getElementById("avg");
let rankSpan = document.getElementById("rank");
let stName = document.getElementById("stName");

let hw = document.getElementById("hw");
let hwList = document.getElementById("hwList");
let studentHW = document.getElementById("studentHW");