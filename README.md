# Ticketery 🎫

A full‑stack application for selling tickets with integrated PayPal checkout and QR‑code generation.

---

## Features
- Create events and ticket types (price, quantity, etc)
- Checkout via PayPal “Buy Now” button
- Generate QR codes for purchased tickets
- Manage orders, view ticket sales ( not yet, will do when i feel like it )
---

## Tech Stack
- **Frontend**: React.js ( tailwindcss )
- **Backend**: Express.js (Node.js)
- **Database**: PostgreSQL ( prisma.js for sync ) 
- **Billing**: PayPal button integration
- **Environment**: Node.js, npm/yarn

---

## Getting Started

### Prerequisites
- Node.js and npm (or yarn)
- PostgreSQL database
- PayPal account / API credentials
- Environment variables (see below)

### Installation
1. Clone the repository:
```bash
git clone https://github.com/vNullptr/ticketery.git
cd ticketery
```
2. Install dependencies 
```bash
cd server
npm install
cd ../client
npm install
```
3. too lazy to explain ( needs postgres setup + paypal dev app creation and setup in .env)
good luck

