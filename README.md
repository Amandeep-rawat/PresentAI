# 🚀 PresentAI – AI Powered Presentation Builder

✨ **PresentAI** is a modern, AI-powered platform that helps you generate stunning, ready-to-present slides in seconds — just by describing your topic. Built with cutting-edge technologies and intelligent APIs, PresentAI empowers users to go from idea to presentation with creativity, speed, and ease.

🔗 **Live Project**: [https://present-ai-three.vercel.app/](https://present-ai-three.vercel.app/)

---

## 🖥️ Home Page

- Sleek, modern UI with responsive design
- Animated landing page built with **Framer Motion**
- Demo video integrated via **Cloudinary**
- “Start Free Trial” CTA with **Clerk authentication**
- Fully protected routes and transitions

---

## 🔐 Authentication

- Secure signup/signin powered by **Clerk**
- Custom authentication routes with full protection
- User can update profile via Clerk’s `UserButton`

---

## 🧠 AI-Powered Presentation Creation

- Users receive **1 free credit** to create their first presentation
- Choose between:
  - **Creative-AI** mode (powered by Cohere API)
- Enter a prompt and let the AI:
  - Generate outlines (slide titles)
  - Create slide content
  - Suggest relevant images via **ClipDrop API** or **Unsplash API**
- Select from multiple beautiful themes
- Data is stored securely in **Neon DB** using **Prisma ORM**

---

## 🎨 UI/UX Highlights

- Built using **Next.js**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**
- Clean sidebar with responsive dark/light themes via `next-themes`
- Outstanding responsiveness across **desktop and mobile**
- Resizable columns for custom layout experience
- Drag-and-drop slides with rich interaction

---

## 📁 Project Management

- Authenticated users land on a **dashboard** after login
- Dashboard shows all projects, sorted by creation time
- Users can:
  - View
  - Delete (moves to Trash)
  - Restore from Trash
  - Permanently delete
- Trash management system included

---

## 🧩 Slide Features

- AI-generated slides with:
  - Headings
  - Paragraphs
  - Images via URL (Unsplash-compliant, no direct uploads)
- Users can:
  - Manually edit text
  - Add their own images
  - Add custom blocks (e.g. H2, Paragraph on desktop)
- Slideshow mode with full-screen “**Present**” button

---

## ⚙️ Other Features

- 🌗 Dark and Light Mode toggle
- 🕒 Time tracking: see when a project was created
- 📱 Fully responsive on desktop + mobile
- 🧠 Zustand for global state management
- 🔐 Protected routes everywhere
- 🚧 Template & Settings pages coming soon
- 💰 Payment integration coming soon

---

## 🔧 Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Framer Motion, Lucide React
- **State Management**: Zustand
- **Backend**: Prisma, Neon DB
- **Auth**: Clerk
- **APIs**:
  - Cohere (text generation)
  - ClipDrop (image generation)
  - Unsplash (fallback image source)
- **Storage**: Cloudinary (only for demo videos)
- **HTTP**: Axios
- **Hosting**: Vercel

---

## 🧪 Future Improvements

- ✅ Payment system for premium credits
- ✅ More themes and templates
- ✅ Collaborative editing
- ✅ Voice-over narration feature
- ✅ Export as PDF/PowerPoint

---

## 📸 Screenshots

> Coming soon...

---

## 📬 Feedback

If you have any feedback or ideas, feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/amandeep-rawat-1622a82ba/) or raise an issue.

---

## 🛠️ Developed by

**Amandeep Rawat** – Passionate Full Stack Developer  
`Next.js • React • Express • Prisma • MongoDB • AI APIs • Tailwind CSS`

---

