# Made in Sudan Registration

Registration page for Made in Sudan, an IEEE event. You fill in your name,
email and phone number, and the page gives you an ID and a QR code to show
at the entrance.

## What it does

- Registration form with full name, email, phone number and gender
- Makes a short ID from your email and phone number
- Turns that ID into a QR code you can scan at the door
- Checks the form before making the ID. Anything missing or wrong turns red
  with a short note under it:
  - Name: letters only (Arabic or English), at least first and last name
  - Email: has to look like a real email
  - Phone: a Sudanese number, +249 and 9 digits. If you start with 0, it
    gets changed to +249 for you
  - Gender: pick male or female
- Works on phones, tablets and desktop
