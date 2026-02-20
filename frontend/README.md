

# Test users

The following test users were created by the seed script. Each user has a default password of `1234`.

```javascript
// test users (objects you can paste/use in code)
export const testUser1 = {
  id: '6997fa9a546c425b9eb6eedd',
  fullName: 'Alex Chen',
  email: 'alex.chen@example.com',
  password: '1234',
  desc: 'E-Commerce Checkout Flow',
  role: 'CEO',
};

export const testUser2 = {
  id: '6997fa9a546c425b9eb6eede',
  fullName: 'Sarah Johnson',
  email: 'sarah.johnson@example.com',
  password: '1234',
  desc: 'FinSafe App Launch',
  role: 'Marketing Lead',
};

export const testUser3 = {
  id: '6997fa9a546c425b9eb6eedf',
  fullName: 'Denver-LB Council Sync',
  email: 'denver.lb.council@example.com',
  password: '1234',
  desc: 'Municipal Policy & Zoning Oversight',
  role: 'Legislative Coordinator',
};

export const testUser4 = {
  id: '6997fa9b546c425b9eb6eee0',
  fullName: 'Liam O’Connor',
  email: 'liam.oconnor@example.com',
  password: '1234',
  desc: 'Online Learning Platform Revamp',
  role: 'Lead Developer',
};

export const testUser5 = {
  id: '6997fa9b546c425b9eb6eee1',
  fullName: 'Michael Vance',
  email: 'michael.vance@example.com',
  password: '1234',
  desc: 'Municipal Policy & Infrastructure Oversight',
  role: 'Legislative Coordinator',
};
```

Usage:
- The seed script created these users in the backend. Sign in with any user's `email` and the password `1234`.
- The app's `AuthProvider` will detect the signed-in user's email and expose the matching fixture as `testUser` in the context for UI/testing.

File: `src/test/testuse.js` contains richer fixture data (meetings, slack, whatsapp, etc.) if you need more details.