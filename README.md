# AMRR Tech - Item Management Web App

A modern full-stack web application for managing and viewing item listings, built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

---

## 🚀 Features

- Add new items with dynamic forms
- View item listings with loading states
- RESTful API using Next.js route handlers
- Elegant and accessible components using `@radix-ui/*` and `lucide-react`
- Uses NeonDB (PostgreSQL over Serverless)

---

## 🧠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Kit**: shadcn/ui (New York style), Radix UI, Lucide Icons
- **Database**: Neon Serverless PostgreSQL
- **ORM/DB Utils**: Custom SQL scripts and utility helpers
- **State/UI Management**: Native React, dialogs, and modals via Radix
- **Build Tools**: PNPM, PostCSS
- **Linting/Types**: ESLint, TypeScript, @types

---

## 📁 Folder Structure

```
kashyap-mokariya-amrr-tech/
│
├── app/                  # App router pages
│   ├── add-items/        # Add item form page
│   ├── view-items/       # View listing page
│   └── api/items/        # REST API handlers
│
├── components/           # UI and reusable components
│   └── ui/               # Shared UI components (input, dialog, etc.)
│
├── lib/                  # Database and utility functions
├── scripts/              # SQL setup scripts
├── public/               # Static files
├── styles/               # Global styles
├── README.md             # Project documentation
└── package.json          # Project metadata and dependencies
```

---

## 🌐 Live Demo  

🔗 **Deployed Project:** [https://amrr-tech.vercel.app/](https://amrr-tech.vercel.app/)  

## 🛠️ How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/Kashyap-Mokariya/amrr-tech
cd amrr-tech
```

### 2. Install Dependencies

```bash
pnpm install
```

> Ensure you have **pnpm** installed. If not, run:

```bash
npm install -g pnpm
```

### 3. Set up Environment Variables

Create a `.env.local` file in the root directory:

```env
DATABASE_URL=your_neondb_connection_string
```

> Replace `your_neondb_connection_string` with your actual NeonDB URL.

### 4. Setup the Database

Run the SQL files from the `scripts/` folder to create and seed tables:

```bash
psql $DATABASE_URL < scripts/001-create-items-table.sql
psql $DATABASE_URL < scripts/002-seed-items.sql
```

### 5. Start the Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📌 Notes & Assumptions

- Assumes a working NeonDB connection string.
- Build ignores ESLint and TypeScript errors (for now).
- Remote image domains are allowed by default.
- Uses modern `app/` directory from Next.js 15.
- No authentication is implemented yet.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify it for your own needs.

---

## 👤 Author

**Kashyap Mokariya**  
Developed for AMRR Tech internship submission.