import axios from 'axios';

async function main() {
  const fixtures = await import('./testuse.js');
  const BACKEND = process.env.BACKEND_URL || 'http://localhost:8000';
  const endpoint = `${BACKEND}/api/v1/users`;

  const list = [fixtures.user1, fixtures.user2, fixtures.user3, fixtures.user4, fixtures.user5];

  for (const u of list) {
    const payload = {
      fullName: u.name || u.fullname || u.fullName,
      email: u.email,
      password: '1234',
      role: u.role || 'user',
      desc: u.project || (u.data_vault?.proposal?.project) || ''
    };

    try {
      const res = await axios.post(endpoint, payload, { headers: { 'Content-Type': 'application/json' } });
      console.log(`Created ${payload.email}:`, res.data?.data || res.data || 'ok');
    } catch (err) {
      console.error(`Failed ${payload.email}:`, err.response?.data || err.message);
    }
  }
}

main().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});