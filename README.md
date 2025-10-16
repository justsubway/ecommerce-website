# Paltry 🍳

A modern, intuitive "What's in my fridge?" recipe discovery web application that helps you find delicious recipes based on the ingredients you have available. Built with React and powered by the Spoonacular API.

![Paltry Logo](public/Paltry.png)

## 🌟 Features

### Core Functionality
- **Ingredient Management**: Add and remove ingredients from your virtual pantry
- **Smart Recipe Discovery**: Find recipes based on available ingredients using AI-powered matching
- **Real-time Search**: Get instant recipe suggestions as you build your ingredient list
- **Visual Recipe Cards**: Browse recipes with beautiful images and clear titles
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### User Experience
- **Intuitive Interface**: Clean, modern design with dark theme
- **Keyboard Support**: Press Enter to add ingredients quickly
- **One-Click Removal**: Easy ingredient removal with visual feedback
- **Loading States**: Clear feedback during API calls
- **Error Handling**: Graceful handling of API errors and edge cases

### Technical Features
- **React Hooks**: Modern functional components with useState for state management
- **API Integration**: Seamless integration with Spoonacular Recipe API
- **Responsive Grid**: CSS Grid layout for optimal recipe card display
- **Component Architecture**: Modular, reusable component structure
- **Async Operations**: Proper handling of asynchronous API calls

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Spoonacular API key (free tier available)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/justsubway/paltry.git
   cd paltry
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get your API key**
   - Visit [Spoonacular API](https://spoonacular.com/food-api)
   - Sign up for a free account
   - Copy your API key

4. **Configure the API key**
   - Open `src/App.js`
   - Replace `YOUR_API_KEY_HERE` with your actual API key:
   ```javascript
   const apiKey = 'your-actual-api-key-here';
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📖 How to Use

### Adding Ingredients
1. Type an ingredient name in the input field
2. Press Enter or click the "Add" button
3. The ingredient will appear in your pantry list
4. Repeat for all available ingredients

### Finding Recipes
1. Add 2-5 ingredients to your pantry
2. Click the "Find Recipes" button
3. Browse through the suggested recipes
4. Each recipe card shows an image and title

### Managing Your Pantry
- **Remove ingredients**: Click the "X" button next to any ingredient
- **Add more ingredients**: Continue adding ingredients to refine your search
- **Clear and start over**: Remove all ingredients to start fresh

## 🏗️ Project Structure

```
paltry/
├── public/
│   ├── index.html
│   ├── Paltry.png          # Application logo
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Button.js       # Reusable button component
│   ├── App.js              # Main application component
│   ├── App.css             # Application styling
│   ├── App.test.js         # Component tests
│   ├── index.js            # React app entry point
│   ├── index.css           # Global styles
│   └── setupTests.js       # Test configuration
├── package.json            # Project dependencies and scripts
└── README.md              # Project documentation
```

## 🔧 Technical Implementation

### State Management
The application uses React's `useState` hook to manage four key pieces of state:
- `ingredientsList`: Array of added ingredients
- `typedText`: Current input value
- `recipesList`: Array of fetched recipes
- `isLoading`: Loading state for API calls

### API Integration
- **Endpoint**: Spoonacular's `findByIngredients` API
- **Method**: GET request with ingredients as query parameters
- **Response**: Array of recipe objects with images and titles
- **Error Handling**: Graceful fallback for API failures

### Component Architecture
- **App Component**: Main container with all application logic
- **Button Component**: Reusable button with customizable styling
- **CSS Grid**: Responsive layout for recipe cards
- **Flexbox**: Layout for ingredient management

## 🎨 Styling and Design

### Color Scheme
- **Background**: Dark theme (#282c34)
- **Cards**: Medium gray (#3a404a)
- **Accents**: Blue (#61dafb) and Green (#28a745)
- **Text**: White with good contrast

### Layout
- **Responsive Grid**: Recipe cards adapt to screen size
- **Centered Design**: Clean, focused layout
- **Card-based UI**: Modern card design for ingredients and recipes
- **Visual Hierarchy**: Clear distinction between sections

## 📱 Browser Support

This application is compatible with all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚀 Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## 🔑 API Configuration

### Spoonacular API Setup
1. Visit [Spoonacular Food API](https://spoonacular.com/food-api)
2. Sign up for a free account (150 requests per day)
3. Copy your API key from the dashboard
4. Replace the placeholder in `src/App.js`

### API Rate Limits
- **Free Tier**: 150 requests per day
- **Paid Tiers**: Higher limits available
- **Best Practice**: Implement caching for production use

## 🛠️ Development

### Adding New Features
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style
- Follow React best practices
- Use functional components with hooks
- Maintain consistent naming conventions
- Add comments for complex logic

## 🐛 Troubleshooting

### Common Issues

**API Key Not Working**
- Verify your API key is correct
- Check if you've exceeded rate limits
- Ensure the key is properly placed in the code

**No Recipes Found**
- Try adding more ingredients
- Check ingredient spelling
- Verify API key is working

**Build Errors**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Verify all dependencies are installed

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Deployment Options
- **Netlify**: Drag and drop the build folder
- **Vercel**: Connect your GitHub repository
- **GitHub Pages**: Use the build folder
- **AWS S3**: Upload build files to S3 bucket

## 🔮 Future Enhancements

Potential improvements for future versions:
- **Recipe Details**: Full recipe instructions and ingredients
- **Nutritional Information**: Calories, macros, and dietary info
- **User Accounts**: Save favorite recipes and ingredient lists
- **Shopping Lists**: Generate shopping lists for missing ingredients
- **Dietary Filters**: Vegetarian, vegan, gluten-free options
- **Recipe Ratings**: User ratings and reviews
- **Meal Planning**: Weekly meal planning features
- **Offline Support**: PWA capabilities for offline use

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Spoonacular API](https://spoonacular.com/food-api) for providing the recipe data
- [React](https://reactjs.org/) for the amazing framework
- [Create React App](https://create-react-app.dev/) for the project setup

## 📞 Support

For questions, suggestions, or support:
- Open an issue on GitHub
- Contact the maintainer
- Check the documentation

---

**Built with ❤️ using React and the Spoonacular API**

*Turn your pantry into possibilities with Paltry!*