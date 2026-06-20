# arknights-randomizer

PRTS Random Challenge Terminal — generate random Arknights challenge runs.

## Live site

- **GitHub Pages:** https://thesuperrl.github.io/arknights-randomizer/
- **Main website:** https://thesuperrl.github.io/arknights-website/

## Deploy

Pushes to `main` run the **Deploy to GitHub Pages** workflow.

First-time setup in the repo:

1. **Settings → Pages** → Source = **GitHub Actions**
2. Push to `main` (or run the workflow manually)

## Custom subdomain

To serve this app at e.g. `randomizer.yourdomain.com` while the main site uses `yourdomain.com`:

### 1. DNS

Add a **CNAME** record:

| Type  | Name        | Value                 |
|-------|-------------|-----------------------|
| CNAME | `randomizer` | `thesuperRL.github.io` |

(Use your GitHub username if different.)

### 2. GitHub Pages

In this repo: **Settings → Pages → Custom domain** → enter `randomizer.yourdomain.com`.

GitHub will create a `CNAME` file and provision HTTPS. Wait for the DNS check to pass.

### 3. Main site custom domain (optional)

In [arknights-website](https://github.com/thesuperRL/arknights-website): set **Custom domain** to `yourdomain.com` (or `www.yourdomain.com`).

### 4. Update URLs

- In `js/config/site.js`, set `MAIN_SITE_URL` to your main site URL.
- In arknights-website, set the **VITE_RANDOMIZER_URL** Actions secret to `https://randomizer.yourdomain.com` (no trailing slash).
- Add both origins to the backend **CORS_ORIGIN** if you use login on the main site.

## Local development

Open `index.html` with a local static server (ES modules need HTTP):

```bash
npx serve .
```

Then visit http://localhost:3000 (or the port shown).
