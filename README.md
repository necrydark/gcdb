# Grand Cross Database (GCDB)

A comprehensive database and community hub for the mobile game **Seven Deadly Sins: Grand Cross**. Built with modern web technologies to provide players with detailed character information, guides, news, and community features.

## 🚀 Features

- **Character Database**: Complete character stats, skills, and equipment information
- **News & Updates**: Latest game news and patch notes
- **Community Guides**: User-generated guides and strategies  
- **User Accounts**: Personal profiles, collections, and achievements
- **Real-time Search**: Advanced search functionality for characters and content
- **Mobile Responsive**: Optimized for both desktop and mobile devices
- **Dark Mode**: Built-in theme switching for comfortable viewing

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with Radix UI components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js with multiple providers
- **CMS**: Sanity for content management
- **Payments**: Stripe for premium subscriptions
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Sanity CMS account
- Stripe account (for payments)
- Resend account (for emails)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gcdb.git
   cd gcdb
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Fill in your environment variables in `.env` using the provided `.env.example` as a template.

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # Reusable UI components
├── actions/          # Server actions
├── lib/              # Utility libraries
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── utils/            # Helper functions
└── sanity/           # Sanity CMS configuration
```

## 🗄 Database Schema

The application uses Prisma as the ORM with the following main models:
- Users & Authentication
- Characters & Game Data
- User Collections & Profiles
- Guides & Community Content

## 🔧 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed         # Seed database with initial data
```

## 🤝 Contributing

We welcome contributions! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Netmarble for the Seven Deadly Sins: Grand Cross game
- The open-source community for the amazing tools and libraries
- All contributors who help make this project better

## 📞 Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Join our Discord community
- Check the troubleshooting section in our docs
