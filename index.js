let currentUser = {};
const userDetails = document.querySelector(".right-sidebar")
function updateRightSidebar() {
    const sidebarHtml = `<div class="wrapper">
<div class="user-details">
    <img src=${currentUser.profile_picture} alt="" />
    <span class="name">${currentUser.name}</span>
</div>
<div class="comprehensive-details">
    <div class="inner">
        <div>
            <img src="assets/images/BirthIcon/BirthIcon.png" alt="" />
        </div>
        <div class="info">
            <span>Date of Birth</span>
            <span>${currentUser.date_of_birth} </span>
        </div>
    </div>
    <div class="inner">
        <div>
            <img src="assets/images/FemaleIcon.png" alt="" />
        </div>
        <div class="info">
            <span>Gender</span>
            <span>${currentUser.gender} </span>
        </div>
    </div>
    <div class="inner">
        <div>
            <img src="assets/images/PhoneIcon.png" alt="" />
        </div>
        <div class="info">
            <span>Contact Info</span>
            <span>${currentUser.phone_number}</span>
        </div>
    </div>
    <div class="inner">
        <div>
            <img src="assets/images/PhoneIcon.png" alt="" />
        </div>
        <div class="info">
            <span>Emergency Contacts</span>
            <span>${currentUser.emergency_contact} </span>
        </div>
    </div>
    <div class="inner">
        <div>
            <img src="assets/images/InsuranceIcon.png" alt="" />
        </div>
        <div class="info">
            <span>Insurance Provider</span>
            <span>${currentUser.insurance_type} </span>
        </div>
    </div>
    <button>Show All Information</button>
</div>
</div>
</div>

<div class="lab-result-section">
<div>
<h2>Lab Result</h2>
<div class="test">
    <div><span>Blood Test </span><span><img src="assets/images/download (2).png" alt="" /> </div>
    <div><span>CT scans</span><img src="assets/images/download (2).png" alt="" /> </div>
    <div><span>Radiology Reports</span><img src="assets/images/download (2).png" alt="" /> </div>
    <div><span>X-Rays</span><img src="assets/images/download (2).png" alt="" /> </div>
    <div><span>Urine test</span><img src="assets/images/download (2).png" alt="" /> </div>
    </div>
</div>
</div>`;
    userDetails.innerHTML = sidebarHtml;
}
// window.addEventListener("load", async () => {
const username = 'coalition';
const password = 'skills-test';

const encodedCredentials = btoa(`${username}:${password}`);

async function getUser() {
    try {
        const patients = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
            method: "GET",
            credentials: "same-origin",
            headers: {
                "content-type": "application/json",
                'Authorization': `Basic ${encodedCredentials}`
            }
        });
        const data = await patients.json();
        currentUser = data[0];
        const chatList = document.querySelector(".chat-list");

        data.forEach((patient, index) => {
            const element = `<div class="chat-box chat-box-${index}" key="${patient.id}">
                <img class="profile-img" src=${patient.profile_picture} alt="" />
                <div class="user-details"><h3>${patient.name}</h3><span>${patient.gender} ${patient.age}</span>
                </div><div class="option-icon">
                <img src="assets/images/more_horiz_FILL0_wght300_GRAD0_opsz24.png" alt="" /></div></div>`;
            chatList.insertAdjacentHTML('beforeend', element);

            const chatBox = document.querySelector(`.chat-box-${index}`);

            chatBox.addEventListener('click', (e) => {
                currentUser = patient;
                updateRightSidebar();
                document.querySelectorAll(`.chat-box`).forEach((element) => element.classList.remove("active"));
                chatBox.classList.add("active")
            });
        });

    } catch (error) {
        console.log(error);
    }
}


// Call the function to create the chart




// });
window.addEventListener('load', () => {
    getUser();
    updateRightSidebar();
   
})