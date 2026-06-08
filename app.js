/**
 * Base class representing an employee with private field encapsulation
 * and a computed salary derived from hours worked and hourly rate.
 */
class Employee {
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

    /**
     * @returns {number} Product of hours worked and the hourly rate.
     */
    #calculateSalary() {
        return this.#hoursWorked * this.#amountperHour;
    }

    set firstname(val) { this.#firstname = val; }
    set lastname(val) { this.#lastname = val; }
    set department(val) { this.#department = val; }

    // Updating either input recalculates the stored salary immediately.
    set hoursWorked(val) {
        this.#hoursWorked = val;
        this.#salary = this.#calculateSalary();
    }

    set amountperHour(val) {
        this.#amountperHour = val;
        this.#salary = this.#calculateSalary();
    }

    get firstname() { return this.#firstname; }
    get lastname() { return this.#lastname; }
    get department() { return this.#department; }
    get hoursWorked() { return this.#hoursWorked; }
    get amountperHour() { return this.#amountperHour; }
    get salary() { return this.#salary; }

    /**
     * @returns {string} First and last name joined with a space.
     */
    get fullName() {
        return `${this.#firstname} ${this.#lastname}`;
    }
}

/**
 * Extends Employee with a separate wages calculation for full-time contracted hours.
 * Wages are independent of the base salary inherited from Employee.
 */
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

    /**
     * @returns {number} Product of time worked and the compensation rate.
     */
    #calculateWages() {
        return this.#timeWorked * this.#compensationperHour;
    }

    // Updating either input recalculates the stored wages immediately.
    set timeWorked(val) {
        this.#timeWorked = val;
        this.#wages = this.#calculateWages();
    }

    set compensationperHour(val) {
        this.#compensationperHour = val;
        this.#wages = this.#calculateWages();
    }

    get timeWorked() { return this.#timeWorked; }
    get compensationperHour() { return this.#compensationperHour; }
    get wages() { return this.#wages; }
}

/**
 * Extends FullTimeEmployee with a part-time income calculation
 * using a separate period and remuneration rate.
 */
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

    /**
     * @returns {number} Product of period worked and the remuneration rate.
     */
    #calculateIncome() {
        return this.#periodWorked * this.#remunerationperHour;
    }

    // Updating either input recalculates the stored income immediately.
    set periodWorked(val) {
        this.#periodWorked = val;
        this.#income = this.#calculateIncome();
    }

    set remunerationperHour(val) {
        this.#remunerationperHour = val;
        this.#income = this.#calculateIncome();
    }

    get periodWorked() { return this.#periodWorked; }
    get remunerationperHour() { return this.#remunerationperHour; }
    get income() { return this.#income; }
}

/**
 * Manages form interactions, employee type switching, and result rendering.
 * A single instance is created on DOMContentLoaded.
 */
class UIController {
    constructor() {
        this.currentType = 'employee';
        this.initializeEventListeners();
    }

    /**
     * Attaches all DOM event listeners. Called once on construction.
     */
    initializeEventListeners() {
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchEmployeeType(e.target.dataset.type));
        });

        document.querySelectorAll('.reset-btn').forEach(btn => {
            btn.addEventListener('click', () => this.clearForm(btn.dataset.form));
        });

        document.getElementById('clearResultsBtn').addEventListener('click', () => this.clearResults());

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

    /**
     * Activates the selected employee type tab and its corresponding form.
     * @param {string} type - One of 'employee', 'fulltime', or 'parttime'.
     */
    switchEmployeeType(type) {
        this.currentType = type;

        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.type === type);
        });

        document.querySelectorAll('.calculator-form').forEach(form => {
            form.classList.remove('active');
        });
        document.getElementById(`${type}Form`).classList.add('active');
    }

    /**
     * Reads the regular employee form, constructs an Employee instance, and renders the result.
     */
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

    /**
     * Reads the full-time employee form, constructs a FullTimeEmployee instance, and renders the result.
     */
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

    /**
     * Reads the part-time employee form, constructs a PartTimeEmployee instance, and renders the result.
     */
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

    /**
     * Removes the empty-state placeholder if present, appends a result card,
     * and scrolls the results section into view.
     * @param {Employee|FullTimeEmployee|PartTimeEmployee} employee
     * @param {string} type - One of 'employee', 'fulltime', or 'parttime'.
     */
    displayResult(employee, type) {
        const resultsContainer = document.getElementById('resultsContainer');

        const emptyState = resultsContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        const resultCard = this.createResultCard(employee, type);
        resultsContainer.insertAdjacentHTML('beforeend', resultCard);

        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Builds and returns the HTML markup for a result card.
     * @param {Employee|FullTimeEmployee|PartTimeEmployee} employee
     * @param {string} type - One of 'employee', 'fulltime', or 'parttime'.
     * @returns {string} HTML string ready for insertion into the DOM.
     */
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

    /**
     * @param {string} formId - The id attribute of the form element to reset.
     */
    clearForm(formId) {
        document.getElementById(formId).reset();
    }

    /**
     * Replaces all result cards with the empty-state placeholder markup.
     */
    clearResults() {
        const container = document.getElementById('resultsContainer');
        container.innerHTML = `
            <div class="empty-state">
                <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <p>No calculations yet. Fill out the form above to get started.</p>
            </div>
        `;
    }
}

// Defers instantiation until the DOM is fully parsed.
document.addEventListener('DOMContentLoaded', () => {
    new UIController();
});
