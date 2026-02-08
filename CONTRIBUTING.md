# Contributing to Grand Cross Database

Thank you for your interest in contributing to GCDB! This guide will help you get started with contributing to the project.

## 🤝 How to Contribute

### Reporting Issues

- **Bug Reports**: If you find a bug, please create an issue with:
  - Clear description of the problem
  - Steps to reproduce
  - Expected vs actual behavior
  - Environment details (OS, browser, etc.)

- **Feature Requests**: For new features, please provide:
  - Clear description of the feature
  - Use case and why it's valuable
  - Any implementation ideas

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/yourusername/gcdb.git
   cd gcdb
   ```

2. **Set up upstream remote**
   ```bash
   git remote add upstream https://github.com/originalusername/gcdb.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

5. **Make your changes and test**
   ```bash
   npm run dev
   npm run lint
   npm run build  # Ensure build doesn't break
   ```

6. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

7. **Push and create a pull request**
   ```bash
   git push origin feature/your-feature-name
   ```

## 📝 Code Style Guidelines

### TypeScript/JavaScript
- Use TypeScript for all new files
- Follow existing naming conventions
- Use descriptive variable and function names
- Add JSDoc comments for complex functions

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Use proper TypeScript types
- Keep components focused and reusable

### CSS/Tailwind
- Use Tailwind CSS classes
- Follow the existing design system
- Keep styles responsive and accessible

## 🎯 Areas for Contribution

We welcome contributions in several areas:

### 🐛 Bug Fixes
- UI/UX issues
- Performance problems
- Mobile responsiveness
- Cross-browser compatibility

### ✨ New Features
- Enhanced search functionality
- Data visualization
- User experience improvements
- Mobile app features

### 📚 Documentation
- API documentation
- User guides
- Code comments
- README improvements

### 🎨 Design
- UI/UX improvements
- Component redesign
- Dark mode enhancements
- Accessibility improvements

### 🔧 Data & Content
- Character data updates
- Game content verification
- Guide contributions
- Translation support

## 🔄 Pull Request Process

1. **Ensure your PR is descriptive**
   - Clear title and description
   - Link to related issues
   - Screenshots for UI changes

2. **Keep PRs focused**
   - One feature or bug fix per PR
   - Small, atomic changes
   - Clear commit history

3. **Testing requirements**
   - Test your changes thoroughly
   - Ensure no existing functionality breaks
   - Check mobile and desktop views

4. **Code review**
   - Be responsive to feedback
   - Address review comments promptly
   - Keep discussions constructive

## 🏷 Commit Message Convention

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix  
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Examples:
```
feat: add character comparison tool
fix: resolve mobile layout issues
docs: update API documentation
```

## 🚫 What Not to Do

- Don't commit sensitive data (API keys, passwords)
- Don't make breaking changes without discussion
- Don't ignore code review feedback
- Don't submit PRs with merge conflicts
- Don't submit large, unfocused changes

## 💬 Getting Help

- **Discord**: Join our community Discord
- **GitHub Issues**: Create an issue for questions
- **Discussions**: Use GitHub Discussions for ideas
- **Documentation**: Check existing docs first

## 🎉 Recognition

Contributors are recognized in:
- README contributors section
- In-app credits page
- Release notes
- Community highlights

Thank you for contributing to GCDB! 🎮