# Employee Salary Calculator

A modern, interactive web application that demonstrates Object-Oriented Programming principles in JavaScript through an employee salary calculation system. The application features a clean, responsive interface and implements class inheritance with three employee types: Regular, Full-Time, and Part-Time employees.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [OOP Concepts Demonstrated](#oop-concepts-demonstrated)
- [Usage](#usage)
- [Browser Support](#browser-support)
- [License](#license)
- [Author](#author)

## Overview

This project showcases core Object-Oriented Programming concepts including encapsulation, inheritance, and polymorphism through a practical salary calculation application. The application allows users to input employee details and automatically calculates compensation based on hours worked and hourly rates.

## Features

- **Interactive User Interface**: Modern, responsive design that works seamlessly across all devices
- **Three Employee Types**: Support for Regular, Full-Time, and Part-Time employee classifications
- **Real-Time Calculations**: Instant salary computation as users input employee data
- **Data Encapsulation**: Private class fields ensure data integrity and security
- **Class Inheritance**: Demonstrates multi-level inheritance with base and derived classes
- **Responsive Design**: Optimized for desktop, tablet, and mobile viewing
- **Smooth Animations**: Professional transitions and hover effects for enhanced user experience
- **Input Validation**: Form validation to ensure accurate data entry

## Technologies Used

- **HTML5**: Semantic markup for structure and accessibility
- **CSS3**: Modern styling with custom properties, flexbox, and grid layouts
- **JavaScript (ES6+)**: Object-oriented programming with classes and private fields
- **Google Fonts**: Inter font family for clean, professional typography

## Getting Started

### Prerequisites

No special prerequisites are required. You only need a modern web browser to run this application.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Martin888Maina/JS-OOP-Salary-Calculation-Program.git
   ```

2. Navigate to the project directory:
   ```bash
   cd JS-OOP-Salary-Calculation-Program
   ```

3. Open `index.html` in your web browser:
   ```bash
   # Windows
   start index.html
   
   # macOS
   open index.html
   
   # Linux
   xdg-open index.html
   ```

Alternatively, you can use a local development server like Live Server in VS Code for a better development experience.

## Project Structure

```
JS-OOP-Salary-Calculation-Program/
│
├── index.html          # Main HTML structure
├── styles.css          # CSS styling and animations
├── app.js             # JavaScript OOP implementation
├── README.md          # Project documentation
└── LICENSE            # MIT License
```

## OOP Concepts Demonstrated

### Encapsulation

The project uses JavaScript private fields (denoted by `#`) to encapsulate employee data, preventing direct access from outside the class:

```javascript
class Employee {
    #firstname;
    #lastname;
    #salary;
    // ... getters and setters provide controlled access
}
```

### Inheritance

The application demonstrates both single and multi-level inheritance:

- `Employee` (Base Class)
- `FullTimeEmployee extends Employee` (Derived Class)
- `PartTimeEmployee extends FullTimeEmployee` (Multi-level Inheritance)

### Polymorphism

Each employee type has its own compensation calculation method while sharing common properties through inheritance.

### Abstraction

Complex salary calculations are abstracted into private methods, exposing only necessary public interfaces through getters and setters.

## Usage

### Calculating Regular Employee Salary

1. Select the "Regular Employee" tab
2. Enter employee details:
   - First Name
   - Last Name
   - Department
   - Hours Worked
   - Rate per Hour
3. Click "Calculate Salary"
4. View the calculated results in the results section

### Calculating Full-Time Employee Wages

1. Select the "Full-Time Employee" tab
2. Input the required information
3. Click "Calculate Wages"
4. Results will display the total wages based on time worked and compensation rate

### Calculating Part-Time Employee Income

1. Select the "Part-Time Employee" tab
2. Fill in all fields
3. Click "Calculate Income"
4. The system calculates total income based on period worked and remuneration rate

## Browser Support

This application supports all modern browsers:

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Opera

Note: Internet Explorer is not supported due to the use of modern JavaScript features like private class fields.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Author

**Martin Maina**

- GitHub: [@Martin888Maina](https://github.com/Martin888Maina)
- Project Link: [JS-OOP-Salary-Calculation-Program](https://github.com/Martin888Maina/JS-OOP-Salary-Calculation-Program)

---

This project was created as a demonstration of Object-Oriented Programming principles in JavaScript and serves as a portfolio piece showcasing modern web development practices.
