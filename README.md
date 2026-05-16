# Goregaonkar Traders Website

This repository contains the public website for Goregaonkar Traders, including:

- `index.html` — the full landing page with classes, enrollment form, and payment call-to-action
- `thank-you.html` — confirmation page after enrollment submission
- Static page design for GitHub Pages
- Optional local Node.js backend to receive and store enrollment submissions

## What is included

- Hero section
- Features section
- Classes section with enrollment buttons
- About section
- Testimonials
- Contact information
- Enrollment form section with FormSubmit integration
- Payment buttons for Google Pay / PayPal
- Thank you page for form submissions

## Setup before publishing

### 1. Configure Enrollment Form

The enrollment form is pre-configured to use FormSubmit.co. To receive submissions:

1. Go to [FormSubmit.co](https://formsubmit.co) and create a free account
2. Use your email (hello@goregaonkartraders.com) or create a custom endpoint
3. The form will send you email notifications with enrollment data
4. Submissions are also stored in your FormSubmit dashboard

### 2. Set Up Payment Links

Update the payment links in `index.html` for each class:

#### Google Pay (UPI):
- Replace `goregaonkartraders@upi` with your actual UPI ID
- Format: `https://pay.google.com/gp/p/ui/pay?pa=YOUR_UPI_ID&pn=Goregaonkar%20Traders&am=AMOUNT&cu=INR`

#### PayPal:
- Create a PayPal.me link at [paypal.me](https://paypal.me)
- Replace `goregaonkartraders` with your PayPal.me username
- Format: `https://www.paypal.com/paypalme/YOUR_USERNAME/AMOUNT`

### 3. Update Contact Information

Verify and update:
- Phone numbers in the contact section
- Email addresses in the form action and contact section
- Location information

### 4. Optional: Custom Branding

Replace the hero background image and logo URL with your own assets.

## Run Locally with Backend

1. Install dependencies:

```bash
npm install
```

2. Start the local server:

```bash
npm start
```

3. Open the site in your browser:

```bash
http://localhost:3000
```

4. Submit the enrollment form to save requests to `submissions.json` and redirect to the thank-you page.

## Enrollment Flow

1. Customer clicks "Enroll Now" on a class card
2. Page scrolls to enrollment section and pre-selects the class
3. Customer fills out the form (name, email, phone, message)
4. Form submits to FormSubmit and redirects to thank-you page
5. Customer receives confirmation email
6. Customer selects payment method and clicks "Pay Now"
7. Payment link opens in new tab for secure payment
8. You receive payment notification from Google Pay/PayPal

## Publish on GitHub Pages

1. Copy all files from this folder into the repository root.
2. Commit and push the repository to GitHub.
3. In GitHub, go to `Settings` > `Pages`.
4. Under `Source`, choose the `main` branch and `/ (root)` folder.
5. Save. Your site will be available at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`.

### Automated deployment via GitHub Actions

This repository includes a GitHub Actions workflow that will automatically publish the repository root to GitHub Pages whenever you push to the `main` branch. To use it:

1. Initialize a git repo (if you haven't):

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
```

2. Create a new repository on GitHub and add it as a remote, then push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

3. After the push completes, GitHub Actions will run the workflow and publish the site to GitHub Pages. You can watch the progress in the repository's Actions tab.

Note: GitHub Pages only serves static sites. The included `server.js` is a Node.js backend and cannot run on GitHub Pages. If you need the backend for form storage or email notifications, host it separately (Render, Heroku, Vercel, or a VPS) and update the form `action` and API endpoints accordingly. If you'd like, I can help set up backend hosting as a next step.

## Local git commands

From this directory:

```bash
git add index.html thank-you.html README.md
git commit -m "Add landing page with enrollment system and deployment instructions"
git branch -M main
```

Then add a remote and push:

```bash
git remote add origin https://github.com/shastrinaman40/goregaonkar-trading-classes.git
git push -u origin main
```

## Notes

- This is a static site. Payment buttons use links, which is compatible with GitHub Pages.
- For a fully custom checkout flow, add a backend service or use a payment provider that supports hosted payment links.

