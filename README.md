# EnglishLab - Frontend

Progressive Web App for learning English at all levels.

## Features

- 📱 **Progressive Web App** - Works offline, installable on mobile
- 🎓 **Interactive Lessons** - Multi-step lessons with quizzes
- 👥 **User Authentication** - Secure login with Firebase
- 📊 **Progress Tracking** - Track your learning progress
- 🎨 **Beautiful UI** - Modern design with Tailwind CSS
- 📚 **All Levels** - Beginner, Intermediate, Advanced

## Tech Stack

- React 18
- Tailwind CSS
- Firebase (Authentication & Firestore)
- React Router

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file with your Firebase credentials:
   ```
   REACT_APP_FIREBASE_API_KEY=your_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/       # Reusable components
├── pages/           # Page components
├── firebase.js      # Firebase configuration
├── App.js           # Main app component
└── index.css        # Global styles
```

## Available Pages

- `/` - Home page
- `/register` - User registration
- `/login` - User login
- `/dashboard` - User dashboard
- `/lessons` - All lessons
- `/lesson/:id` - Individual lesson
- `/profile` - User profile

## PWA Features

- Service worker for offline support
- Manifest file for installation
- Responsive design for all devices

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT
