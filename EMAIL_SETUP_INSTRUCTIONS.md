# Quick Setup: Send Form to Your Email

## Simple 5-Minute Setup

Your form is ready to send emails to **donrockglobalservicesltd@gmail.com**. Just follow these steps:

### Step 1: Sign Up for EmailJS (Free)
1. Go to **https://www.emailjs.com/**
2. Click "Sign Up" (it's free - 200 emails/month)
3. Sign up with your Google account or email
4. Verify your email address

### Step 2: Connect Your Gmail
1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Select **"Gmail"**
4. Click **"Connect Account"**
5. Sign in with: **donrockglobalservicesltd@gmail.com**
6. Allow permissions
7. **Copy your Service ID** (looks like: `service_abc123`)

### Step 3: Create Email Template
1. Click **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

**Template Name:** Contact Form Submission

**Subject:**
```
New Contact Form: {{subject}}
```

**Content:**
```
You have a new contact form submission from your website:

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

Product Interest: {{product}}
Quantity: {{quantity}} tons

Subject: {{subject}}

Message:
{{message}}

---
Reply to: {{reply_to}}
```

4. **Copy your Template ID** (looks like: `template_xyz789`)

### Step 4: Get Your Public Key
1. Click **"Account"** → **"General"**
2. Find **"Public Key"**
3. **Copy your Public Key** (looks like: `abcdefghijklmnop`)

### Step 5: Update Your Code
1. Open `src/main.js`
2. Find the `submitForm` function (around line 339)
3. Replace these three values:
   - `YOUR_PUBLIC_KEY_HERE` → Your Public Key
   - `YOUR_SERVICE_ID_HERE` → Your Service ID
   - `YOUR_TEMPLATE_ID_HERE` → Your Template ID

**Example:**
```javascript
const EMAILJS_PUBLIC_KEY = 'abc123xyz'; // Your actual Public Key
const EMAILJS_SERVICE_ID = 'service_abc123'; // Your actual Service ID
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Your actual Template ID
```

### Step 6: Test It!
1. Fill out the contact form on your website
2. Click "Send Message"
3. Check your email: **donrockglobalservicesltd@gmail.com**
4. You should receive the form submission!

---

## That's It! 🎉

Your form will now send all submissions directly to your Gmail inbox.

## Troubleshooting

**Not receiving emails?**
- Check spam folder
- Verify EmailJS service is connected
- Check browser console for errors (F12)
- Make sure all three IDs are correct

**Need help?**
- EmailJS Docs: https://www.emailjs.com/docs/
- Check the browser console (F12) for error messages

