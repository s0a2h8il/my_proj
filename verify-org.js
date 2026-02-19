const http = require('http');

const PORT = 5000;
const BASE_URL = `http://localhost:${PORT}/api`;

const registerUser = async () => {
    const user = {
        name: 'OrgUser',
        email: `orguser_${Date.now()}@example.com`,
        password: 'password123'
    };

    const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.token;
};

const createOrg = async (token, name) => {
    const res = await fetch(`${BASE_URL}/orgs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to create org');
    return data.data;
};

const getMyOrgs = async (token) => {
    const res = await fetch(`${BASE_URL}/orgs`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    return data.data;
};

const run = async () => {
    try {
        console.log('1. Registering new user...');
        const token = await registerUser();
        console.log('   User registered. Token received.');

        console.log('2. Creating organization "TestOrg"...');
        const orgName = `TestOrg_${Date.now()}`;
        const newOrg = await createOrg(token, orgName);
        console.log('   Organization created:', newOrg.name);

        console.log('3. Fetching my organizations...');
        const myOrgs = await getMyOrgs(token);
        console.log('   My Organizations:', myOrgs);

        const found = myOrgs.find(o => o.name === orgName);
        if (found && found.role === 'owner') {
            console.log('SUCCESS: Organization created and user is owner.');
        } else {
            console.error('FAILURE: Organization not found or role incorrect.');
            process.exit(1);
        }

    } catch (err) {
        console.error('ERROR:', err.message);
        process.exit(1);
    }
};

run();
