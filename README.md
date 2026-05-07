# Goregaonkar Traders Website

This repository contains the public website for Goregaonkar Traders, including:

- `index.html` — the full landing page with classes, enrollment form, and payment call-to-action
- Static page design for GitHub Pages

## What is included

- Hero section
- Features section
- Classes section with enrollment buttons
- About section
- Testimonials
- Contact information
- Enrollment form section
- Payment buttons for Stripe / PayPal

## Setup before publishing

1. Open `index.html` and replace the form action placeholder:

```html
<form id="enroll-form" class="enroll-form" action="https://formsubmit.co/YOUR_EMAIL" method="POST">
```

Replace `YOUR_EMAIL` with your email or your FormSubmit endpoint.

2. Replace payment links with your actual payment URLs inside each class card in `index.html`.

Each class card contains `data-stripe-link` and `data-paypal-link` placeholders. Update those values with your real Stripe Checkout or PayPal payment links.

3. Optionally replace the hero and logo image URL with your own branding.

## Publish on GitHub Pages

1. Copy all files from this folder into the repository root.
2. Commit and push the repository to GitHub.
3. In GitHub, go to `Settings` > `Pages`.
4. Under `Source`, choose the `main` branch and `/ (root)` folder.
5. Save. Your site will be available at `https://shastrinaman40.github.io/goregaonkar-trading-classes/`.

## Local git commands

From this directory:

```bash
git add index.html README.md
git commit -m "Add landing page and deployment instructions"
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

