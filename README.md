# 🏆 Leaderboard App

A sleek and modern leaderboard web app built with React and **Material UI**. Manage contestants, track scores, and handle knockouts — all with an admin login and persistent local storage. Perfect for competitions, games, or any ranking system!

---

## 🚀 Features

- **Admin Authentication**  
  Secure admin login with password protected by environment variable.

- **Contestant Management**  
  Add contestants with name and faction fields.

- **Score Tracking**  
  Update contestant scores dynamically.

- **Knockout System**  
  Mark contestants as knocked out (inactive) to strike through their name.

- **Persistent Storage**  
  Data is saved in browser local storage — no backend required.

- **Material UI Design**  
  Modern, responsive UI with Google’s Material Design principles.

---

## 🎨 Tech Stack

- React 18  
- Material UI v5  
- Vite (build tool)  
- Local Storage for data persistence  
- Vercel for deployment  

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+)  
- npm or yarn  

### Installation

```bash
git clone https://github.com/yourusername/leaderboard-app.git
cd leaderboard-app
npm install
```

## Environment Variables
Create a .env file in the root and add your admin password:
```
VITE_ADMIN_PASSWORD=yourSecretPassword
```
## Run Locally
```
npm run dev
```
Open http://localhost:5173 in your browser.

## 📦 Deployment

Deploy easily on [Vercel](https://vercel.com/):

Connect your repo.

Add the VITE_ADMIN_PASSWORD environment variable in Vercel settings.

Deploy!

## 🤝 Contributing

Contributions welcome! Feel free to open issues or pull requests.


##📄 License

MIT License © 2025 Josh

## Made with ❤️ and Material UI
