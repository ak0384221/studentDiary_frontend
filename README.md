# 📘 StudentDiary Frontend — Next.js Client

<p align="center">
  A full-stack academic management system for managing students, homework, and automated notifications.
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation--setup">Setup</a> •
  <a href="#-api-overview">API</a> •
  <a href="#-future-improvements">Roadmap</a>
</p>

## 🚀 Features

- ⚡ Built with Next.js (App Router)
- 🎨 Clean and responsive UI with Tailwind CSS
- 🧠 Schema validation using Zod
- 🔄 Optimized rendering (SSR / CSR hybrid)
- 📱 Mobile-first responsive design
- 🔌 Integrated with backend APIs
- 🧩 Modular and scalable folder structure

---

## 🛠️ Tech Stack

| Layer      | Technology                     |
| ---------- | ------------------------------ |
| Backend    | Node.js, Express, TypeScript   |
| Database   | PostgreSQL (Neon), Drizzle ORM |
| Frontend   | React / Next.js, Tailwind CSS  |
| Automation | node-cron                      |
| Tools      | Git, Postman, Vercel, Render   |

---

| Layer      | Technology   |
| ---------- | ------------ |
| Framework  | Next.js 16   |
| UI Library | React 19     |
| Styling    | Tailwind CSS |
| Validation | Zod          |
| Language   | TypeScript   |
| Tooling    | ESLint       |

## 📂 Project Structure

```
frontend/
├── src/
│   ├── app/
│   ├── components/
│   ├── features/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── .env
├── package.json
└── README.md



```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/studentdiary-frontend.git
cd studentdiary-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

```env

Create a `.env` file in the root directory:
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
```

### 4. Run the server

```bash
npm run dev
```

---

## 📜 Available Scripts

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run start   # Run production server
npm run lint    # Run ESLint
```

---

## 🔌 API Integration

The frontend communicates with backend endpoints such as:

```bash
/api/v1/students
/api/v1/student/:id
/api/v1/homeworks
/api/v1/homework/:id
```

All API calls are abstracted inside the features/\*/api layer for maintainability.

## 🎯 Core UI Modules

- 📊 Student Dashboard
- 🧾 Homework Management UI
- 📈 Analytics View
- 🔔 Notification UI (planned)

## 📈 Future Improvements

- 🔐 Authentication UI (Login / Signup)
- 📊 Advanced analytics dashboard
- ⚡ State management (Zustand / Redux)
- 🌐 SEO optimization & metadata

---

## 🤝 Contributing

Contributions are welcome.

```bash
# Fork the repo
# Create a new branch
git checkout -b feature/your-feature

# Commit changes
git commit -m "Add your feature"

# Push
git push origin feature/your-feature
```

Then open a Pull Request.

---

## 📄 License

This project is licensed under the MIT License.

---

## 👤 Author

**Belal Hossain**

- GitHub: https://github.com/ak0384221
- LinkedIn: https://linkedin.com/in/md-bellal-hossain-50a027373

---

<p align="center">⭐ Star this repo if you found it useful</p>
