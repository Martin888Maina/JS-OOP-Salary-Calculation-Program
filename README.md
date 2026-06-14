# Employee Salary Calculator

A modern, interactive web application that demonstrates Object-Oriented Programming principles in JavaScript through an employee salary calculation system. Alongside three employee calculators (Regular, Full-Time, and Part-Time), it includes a Kenyan payroll suite — **Gross Salary**, **Net Salary** (with full statutory deductions), and a **Payslip Generator** that exports to PNG, PDF, and Word — all in Kenyan Shillings (KES). The application features a clean, responsive interface and implements both class inheritance and composition.

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

This project showcases core Object-Oriented Programming concepts including encapsulation, inheritance, composition, and polymorphism through a practical salary calculation application. In addition to computing compensation from hours worked and hourly rates, it provides a complete Kenyan payroll toolkit: gross salary aggregation, net (take-home) pay after PAYE and statutory deductions, and downloadable payslips. All monetary values are expressed in Kenyan Shillings (KES).

## Features

- **Interactive User Interface**: Modern, responsive design that works seamlessly across all devices
- **Six Calculators in One**: Regular, Full-Time, and Part-Time employee calculators plus Gross Salary, Net Salary, and a Payslip Generator
- **Gross Salary Calculation**: Combines basic pay, allowances, and other taxable benefits into a single gross figure
- **Net Salary with Statutory Deductions**: Applies the Kenya FY 2025/2026 payroll rules — PAYE (progressive tax bands), NSSF (two-tier), SHIF, the Affordable Housing Levy, and personal relief — and presents a full monthly and annual breakdown plus an employer cost-to-company view
- **Payslip Generator**: Produces a clean, professional payslip from a gross figure and exports it as **PNG**, **PDF**, or an editable **Word (DOCX)** document, with optional company logo upload
- **Kenyan Shillings (KES)**: All amounts are formatted in the local currency
- **Real-Time Calculations**: Instant salary computation as users input employee data
- **Data Encapsulation**: Private class fields ensure data integrity and security
- **Class Inheritance and Composition**: Multi-level inheritance for the employee types and composition for the payroll engine
- **Responsive Design**: Optimized for desktop, tablet, and mobile viewing
- **Smooth Animations**: Professional transitions and hover effects for enhanced user experience
- **Input Validation and Safe Uploads**: Form validation for accurate data entry, plus image-type/size checks and re-encoding on the optional logo upload

## Technologies Used

- **HTML5**: Semantic markup for structure and accessibility
- **CSS3**: Modern styling with custom properties, flexbox, and grid layouts
- **JavaScript (ES6+)**: Object-oriented programming with classes and private fields
- **Google Fonts**: Inter font family for clean, professional typography
- **html2canvas, jsPDF, and docx**: Client-side libraries (loaded via CDN) used to export the payslip as PNG, PDF, and Word documents respectively

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

### Composition

The Kenyan payroll suite adds several focused classes that work together:

- `GrossSalary` — aggregates basic pay, allowances, and taxable benefits into a gross figure
- `NetSalaryCalculator` — a pure engine that applies the statutory deductions (NSSF, SHIF, Housing Levy, PAYE, personal relief) and produces the full breakdown
- `Payslip` — **composes** `NetSalaryCalculator` (rather than inheriting from it) to derive a payslip's earnings and deductions from a gross figure
- `PayslipExporter` — encapsulates the PNG, PDF, and DOCX export logic

A versioned `RATES` configuration holds the FY 2025/2026 statutory constants as a single source of truth, keeping the engine free of hard-coded values.

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

### Calculating Gross Salary

1. Select the "Gross Salary" tab
2. Enter the Basic Salary, Allowances, and Other Taxable Benefits (KES)
3. Click "Calculate Gross Salary"
4. The result card shows each component and the total gross in Kenyan Shillings

### Calculating Net Salary

1. Select the "Net Salary" tab
2. Enter the Gross Pay (and, optionally, allowances, voluntary deductions, and advanced relief fields)
3. Click "Calculate Net Pay"
4. View the full breakdown — PAYE, NSSF, SHIF, Housing Levy, personal relief, and net pay — across monthly and annual columns, plus an employer cost-to-company table

### Generating a Payslip

1. Select the "Payslip" tab
2. Enter the employee details and Gross Salary, optionally adding SACCO, pension, or insurance deductions and a company logo
3. Click "Generate Payslip", then "View Payslip" to open the full-screen preview
4. Download the payslip as **PNG**, **PDF**, or **Word (DOCX)**

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
