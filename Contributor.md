# **Contributing Guidelines** 📄

This documentation contains a set of guidelines to help you during the contribution process for **SentiLog AI**.
We are happy to welcome all the contributions from anyone willing to improve/add new features to this project.
Thank you for helping out and remember, **no contribution is too small.**

Please note we have a [code of conduct](CODE_OF_CONDUCT.md) - please follow it in all your interactions with the project.

## **Need some help regarding the basics?🤔**

You can refer to the following articles on basics of Git and Github and also contact the Project Maintainers,
in case you are stuck:

- [Forking a Repo](https://help.github.com/en/github/getting-started-with-github/fork-a-repo)
- [Cloning a Repo](https://help.github.com/en/desktop/contributing-to-projects/creating-an-issue-or-pull-request)
- [How to create a Pull Request](https://opensource.com/article/19/7/create-pull-request-github)
- [Getting started with Git and GitHub](https://towardsdatascience.com/getting-started-with-git-and-github-6fcd0f2d4ac6)
- [Learn GitHub from Scratch](https://docs.github.com/en/get-started/start-your-journey/git-and-github-learning-resources)


## **Project Structure** 🏗️

```bash
SentiLog-AI/
│
├── client/                    # React frontend (Vite + Tailwind)
│   ├── public/               # Static assets
│   ├── src/                  # Source files
│   │   ├── pages/            # JournalPage, NewsPage, Dashboard
│   │   ├── components/       # Reusable components (Navbar, SentimentCard, etc.)
│   │   ├── App.jsx           # Main React component
│   │   └── main.jsx          # React entry point
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   └── tailwind.config.js    # Tailwind CSS configuration
│
├── server/                   # Node.js + Express backend
│   ├── controllers/          # Business logic controllers
│   ├── middleware/           # Custom middleware functions
│   ├── models/               # MongoDB schemas using Mongoose
│   ├── routes/               # API routes (journal.js, news.js)
│   ├── index.js              # Express server entry point
│   ├── package.json          # Backend dependencies
│   └── .env.example          # Environment variables template
│
├── ml-api/                   # Python Flask ML microservice
│   ├── app.py                # Flask application entry point
│   ├── .env.example          # ML API environment variables
│   └── requirements.txt      # Python dependencies
│
├── .gitignore                # Files to ignore in Git
├── package-lock.json         # Root package lock file
├── package.json              # Root package configuration
├── README.md                 # Project overview and setup
└── LICENSE                   # MIT License
```


## **Development Setup** 🛠️

### **Prerequisites**

- Node.js (v16 or higher)
- Python (v3.8 or higher)
- MongoDB (local or cloud instance)
- Git


### **Environment Setup**

1. Copy `.env.example` files in both `server/` and `ml-api/` directories
2. Fill in your MongoDB URI and other required secrets
3. Ensure all three services can communicate (default ports: React:5173, Express:5000, Flask:5001)

## **Steps to Contribute Using the Command Line** 💻

1. **Fork the Repository:**
Click on the "Fork" button on the top right of the repository page on GitHub to create your own copy.
2. **Clone the Repository:**

```bash
git clone https://github.com/your-username/SentiLog-AI.git
```

3. **Navigate to the Project Directory:**

```bash
cd SentiLog-AI
```

4. **Create a New Branch:**

```bash
git checkout -b feature/your-feature-name
```

Use prefixes like `feature/`, `fix/`, `docs/`, or `refactor/` for better organization.

5. **Set Up Your Development Environment:**

**Frontend Setup:**
```bash
cd client
npm install
npm run dev
```

**Backend Setup:**

```bash
cd ../server
npm install
npm run dev
```

**ML API Setup:**

```bash
cd ../ml-api
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

6. **Make Your Changes:**
    - **Frontend contributions:** Work in the `client/` directory
    - **Backend contributions:** Work in the `server/` directory
    - **ML/AI contributions:** Work in the `ml-api/` directory
7. **Test Your Changes:**
    - Ensure all services are running and communicating properly
    - Test API endpoints using tools like Postman or curl
    - Verify frontend functionality in the browser
8. **Stage and Commit Changes:**

```bash
git add .
git commit -m "feat: add sentiment analysis for journal entries"
```

**Commit Message Convention:**
    - `feat:` for new features
    - `fix:` for bug fixes
    - `docs:` for documentation updates
    - `style:` for code style changes
    - `refactor:` for code refactoring
    - `test:` for adding tests
9. **Push Changes to GitHub:**

```bash
git push origin feature/your-feature-name
```

10. **Create a Pull Request:**
    - Go to your forked repository on GitHub
    - Click "Compare \& pull request"
    - Use the format: `[Component]: Description` (e.g., `[Frontend]: Add mood tracking dashboard`)
    - Provide detailed description of changes and add screenshots if applicable

## **Alternatively Contribute Using GitHub Desktop** 🖥️

1. **Open GitHub Desktop:** Launch GitHub Desktop and log in to your GitHub account.
2. **Clone the Repository:** Use File > Clone Repository and select SentiLog-AI.
3. **Switch to the Correct Branch:** Create a new branch for your feature using the branch dropdown.
4. **Make Changes:** Work in your preferred code editor on the appropriate component (client/, server/, or ml-api/).
5. **Commit Changes:** Stage your files and write a descriptive commit message following our convention.
6. **Push Changes:** Click "Push origin" to push your branch to GitHub.
7. **Create a Pull Request:** Follow the same PR creation process as described above.

## **Areas for Contribution** 🎯

### **Frontend (React + Vite + Tailwind)**

- UI/UX improvements for journal and news pages
- Data visualization components for sentiment trends
- Responsive design enhancements
- New dashboard features and analytics


### **Backend (Node.js + Express + MongoDB)**

- API endpoint development and optimization
- Database schema improvements
- Authentication and authorization features
- Data aggregation and analytics endpoints


### **ML API (Python + Flask)**

- Sentiment analysis model improvements
- Emotion detection capabilities
- News sentiment analysis enhancements
- Model performance optimization


### **General**

- Documentation improvements
- Testing (unit, integration, end-to-end)
- Performance optimizations
- Security enhancements


## **Pull Request Process** 🚀

1. **Self-review your code** - Ensure clean, well-commented code
2. **Add proper descriptions** - Explain what your code does and why
3. **Include comments** - Especially in complex logic areas
4. **Add screenshots** - For UI changes, include before/after images
5. **Update documentation** - If you're adding new features or changing APIs
6. **Test thoroughly** - Ensure your changes don't break existing functionality
7. **Follow coding standards** - Maintain consistency with existing codebase

**PR Title Format:** `[Component]: Brief description`

- Examples: `[Frontend]: Add mood trend visualization`, `[ML-API]: Improve sentiment accuracy`


## **Issue Report Process** 📌

1. **Check existing issues** - Avoid duplicates by searching first
2. **Use issue templates** - Follow the provided templates for bugs/features
3. **Provide detailed descriptions** - Include steps to reproduce, expected behavior, screenshots
4. **Label appropriately** - Use labels like `bug`, `enhancement`, `frontend`, `backend`, `ml-api`
5. **Wait for assignment** - Don't start working until you're assigned to avoid conflicts
6. **Ask questions** - If anything is unclear, comment on the issue

## **Development Guidelines** 📝

### **Code Style**

- **Frontend:** Follow React best practices, use functional components with hooks
- **Backend:** Use async/await, proper error handling, and follow RESTful conventions
- **ML API:** Follow PEP 8 for Python code style
- **General:** Use meaningful variable names and add comments for complex logic


### **Testing**

- Write unit tests for new functions and components
- Ensure integration tests pass for API endpoints
- Test cross-browser compatibility for frontend changes


### **Documentation**

- Update README.md if adding new setup steps
- Document new API endpoints in appropriate files
- Add inline comments for complex algorithms or business logic


## **Community Guidelines** 🤝

- **Be respectful** - Treat all contributors with respect and kindness
- **Be inclusive** - Welcome contributors of all skill levels
- **Be collaborative** - Help others and ask for help when needed
- **Be patient** - Code reviews take time; maintainers are volunteers


## **Getting Help** 💬

**Project Admin:** [Vivek Prakash](https://github.com/IkkiOcean)

- **GitHub Issues:** [SentiLog-AI Issues](https://github.com/openml-stack/SentiLog-AI/issues)

**Quick Help Resources:**

- Check the README.md for setup instructions
- Browse existing issues and PRs for similar problems
- Review the project structure section above


## **Recognition** 🏆

All contributors will be:

- Listed in our Contributors section
- Mentioned in release notes for significant contributions
- Eligible for contributor badges and recognition
- Part of our growing open-source community


## **Thank you for contributing!** 💗

We truly appreciate your time and effort to help improve SentiLog AI. Whether you're fixing a typo, adding a new feature, or improving our ML models, every contribution makes a difference.

Together, let's build the future of mood and news sentiment analysis! 🚀

**Happy coding!** ✨

