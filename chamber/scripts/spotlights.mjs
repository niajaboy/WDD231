const MEMBERS_URL = 'data/members.json';

export async function initSpotlights(count = 3) {
    const container = document.getElementById('spotlights-container');
    if (!container) return;

    try {
        const response = await fetch(MEMBERS_URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const members = await response.json();

        // Filter strictly for Gold (3) and Silver (2) members
        const eligibleMembers = members.filter(
            (member) => member.membershipLevel === 3 || member.membershipLevel === 2
        );

        // Shuffle randomly using Fisher-Yates algorithm
        const shuffled = shuffleArray([...eligibleMembers]);
        const selected = shuffled.slice(0, count);

        renderSpotlightCards(selected, container);
    } catch (error) {
        console.error('Error loading member spotlights:', error);
        container.innerHTML = '<p>Unable to load member spotlights at this time.</p>';
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderSpotlightCards(members, container) {
    container.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('article');
        card.classList.add('spotlight-card');

        const header = document.createElement('div');
        header.classList.add('spotlight-header');

        const title = document.createElement('h3');
        title.textContent = member.name;

        const badge = document.createElement('span');
        const isGold = member.membershipLevel === 3;
        badge.classList.add('membership-badge', isGold ? 'badge-gold' : 'badge-silver');
        badge.textContent = isGold ? 'Gold Member' : 'Silver Member';

        header.append(title, badge);

        const logo = document.createElement('img');
        logo.src = `images/${member.image}`;
        logo.alt = `${member.name} Logo`;
        logo.width = 180;
        logo.height = 100;
        logo.loading = 'lazy';

        const phone = document.createElement('p');
        phone.innerHTML = `<strong>Phone:</strong> `;
        phone.append(document.createTextNode(member.phone));

        const address = document.createElement('p');
        address.innerHTML = `<strong>Address:</strong> `;
        address.append(document.createTextNode(member.address));

        const siteWrap = document.createElement('p');
        const link = document.createElement('a');
        link.href = member.website;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.setAttribute('aria-label', `Visit ${member.name} website`);
        link.textContent = member.website.replace(/^https?:\/\//, '');
        siteWrap.appendChild(link);

        card.append(header, logo, phone, address, siteWrap);
        container.appendChild(card);
    });
}