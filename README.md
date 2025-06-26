# 🚀 VPS Price Comparison - Real-time VPS Hosting Comparison Platform

A comprehensive VPS hosting price comparison website built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui**. Compare VPS plans from 25+ top hosting providers with real-time pricing updates and detailed specifications.

## ✨ Features

### 🔥 Core Features
- **Real-time Pricing Data**: Live pricing updates from 25+ VPS providers
- **50+ VPS Plans**: Comprehensive database of hosting plans with detailed specifications
- **8 Hosting Types**: Shared, VPS, Cloud VPS, Dedicated, Storage, CDN, Object Storage, and Managed hosting
- **Provider Comparisons**: Detailed provider profiles with ratings, reviews, and plan comparisons
- **Advanced Filtering**: Filter by price, RAM, storage, location, and hosting type
- **API Integration**: Real-time data fetching with provider APIs (BandwagonHost KiwiVM, etc.)

### 📝 Content Management
- **Blog System**: 6 comprehensive articles (1200+ words each) covering VPS topics
- **About Page**: Detailed company information and team profiles
- **Contact Page**: Multiple contact methods and inquiry forms
- **Newsletter**: Email subscription system for updates

### 🎨 UI/UX
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **shadcn/ui Components**: Modern, accessible UI components
- **Dark/Light Mode**: Theme switching support
- **Fast Loading**: Optimized performance with Next.js 15
- **Interactive Tables**: Sortable and filterable VPS comparison tables

### 🔧 Technical Features
- **TypeScript**: Full type safety and better developer experience
- **API Routes**: Custom API endpoints for data management
- **Real-time Status**: API health monitoring and status indicators
- **SEO Optimized**: Meta tags, structured data, and sitemap
- **Performance Monitoring**: Built-in analytics and performance tracking

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Development**: Bun (Package Manager)
- **Linting**: Biome
- **Deployment**: Netlify-ready configuration

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/xxrenzhe/vps-price-comparison.git
   cd vps-price-comparison
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:
   ```env
   # API Keys (Optional - for real-time data)
   BANDWAGONHOST_API_KEY=your_api_key
   BANDWAGONHOST_VEID=your_veid

   # Contact Form (Optional)
   CONTACT_EMAIL=your-email@domain.com
   ```

4. **Run the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── health/        # Health check endpoint
│   │   ├── providers/     # Provider data API
│   │   └── vps/          # VPS plans API
│   ├── blog/             # Blog pages
│   ├── providers/        # Provider detail pages
│   ├── about/            # About page
│   ├── contact/          # Contact page
│   ├── newsletter/       # Newsletter page
│   └── layout.tsx        # Root layout
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   ├── Navigation.tsx   # Main navigation
│   ├── VPSTable.tsx     # VPS comparison table
│   ├── Footer.tsx       # Site footer
│   └── ...              # Other components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── services/            # API services
├── types/               # TypeScript definitions
└── ...
```

## 🎯 Key Pages

### 🏠 Homepage (`/`)
- Real-time VPS comparison table
- Provider statistics
- API status monitoring
- Advanced filtering and sorting

### 📊 Providers (`/providers`)
- Complete list of VPS providers
- Provider ratings and reviews
- Detailed comparison features

### 📝 Blog (`/blog`)
- VPS hosting guides and tutorials
- Industry news and updates
- Technical articles and reviews

### ℹ️ About (`/about`)
- Company information
- Team member profiles
- Platform features overview

## 🔧 Development

### Available Scripts

```bash
# Development
bun dev              # Start development server
bun build            # Build for production
bun start            # Start production server

# Code Quality
bun lint             # Run linter and type checking
bun format           # Format code with Biome
```

### Adding New VPS Providers

1. **Update the provider data** in `src/services/vpsProviders.ts`
2. **Add provider logo** to the public assets
3. **Create provider page** in `src/app/providers/[slug]/`
4. **Update TypeScript types** if needed

### Customizing Components

The project uses shadcn/ui components which can be customized:

```bash
bunx shadcn@latest add -y -o [component-name]
```

## 📈 Features in Detail

### VPS Comparison Table
- **50+ Plans**: From major providers like DigitalOcean, Vultr, Linode, etc.
- **Real-time Pricing**: Live updates from provider APIs
- **Advanced Filtering**: By RAM, storage, price, location
- **Sorting**: Multiple column sorting options

### Provider Profiles
- **Detailed Information**: Company background, data centers, features
- **Rating System**: Community-driven ratings and reviews
- **Plan Comparison**: Side-by-side plan comparisons
- **Contact Information**: Direct links to provider sales

### Blog System
- **SEO Optimized**: Meta tags and structured data
- **Rich Content**: 1200+ word comprehensive articles
- **Categories**: Tutorials, news, reviews, guides
- **Search Function**: Find articles by keywords

## 🌐 Deployment

### Netlify (Recommended)

The project includes a `netlify.toml` configuration file:

1. **Connect your repository** to Netlify
2. **Set build command**: `bun run build`
3. **Set publish directory**: `.next`
4. **Deploy automatically** on git push

### Vercel

```bash
vercel --prod
```

### Manual Deployment

```bash
bun run build
bun run start
```

## 🔑 Environment Variables

```env
# Required for real-time API data
BANDWAGONHOST_API_KEY=your_api_key
BANDWAGONHOST_VEID=your_veid

# Optional: Contact form configuration
CONTACT_EMAIL=contact@yourdomain.com
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password

# Optional: Analytics
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- **Email**: yj2008ay611@gmail.com
- **GitHub Issues**: [Create an issue](https://github.com/xxrenzhe/vps-price-comparison/issues)
- **Documentation**: Check the `/docs` folder for detailed guides

## 🙏 Acknowledgments

- **Next.js Team** for the amazing framework
- **shadcn** for the beautiful UI components
- **Vercel** for hosting and deployment tools
- **VPS Providers** for their APIs and data access

---

**Built with ❤️ by Jason Yu**

*Find the best VPS deals, compare prices, and make informed hosting decisions with our comprehensive comparison platform.*
