# MBA Assistant

Production-oriented Expo + Supabase starter for the free MBA Assistant learning platform.

## Included
- Email/password authentication and protected routing
- SecureStore-backed mobile session persistence
- Learner home, curriculum, portfolio upload, and profile
- Admin-only dashboard, content draft UI, and learner list
- PostgreSQL migration with RLS and private assignment storage
- Seed data for the 10-module English curriculum

## Setup
1. Install Node.js 20+ and the Supabase CLI.
2. Copy `.env.example` to `.env` and add your project URL and publishable key.
3. Run `npm install`.
4. Start local Supabase: `supabase start`.
5. Apply schema and seed: `supabase db reset`.
6. Run `npm run typecheck`, then `npx expo start`.

## First administrator
Register Mahmoud's account normally, then run this once in the Supabase SQL editor, replacing the email:

```sql
update public.profiles p set role='admin'
from auth.users u where p.id=u.id and u.email='YOUR_ADMIN_EMAIL';
```

Never place a service-role or database secret in the mobile app. Only use the public publishable key and enforce access through RLS.

## Known next work
- Password recovery and email deep-link callback screens
- Actual lesson detail/editing and assessment engine
- Submission metadata insert after storage upload
- SecureStore is used for the session; test token size on target devices before release
- Arabic i18n/RTL
- Notifications and AI tutor
- Automated tests, malware scanning, audit triggers and CI/CD
