# 🌍 [WorldCountries](https://world-countries-delta.vercel.app) with React + Vite + TypeScript + TailwindCSS + PrimeReact 

WorldCountries is a learning project aimed at gaining hands-on experience with modern web development technologies like React, TypeScript, Vite, PrimeReact, and TailwindCSS. This application fetches data from the [REST Countries API](https://restcountries.com/) and displays it in a user-friendly and responsive interface, offering a practical way to explore and practice these technologies.

<div align="center">
  <img src="/public/gif/welcome.gif">
</div>

## ✨ Features

- **🎠 Carousel View**: A visually appealing carousel that highlights countries, perfect for practicing dynamic content presentation.
- **📋 List View**:
  - **📊 Table Format**: A traditional table view with sortable columns and advanced filtering options—great for working with data-intensive interfaces.
  - **📦 Grid Format**: A dynamic grid view with enhanced filtering capabilities, helping you learn how to manage and display data in multiple formats.
- **🌍 Country Detailed View**:
  - **🗂️ Page View**: A dedicated page for each country with comprehensive details.
  - **🔳 Modal View**: A modal display of country details for easy comparison and to see all fetched country data.
- **📱 Responsive Design**: Optimized for all devices, ensuring a seamless experience on both mobile and desktop—essential for mastering modern web design. *(But best experience is in web)*
- **🌐 Translation & Theming**:
  - **🌏 English and French Support**: Easily switch between different languages, showcasing internationalization best practices.
  - **🌗 Dark and Light Mode**: Toggle between dark and light themes, giving you practical experience with theming and state management.

## 🚀 Technology Stack

- **🛠️ [TypeScript](https://www.typescriptlang.org/)**: Enhances JavaScript with type safety, making the codebase more robust and maintainable—perfect for sharpening TypeScript skills.
- **⚛️ [React](https://reactjs.org/)**: A powerful JavaScript library for building user interfaces, providing a solid foundation in modern frontend development.
- **⚡ [Vite](https://vitejs.dev/)**: A next-generation frontend tooling that offers fast development and optimized builds, helping to learn about modern build tools and workflows.
- **🎨 [TailwindCSS](https://tailwindcss.com/)**: A utility-first CSS framework for creating modern and responsive designs, allowing to practice rapid UI development.
- **📦 [PrimeReact](https://primereact.org/)**: A rich set of UI components for React, enabling feature-rich applications and enhancing component-based development skills.

## 🛠 API Integration

This project integrates with the free [REST Countries API](https://restcountries.com/) to fetch real-world data. This is a great way to practice working with external APIs in a React application.

- **Base API URL**: `https://restcountries.com/v3.1/`
- **Endpoints**:
  - **🗺️ ALL**: Fetches data for all countries, giving you experience in handling large datasets.
  - **🔍 NAME**: Fetches data for a specific country by name (e.g., `/name/{0}`), allowing you to work with dynamic API requests.
