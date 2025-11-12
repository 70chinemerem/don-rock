# Contact Form Submission Setup Guide

## Current Status
The contact form is currently set to simulate submission (for testing). To make it actually send emails, you need to configure one of the options below.

## Option 1: EmailJS (Recommended - Easiest)

EmailJS is a free service that sends emails directly from your frontend without a backend.

### Setup Steps:

1. **Sign up for EmailJS** (free tier available)
   - Go to https://www.emailjs.com/
   - Create a free account
   - You get 200 emails/month free

2. **Create an Email Service**
   - In EmailJS dashboard, go to "Email Services"
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Connect your email account

3. **Create an Email Template**
   - Go to "Email Templates"
   - Click "Create New Template"
   - Use this template:
   ```
   Subject: New Contact Form Submission - {{subject}}
   
   From: {{from_name}} ({{from_email}})
   Phone: {{phone}}
   Product Interest: {{product}}
   Quantity: {{quantity}} tons
   
   Message:
   {{message}}
   ```

4. **Get Your Credentials**
   - Go to "Account" → "General"
   - Copy your Public Key
   - Note your Service ID and Template ID

5. **Update the Code**
   - Open `src/main.js`
   - Find the `submitForm()` function (around line 339)
   - Uncomment and update the EmailJS section:

```javascript
// Add EmailJS script to index.html first (in <head>):
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// Then in submitForm() function, replace the current code with:
async function submitForm(formData) {
    // Initialize EmailJS (only once)
    if (typeof emailjs === 'undefined') {
        emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your Public Key
    }
    
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        product: formData.product || 'Not specified',
        quantity: formData.quantity || 'Not specified',
        subject: formData.subject,
        message: formData.message
    });
}
```

6. **Add EmailJS Script to HTML**
   - Open `index.html`
   - Add this before the closing `</head>` tag:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

---

## Option 2: Backend API (For Custom Backend)

If you have your own backend server (Node.js, PHP, Python, etc.)

### Setup Steps:

1. **Create API Endpoint**
   - Example: `https://yourdomain.com/api/contact`
   - Accept POST requests with JSON data

2. **Update the Code**
   - Open `src/main.js`
   - Find the `submitForm()` function
   - Uncomment and update the API section:

```javascript
async function submitForm(formData) {
    const response = await fetch('https://yourdomain.com/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit form');
    }
    
    return response.json();
}
```

3. **Backend Example (Node.js/Express)**
```javascript
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, product, quantity, subject, message } = req.body;
    
    // Send email using nodemailer or similar
    // Or save to database
    
    res.json({ success: true });
});
```

---

## Option 3: Formspree (No Code Required)

Formspree is a form backend service.

### Setup Steps:

1. **Sign up for Formspree**
   - Go to https://formspree.io/
   - Create a free account (50 submissions/month free)

2. **Create a Form**
   - Get your form endpoint (e.g., `https://formspree.io/f/YOUR_FORM_ID`)

3. **Update the HTML**
   - Open `index.html`
   - Find the contact form
   - Add `action` and `method` attributes:

```html
<form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST" class="space-y-6">
```

4. **Update JavaScript**
   - Remove the `e.preventDefault()` in the submit handler
   - Or update `submitForm()` to use Formspree API

---

## Option 4: Google Apps Script (Free)

Use Google Sheets + Apps Script to receive form submissions.

### Setup Steps:

1. **Create Google Sheet**
   - Create a new Google Sheet
   - Add headers: Name, Email, Phone, Product, Quantity, Subject, Message

2. **Create Apps Script**
   - Tools → Script Editor
   - Create a web app that accepts POST requests
   - Deploy as web app

3. **Update Code**
   - Use the Apps Script URL in your `submitForm()` function

---

## Quick Setup: EmailJS (Recommended)

The easiest option is EmailJS. Here's the complete setup:

### Step 1: Add EmailJS to HTML
Add this line in `index.html` before `</head>`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

### Step 2: Update main.js
Replace the `submitForm()` function in `src/main.js` with:

```javascript
async function submitForm(formData) {
    // Initialize EmailJS
    emailjs.init('YOUR_PUBLIC_KEY'); // Get from EmailJS dashboard
    
    return emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        product: formData.product || 'Not specified',
        quantity: formData.quantity || 'Not specified',
        subject: formData.subject,
        message: formData.message
    });
}
```

### Step 3: Get Your Credentials from EmailJS
1. Public Key: Account → General
2. Service ID: Email Services → Your Service
3. Template ID: Email Templates → Your Template

---

## Testing

After setup, test the form:
1. Fill out all required fields
2. Submit the form
3. Check your email inbox
4. Check browser console for any errors

---

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- Formspree Docs: https://help.formspree.io/
- Check browser console for error messages

