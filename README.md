# 🎨 Artisan's Corner — Multi-Vendor Marketplace

A full-stack **multi-vendor e-commerce marketplace** that enables artisans to create their own stores, showcase handcrafted products, and sell them securely. Customers can browse products, add items to their cart, make secure payments, leave reviews, and track their orders through an intuitive interface.

---

## 🌐 Live Application

- **Frontend:** https://artisans-corner-ten.vercel.app
- **Backend API:** https://artisans-corner-1zia.onrender.com
- **GitHub Repository:** https://github.com/adithkrishnar/artisans-corner

---

## 👤 Demo Credentials

### Demo Buyer
- **Email:** buyer@demo.com
- **Password:** demo123

### Demo Vendor
- **Email:** vendor@demo.com
- **Password:** demo123

---

## 💳 Stripe Test Card

| Card Number | Expiry | CVC |
|-------------|--------|-----|
| 4242 4242 4242 4242 | 12/29 | 123 |

---

## 🚀 Features

- Multi-vendor marketplace
- Secure JWT authentication
- Role-based access control
- Vendor store creation & management
- Product CRUD operations
- Cloudinary image uploads
- Shopping cart with local storage persistence
- Secure Stripe payment integration
- Automatic 5% platform commission
- Vendor analytics dashboard
- Verified buyer review system
- Order history & order tracking
- Responsive UI for desktop and mobile

---

## 🛠️ Tech Stack

### Frontend
- React
- Vite
- Redux Toolkit
- Tailwind CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Third-Party Services
- Stripe
- Cloudinary
- MongoDB Atlas

### Deployment
- Vercel
- Render

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/adithkrishnar/artisans-corner.git
cd artisans-corner
```

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGODB_URI=
JWT_SECRET=
STRIPE_SECRET_KEY=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=
```

---

## 📂 Project Structure

```
artisans-corner/
│── backend/
│── frontend/
│── docs/
│   └── database_diagram.png
│── README.md
```


---

## 📄 License

This project was developed for educational purposes as part of a full-stack web development project.
