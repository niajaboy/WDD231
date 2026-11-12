// Responsive Navigation Toggle
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
    hamButton.setAttribute('aria-expanded', isOpen);
});

// Footer Copyright Year & Last Modification Date
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Modification: ${document.lastModified}`;

// Directory Fetch and Display
const url = 'data/members.json';
const membersContainer = document.getElementById('members-container');

async function getMemberData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayMembers(data);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

function displayMembers(members) {
    members.forEach((member) => {
        const card = document.createElement('article');
        card.classList.add('member-card');

        const logo = document.createElement('img');
        logo.setAttribute('src', `images/${member.image}`);
        logo.setAttribute('alt', `${member.name} Logo`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '150');
        logo.setAttribute('height', '150');

        const name = document.createElement('h2');
        name.textContent = member.name;

        const address = document.createElement('p');
        address.textContent = member.address;

        const phone = document.createElement('p');
        phone.textContent = member.phone;

        const website = document.createElement('a');
        website.setAttribute('href', member.website);
        website.setAttribute('target', '_blank');
        website.setAttribute('rel', 'noopener noreferrer');
        website.setAttribute('aria-label', `Visit ${member.name} website`);
        website.textContent = member.website;

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        membersContainer.appendChild(card);
    });
}

getMemberData();

// Grid & List View Toggles
const gridBtn = document.getElementById('grid-btn');
const listBtn = document.getElementById('list-btn');

gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid-view');
    membersContainer.classList.remove('list-view');
    gridBtn.setAttribute('aria-pressed', 'true');
    listBtn.setAttribute('aria-pressed', 'false');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list-view');
    membersContainer.classList.remove('grid-view');
    listBtn.setAttribute('aria-pressed', 'true');
    gridBtn.setAttribute('aria-pressed', 'false');
});