// Base Employee class using OOP principles
// This class serves as the foundation for all employee types
class Employee {
    // Private fields ensure data encapsulation
    #firstname;
    #lastname;
    #department;
    #hoursWorked;
    #amountperHour;
    #salary;

    constructor(firstname, lastname, department, hoursWorked, amountperHour) {
        this.#firstname = firstname;
        this.#lastname = lastname;
        this.#department = department;
        this.#hoursWorked = hoursWorked;
        this.#amountperHour = amountperHour;
        this.#salary = this.#calculateSalary();
    }

    // Calculate salary based on hours and rate
    #calculateSalary() {
        return this.#hoursWorked * this.#amountperHour;
    }

    // Setters with automatic salary recalculation
    set firstname(val) {
        this.#firstname = val;
    }

    set lastname(val) {
        this.#lastname = val;
    }

    set department(val) {
        this.#department = val;
    }

    set hoursWorked(val) {
        this.#hoursWorked = val;
        this.#salary = this.#calculateSalary();
    }

    set amountperHour(val) {
        this.#amountperHour = val;
        this.#salary = this.#calculateSalary();
    }

    // Getters to access private fields
    get firstname() {
        return this.#firstname;
    }

    get lastname() {
        return this.#lastname;
    }

    get department() {
        return this.#department;
    }

    get hoursWorked() {
        return this.#hoursWorked;
    }

    get amountperHour() {
        return this.#amountperHour;
    }

    get salary() {
        return this.#salary;
    }

    // Get full name as a single string
    get fullName() {
        return `${this.#firstname} ${this.#lastname}`;
    }
}

// FullTimeEmployee class extends Employee
// Demonstrates inheritance in OOP
class FullTimeEmployee extends Employee {
    #timeWorked;
    #compensationperHour;
    #wages;

    constructor(firstname, lastname, department, timeWorked, compensationperHour) {
        super(firstname, lastname, department);
        this.#timeWorked = timeWorked;
        this.#compensationperHour = compensationperHour;
        this.#wages = this.#calculateWages();
    }

    // Calculate total wages
    #calculateWages() {
        return this.#timeWorked * this.#compensationperHour;
    }

    set timeWorked(val) {
        this.#timeWorked = val;
        this.#wages = this.#calculateWages();
    }

    set compensationperHour(val) {
        this.#compensationperHour = val;
        this.#wages = this.#calculateWages();
    }

    get timeWorked() {
        return this.#timeWorked;
    }

    get compensationperHour() {
        return this.#compensationperHour;
    }

    get wages() {
        return this.#wages;
    }
}

// PartTimeEmployee extends FullTimeEmployee
// Shows multi-level inheritance
class PartTimeEmployee extends FullTimeEmployee {
    #periodWorked;
    #remunerationperHour;
    #income;

    constructor(firstname, lastname, department, periodWorked, remunerationperHour) {
        super(firstname, lastname, department);
        this.#periodWorked = periodWorked;
        this.#remunerationperHour = remunerationperHour;
        this.#income = this.#calculateIncome();
    }

    // Calculate total income for part-time work
    #calculateIncome() {
        return this.#periodWorked * this.#remunerationperHour;
    }

    set periodWorked(val) {
        this.#periodWorked = val;
        this.#income = this.#calculateIncome();
    }

    set remunerationperHour(val) {
        this.#remunerationperHour = val;
        this.#income = this.#calculateIncome();
    }

    get periodWorked() {
        return this.#periodWorked;
    }

    get remunerationperHour() {
        return this.#remunerationperHour;
    }

    get income() {
        return this.#income;
    }
}

// UI Controller - handles all user interactions
class UIController {
    constructor() {
        this.currentType = 'employee';
        this.initializeEventListeners();
    }

    // Set up all event listeners when page loads
    initializeEventListeners() {
        // Tab switching for employee types
        const typeButtons = document.querySelectorAll('.type-btn');
        typeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchEmployeeType(e.target.dataset.type));
        });

        // Form submissions
        document.getElementById('employeeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEmployeeSubmit();
        });

        document.getElementById('fulltimeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFullTimeSubmit();
        });

        document.getElementById('parttimeForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePartTimeSubmit();
        });
    }

    // Switch between different employee type forms
    switchEmployeeType(type) {
        this.currentType = type;

        // Update active button
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });

        // Show the correct form
        document.querySelectorAll('.calculator-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${type}Form`).classList.add('active');
    }

    // Handle regular employee form submission
    handleEmployeeSubmit() {
        const firstname = document.getElementById('emp-firstname').value;
        const lastname = document.getElementById('emp-lastname').value;
        const department = document.getElementById('emp-department').value;
        const hours = parseFloat(document.getElementById('emp-hours').value);
        const rate = parseFloat(document.getElementById('emp-rate').value);

        const employee = new Employee(firstname, lastname, department, hours, rate);
        this.displayResult(employee, 'employee');
        this.clearForm('employeeForm');
    }

    // Handle full-time employee form submission
    handleFullTimeSubmit() {
        const firstname = document.getElementById('ft-firstname').value;
        const lastname = document.getElementById('ft-lastname').value;
        const department = document.getElementById('ft-department').value;
        const hours = parseFloat(document.getElementById('ft-hours').value);
        const rate = parseFloat(document.getElementById('ft-rate').value);

        const employee = new FullTimeEmployee(firstname, lastname, department, hours, rate);
        this.displayResult(employee, 'fulltime');
        this.clearForm('fulltimeForm');
    }

    // Handle part-time employee form submission
    handlePartTimeSubmit() {
        const firstname = document.getElementById('pt-firstname').value;
        const lastname = document.getElementById('pt-lastname').value;
        const department = document.getElementById('pt-department').value;
        const hours = parseFloat(document.getElementById('pt-hours').value);
        const rate = parseFloat(document.getElementById('pt-rate').value);

        const employee = new PartTimeEmployee(firstname, lastname, department, hours, rate);
        this.displayResult(employee, 'parttime');
        this.clearForm('parttimeForm');
    }

    // Display calculation results in the results section
    displayResult(employee, type) {
        const resultsContainer = document.getElementById('resultsContainer');
        
        // Remove empty state if present
        const emptyState = resultsContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        // Create result card
        const resultCard = this.createResultCard(employee, type);
        resultsContainer.insertAdjacentHTML('beforeend', resultCard);

        // Smooth scroll to results
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // Create HTML for result card based on employee type
    createResultCard(employee, type) {
        const typeLabels = {
            'employee': 'Regular',
            'fulltime': 'Full-Time',
            'parttime': 'Part-Time'
        };

        let detailsHTML = '';
        let totalLabel = '';
        let totalValue = 0;

        if (type === 'employee') {
            totalLabel = 'Total Salary';
            totalValue = employee.salary;
            detailsHTML = `
                <div class="detail-row">
                    <span class="detail-label">Department:</span>
                    <span class="detail-value">${employee.department}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Hours Worked:</span>
                    <span class="detail-value">${employee.hoursWorked} hrs</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Rate per Hour:</span>
                    <span class="detail-value">$${employee.amountperHour.toFixed(2)}</span>
                </div>
            `;
        } else if (type === 'fulltime') {
            totalLabel = 'Total Wages';
            totalValue = employee.wages;
            detailsHTML = `
                <div class="detail-row">
                    <span class="detail-label">Department:</span>
                    <span class="detail-value">${employee.department}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time Worked:</span>
                    <span class="detail-value">${employee.timeWorked} hrs</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Compensation per Hour:</span>
                    <span class="detail-value">$${employee.compensationperHour.toFixed(2)}</span>
                </div>
            `;
        } else if (type === 'parttime') {
            totalLabel = 'Total Income';
            totalValue = employee.income;
            detailsHTML = `
                <div class="detail-row">
                    <span class="detail-label">Department:</span>
                    <span class="detail-value">${employee.department}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Period Worked:</span>
                    <span class="detail-value">${employee.periodWorked} hrs</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Remuneration per Hour:</span>
                    <span class="detail-value">$${employee.remunerationperHour.toFixed(2)}</span>
                </div>
            `;
        }

        return `
            <div class="result-card">
                <div class="result-header">
                    <h3 class="employee-name">${employee.fullName}</h3>
                    <span class="employee-badge badge-${type}">${typeLabels[type]}</span>
                </div>
                <div class="result-details">
                    ${detailsHTML}
                    <div class="detail-row total-row">
                        <span class="detail-label">${totalLabel}:</span>
                        <span class="detail-value">$${totalValue.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Clear form after successful submission
    clearForm(formId) {
        document.getElementById(formId).reset();
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
