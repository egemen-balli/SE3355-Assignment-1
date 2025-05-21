# E-Commerce Product Showcase

## Deployed at

[https://egemen-balli.github.io/SE3355-Assignment-1/](https://egemen-balli.github.io/SE3355-Assignment-1/)

## Overview

This project is a React-based e-commerce product showcase built for the SE3355 assignment. It simulates a modern shopping experience with dynamically fetched product data, a promotional slider, personalized product recommendations, and a visit history tracker.

## Features

- **Navigation Menu**: Category-based top navigation with submenus  
- **Special Offers Carousel**: Scrollable strip showcasing limited-time offers  
- **Main Slider**: Dynamic carousel displaying featured products with auto-play  
- **Recommended Products**: Personalized suggestions rendered in a horizontal slider  
- **Visited Products Tracker**: History of previously viewed items, stored via Redux  
- **Hover Animations**: Smooth transform and shadow effects across product cards  
- **Redux Integration**: For state management of visited products  

## Technologies Used

- React
- Redux for state management  
- Plain CSS (modularized with `.css` files)  
- JavaScript Fetch API for data loading  
- HTML5/CSS3 transitions and layout  

## Project Structure

```
ecommerce-product-showcase/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar
│   │   ├── SpecialOffers.jsx    # Special offer image strip
│   │   ├── Slider.jsx           # Main promotional slider + electronics deals
│   │   ├── Recommended.jsx      # Personalized recommendation list
│   │   ├── Visited.jsx          # Recently visited products list
│   ├── redux/
│   │   ├── store.js             # Redux store setup
│   │   └── actions/             # Action creators (e.g. addToVisited)
│   ├── App.jsx                  # Root layout with section composition
│   ├── main.jsx                 # App entry point with Redux provider
│   ├── index.css                # Global styles
│   ├── App.css                  # Container and layout styles
├── styles/
│   ├── Navbar.css
│   ├── SpecialOffers.css
│   ├── Slider.css
│   ├── Recommended.css
│   └── Visited.css
├── package.json
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ecommerce-product-showcase.git
   ```

2. Navigate to the project folder:
   ```bash
   cd ecommerce-product-showcase
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

- Browse through categories in the navigation bar  
- View special offers in the top strip  
- Use the main slider to explore highlighted campaigns  
- Scroll through recommended items tailored to user interactions  
- Click on any item to visit its detail page (opens in new tab) and track visits  
- View recently visited items in the "Gezilen Ürünler" section  

## Component Details

### Navbar
Responsive navigation bar with dropdown submenus for product categories.

### SpecialOffers
Displays special offer banners with links to deals.

### Slider
Two-part section:  
- **Main Slider**: Displays banners with auto-play and navigation buttons.  
- **Electronics Deals**: Horizontal scroller for discounted electronics with stars, price, and CTA.

### Recommended
Fetches and displays product suggestions in a slider. Clicking a product logs it as visited.

### Visited
Displays a scrollable list of previously clicked products using Redux state and persists visually with styling and details.

## State Management

Redux is used to store:  
- **Visited Products**: Tracked and rendered dynamically from store state  

## Backend API (if applicable)

Make sure your backend is running or accessible. Example API endpoints used:

- `GET /api/special-offers`  
- `GET /api/main-slider`  
- `GET /api/carousel`  
- `GET /api/electronics`
