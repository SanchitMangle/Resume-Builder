# ResumeAI - AI-Powered Professional Resume Builder

ResumeAI is a modern, full-stack web application designed to help professionals create stunning, ATS-optimized resumes in minutes. Leveraging the power of AI, ResumeAI provides content suggestions, real-time analysis, and seamless PDF exports, all within a sleek and intuitive interface.

🌐 Live Demo

👉 Try ResumeAI here:[ResumeAI](https://resume-builder-ruby-six.vercel.app/)

## 🚀 Features

- **AI Resume Parsing**: Upload your existing resume (PDF or Text) and let AI automatically extract and organize your data.
- **Smart Content Enhancement**: Use AI to polish your professional summary and job descriptions for maximum impact.
- **Real-time ATS Score**: Get immediate feedback on how well your resume matches a job description with keyword analysis.
- **Live Preview**: See your changes in real-time with beautiful, professionally designed templates.
- **Interactive Dashboard**: Manage multiple resumes, rename them, and keep track of your applications.
- **Modern UI/UX**: A state-of-the-art interface built with Framer Motion for smooth transitions and a premium feel.
- **Autosave**: Never lose your progress with our background synchronization.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms & Validation**: React Hook Form + Zod
- **Client-side PDF Parsing**: `react-pdftotext`

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **AI Integration**: Google Gemini (via OpenAI SDK compatibility)
- **File Handling**: Multer + ImageKit for cloud storage
- **Logging**: Pino

## 📁 Project Structure

```text
├── client/                # Frontend React application
│   ├── src/
│   │   ├── api/           # API service layers
│   │   ├── components/    # Reusable UI components
│   │   ├── features/      # Redux slices and logic
│   │   └── pages/         # Page-level components
├── server/                # Backend Express application
│   ├── config/            # Database and service configurations
│   ├── controllers/       # Route handlers
│   ├── models/            # Mongoose schemas
│   ├── routes/            # API endpoints
│   └── services/          # Business logic and AI integration
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Local or Atlas)
- Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/resume-ai.git
   cd resume-ai
   ```

2. **Setup the Backend**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   OPENAI_BASE_URL=https://generativelanguage.googleapis.com/v1beta/openai/
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   ```

3. **Setup the Frontend**
   ```bash
   cd ../client
   npm install
   ```
   Create a `.env` file in the `client` directory:
   ```env
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

### Running the Application

1. **Start the Backend**
   ```bash
   cd server
   npm run dev
   ```

2. **Start the Frontend**
   ```bash
   cd client
   npm run dev
   ```

Visit `http://localhost:5173` to start building!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
