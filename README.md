# Calculator App

A modern, responsive calculator application built with React and JavaScript. This calculator provides a clean, intuitive interface for performing basic arithmetic operations with both mouse and keyboard support.

## Features

### Core Functionality
- **Basic Arithmetic Operations**: Addition (+), Subtraction (-), Multiplication (*), Division (/)
- **Clear Function**: Reset calculator to initial state
- **Real-time Display**: Shows current input and calculation results
- **Chain Calculations**: Perform multiple operations in sequence
- **Keyboard Support**: Full keyboard navigation and input

### User Interface
- **Modern Design**: Clean, professional appearance with a dark theme
- **Responsive Layout**: Optimized for various screen sizes
- **Visual Feedback**: Distinct styling for number and operator buttons
- **Large Display**: Easy-to-read calculation display
- **Grid Layout**: Intuitive button arrangement following standard calculator conventions

### Technical Features
- **React Hooks**: Built using modern React functional components with useState and useEffect
- **Event Handling**: Comprehensive event management for both mouse and keyboard interactions
- **State Management**: Efficient state handling for display, previous values, and operations
- **Component Architecture**: Modular design with reusable Button component

## Screenshots

The calculator features:
- A dark-themed interface with blue and orange accent colors
- A large display area showing current values and results
- Number pad (0-9) with standard layout
- Operator buttons (+, -, *, /, =, C) with distinct styling
- Zero button spanning two columns for better usability

## Installation

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/justsubway/calculator-app.git
   cd calculator-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the calculator

## Usage

### Mouse Operations
- Click number buttons (0-9) to input numbers
- Click operator buttons (+, -, *, /) to select operations
- Click the equals button (=) to calculate results
- Click the clear button (C) to reset the calculator

### Keyboard Operations
- **Numbers**: Press 0-9 keys to input numbers
- **Operators**: Press +, -, *, / keys for operations
- **Calculate**: Press Enter or = key to calculate
- **Clear**: Press Escape or C key to clear

### Example Calculations
1. **Simple Addition**: `5 + 3 = 8`
2. **Chain Operations**: `10 + 5 - 3 * 2 = 9`
3. **Division**: `15 / 3 = 5`

## Project Structure

```
calculator-app/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   └── Button.js          # Reusable button component
│   ├── App.js                 # Main calculator component
│   ├── App.css                # Calculator styling
│   ├── index.js               # React app entry point
│   └── index.css              # Global styles
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Technical Implementation

### State Management
The calculator uses React's `useState` hook to manage three key pieces of state:
- `displayValue`: Current display value
- `previousValue`: Previously entered number
- `operator`: Current operation to perform

### Event Handling
- **useEffect Hook**: Manages keyboard event listeners
- **Event Cleanup**: Properly removes event listeners to prevent memory leaks
- **Input Validation**: Handles edge cases and prevents invalid operations

### Component Architecture
- **App Component**: Main calculator logic and state management
- **Button Component**: Reusable button with customizable styling
- **CSS Grid**: Responsive layout using CSS Grid for button arrangement

## Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Launches the test runner
- `npm eject`: Ejects from Create React App (one-way operation)

## Browser Support

This calculator is compatible with all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Future Enhancements

Potential improvements for future versions:
- Scientific calculator functions
- Memory operations (M+, M-, MR, MC)
- History of calculations
- Theme switching (light/dark mode)
- Mobile app version
- Voice input support

## Contact

For questions, suggestions, or support, please open an issue on GitHub or contact the maintainer.

---

**Built with ❤️ using React and JavaScript**