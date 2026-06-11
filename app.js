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
 * Represents a gross salary built from basic pay plus taxable allowances
 * and benefits, expressed in Kenyan Shillings (KES). Mirrors the Employee
 * encapsulation style: private fields with a recomputed total on update.
 */
class GrossSalary {
    #basicSalary;
    #allowances;
    #otherTaxableBenefits;
    #gross;

    constructor(basicSalary, allowances, otherTaxableBenefits) {
        this.#basicSalary = basicSalary;
        this.#allowances = allowances;
        this.#otherTaxableBenefits = otherTaxableBenefits;
        this.#gross = this.#calculateGross();
    }

    /**
     * @returns {number} Sum of basic salary, allowances, and other taxable benefits.
     */
    #calculateGross() {
        return this.#basicSalary + this.#allowances + this.#otherTaxableBenefits;
    }

    // Updating any component recalculates the stored gross immediately.
    set basicSalary(val) {
        this.#basicSalary = val;
        this.#gross = this.#calculateGross();
    }

    set allowances(val) {
        this.#allowances = val;
        this.#gross = this.#calculateGross();
    }

    set otherTaxableBenefits(val) {
        this.#otherTaxableBenefits = val;
        this.#gross = this.#calculateGross();
    }

    get basicSalary() { return this.#basicSalary; }
    get allowances() { return this.#allowances; }
    get otherTaxableBenefits() { return this.#otherTaxableBenefits; }
    get gross() { return this.#gross; }
}

/**
 * Formats a numeric amount as Kenyan Shillings with thousands separators
 * and two decimal places, e.g. 60000 -> "Ksh 60,000.00".
 * @param {number} value - The amount to format.
 * @returns {string} The formatted KES string.
 */
function formatKES(value) {
    return 'Ksh ' + value.toLocaleString('en-KE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

/**
 * Statutory rates and tax bands for Kenya FY 2025/2026 (updated Feb 2025).
 * Single source of truth — the calculator reads every constant from here so a
 * statutory change is a config edit, never a formula edit. All amounts in KES.
 */
const RATES = {
    personalRelief: 2400,
    nssf: { rate: 0.06, tier1Limit: 8000, tier2Upper: 72000 },
    shifRate: 0.0275,
    housingLevyRate: 0.015,
    insReliefRate: 0.15,
    insReliefCap: 5000,
    mortgageCap: 30000,
    pwdExemption: 150000,
    bands: [
        { lower: 0, upper: 24000, rate: 0.10 },
        { lower: 24000, upper: 32333, rate: 0.25 },
        { lower: 32333, upper: 500000, rate: 0.30 },
        { lower: 500000, upper: 800000, rate: 0.325 },
        { lower: 800000, upper: Infinity, rate: 0.35 }
    ]
};

/**
 * Pure payroll engine: turns a set of salary inputs into a full breakdown of
 * statutory deductions and net pay using the Kenya FY 2025/2026 rules. Holds
 * inputs and every computed line in private fields, in the Employee style.
 */
class NetSalaryCalculator {
    #input;
    #gross;
    #nssf;
    #shif;
    #ahl;
    #taxableIncome;
    #grossPaye;
    #insuranceRelief;
    #netPaye;
    #netPay;
    #voluntary;
    #takeHome;
    #employer;

    constructor(input) {
        this.#input = input;
        this.#compute();
    }

    /**
     * @returns {number} Value rounded to two decimal places.
     */
    #round(value) {
        return Math.round(value * 100) / 100;
    }

    /**
     * Two-tier NSSF: 6% of pay up to the Tier I limit, plus 6% of pay between
     * the Tier I and Tier II limits. Capped at KES 4,320.
     * @param {number} pensionablePay
     * @returns {number} Total NSSF contribution.
     */
    #tieredNSSF(pensionablePay) {
        const tier1 = this.#round(Math.min(pensionablePay, RATES.nssf.tier1Limit) * RATES.nssf.rate);
        const tier2Base = Math.min(
            Math.max(pensionablePay - RATES.nssf.tier1Limit, 0),
            RATES.nssf.tier2Upper - RATES.nssf.tier1Limit
        );
        const tier2 = this.#round(tier2Base * RATES.nssf.rate);
        return this.#round(tier1 + tier2);
    }

    /**
     * Applies the progressive PAYE bands so each slice of income is taxed at
     * its own band's rate.
     * @param {number} taxable - Taxable income.
     * @returns {number} Gross PAYE before relief.
     */
    #applyBands(taxable) {
        let tax = 0;
        for (const band of RATES.bands) {
            if (taxable > band.lower) {
                const slice = Math.min(taxable, band.upper) - band.lower;
                tax += slice * band.rate;
            } else {
                break;
            }
        }
        return this.#round(tax);
    }

    /**
     * Runs the canonical calculation order: gross -> statutory deductions ->
     * taxable income -> PAYE -> net pay -> voluntary deductions -> take-home,
     * plus the employer cost-to-company figures.
     */
    #compute() {
        const i = this.#input;
        const gross = i.basic + i.allowances + i.otherBenefits
            + i.houseAllowance + i.transportAllowance + i.otherAllowance;

        const nssf = this.#tieredNSSF(gross);
        const shif = this.#round(gross * RATES.shifRate);
        const ahl = this.#round(gross * RATES.housingLevyRate);

        const mortgage = Math.min(i.mortgageInterest, RATES.mortgageCap);
        const allowable = nssf + shif + ahl + mortgage;

        let taxable = Math.max(0, gross - allowable);
        if (i.isPWD) {
            taxable = Math.max(0, taxable - RATES.pwdExemption);
        }
        taxable = this.#round(taxable);

        const grossPaye = this.#applyBands(taxable);
        const insuranceRelief = this.#round(
            Math.min(RATES.insReliefRate * (i.healthInsurance + i.lifeInsurance), RATES.insReliefCap)
        );
        const netPaye = this.#round(Math.max(0, grossPaye - RATES.personalRelief - insuranceRelief));

        const netPay = this.#round(gross - nssf - shif - ahl - netPaye);

        const voluntary = this.#round(
            i.helb + i.sacco + i.pensionTopUp + i.insurance + i.childCare + i.commuter
        );
        const takeHome = this.#round(netPay - voluntary);

        const employerNssf = this.#tieredNSSF(gross);

        this.#gross = gross;
        this.#nssf = nssf;
        this.#shif = shif;
        this.#ahl = ahl;
        this.#taxableIncome = taxable;
        this.#grossPaye = grossPaye;
        this.#insuranceRelief = insuranceRelief;
        this.#netPaye = netPaye;
        this.#netPay = netPay;
        this.#voluntary = voluntary;
        this.#takeHome = takeHome;
        this.#employer = {
            nssf: employerNssf,
            shif: shif,
            ahl: ahl,
            costToCompany: this.#round(gross + employerNssf + shif + ahl)
        };
    }

    get netPay() { return this.#netPay; }
    get takeHome() { return this.#takeHome; }

    /**
     * @returns {object} Every computed line (monthly KES), the voluntary
     * breakdown, and the employer cost-to-company figures. Annual = monthly x 12.
     */
    getBreakdown() {
        const i = this.#input;
        return {
            gross: this.#gross,
            nssf: this.#nssf,
            shif: this.#shif,
            ahl: this.#ahl,
            taxableIncome: this.#taxableIncome,
            grossPaye: this.#grossPaye,
            personalRelief: RATES.personalRelief,
            insuranceRelief: this.#insuranceRelief,
            netPaye: this.#netPaye,
            netPay: this.#netPay,
            totalVoluntary: this.#voluntary,
            takeHome: this.#takeHome,
            voluntaryItems: {
                'HELB Loan': i.helb,
                'SACCO Contribution': i.sacco,
                'Pension Top-Up': i.pensionTopUp,
                'Insurance Premium': i.insurance,
                'Child Care': i.childCare,
                'Commuter Allowance': i.commuter
            },
            employer: this.#employer
        };
    }
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

        document.getElementById('grossForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleGrossSubmit();
        });

        document.getElementById('netForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNetSubmit();
        });

        document.querySelectorAll('.collapsible-header').forEach(header => {
            header.addEventListener('click', () => this.toggleCollapsible(header));
        });
    }

    /**
     * Toggles a collapsible section open/closed and keeps aria-expanded in sync.
     * @param {HTMLElement} header - The collapsible header button.
     */
    toggleCollapsible(header) {
        const expanded = header.getAttribute('aria-expanded') === 'true';
        header.setAttribute('aria-expanded', String(!expanded));
        header.nextElementSibling.classList.toggle('collapsed');
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
     * Reads the gross salary form, validates the basic figure, constructs a
     * GrossSalary instance, and renders the result. All amounts are in KES.
     */
    handleGrossSubmit() {
        const basic = parseFloat(document.getElementById('gross-basic').value);
        const allowances = parseFloat(document.getElementById('gross-allowances').value) || 0;
        const benefits = parseFloat(document.getElementById('gross-benefits').value) || 0;

        if (isNaN(basic) || basic < 0) {
            return;
        }

        const grossSalary = new GrossSalary(basic, allowances, benefits);
        this.displayResult(grossSalary, 'gross');
        this.clearForm('grossForm');
    }

    /**
     * Reads the net salary form, validates the gross figure, builds a
     * NetSalaryCalculator, and renders the breakdown. Amounts are in KES.
     * Only the gross is required; every other field defaults to 0.
     */
    handleNetSubmit() {
        const gross = parseFloat(document.getElementById('net-gross').value);
        if (isNaN(gross) || gross < 0) {
            return;
        }

        const num = (id) => parseFloat(document.getElementById(id).value) || 0;
        const input = {
            basic: gross,
            allowances: num('net-allowances'),
            otherBenefits: num('net-benefits'),
            helb: num('net-helb'),
            sacco: num('net-sacco'),
            pensionTopUp: num('net-pension'),
            insurance: num('net-insurance'),
            childCare: num('net-childcare'),
            commuter: num('net-commuter'),
            houseAllowance: num('net-house'),
            transportAllowance: num('net-transport'),
            otherAllowance: num('net-other-allowance'),
            mortgageInterest: num('net-mortgage'),
            healthInsurance: num('net-health'),
            lifeInsurance: num('net-life'),
            isPWD: document.getElementById('net-pwd').checked
        };

        const calculator = new NetSalaryCalculator(input);
        this.displayNetResult(calculator.getBreakdown());
    }

    /**
     * Removes the empty-state placeholder if present, appends the net salary
     * breakdown card, and scrolls the results section into view.
     * @param {object} breakdown - The result of NetSalaryCalculator.getBreakdown().
     */
    displayNetResult(breakdown) {
        const resultsContainer = document.getElementById('resultsContainer');

        const emptyState = resultsContainer.querySelector('.empty-state');
        if (emptyState) {
            emptyState.remove();
        }

        resultsContainer.insertAdjacentHTML('beforeend', this.createNetResultCard(breakdown));
        document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Builds the net salary result card: a Salary Breakdown table (Monthly |
     * Annual) with Net Pay emphasized, plus a Cost to Company table. Surfaces a
     * non-blocking warning when voluntary deductions exceed net pay.
     * @param {object} b - The breakdown object.
     * @returns {string} HTML string ready for insertion into the DOM.
     */
    createNetResultCard(b) {
        const row = (label, monthly, cls = '') =>
            `<tr class="${cls}"><td>${label}</td><td>${formatKES(monthly)}</td><td>${formatKES(monthly * 12)}</td></tr>`;

        let voluntaryRows = '';
        for (const [label, amount] of Object.entries(b.voluntaryItems)) {
            if (amount > 0) {
                voluntaryRows += row(label, amount, 'deduction-row');
            }
        }

        const takeHomeRow = b.totalVoluntary > 0
            ? row('Take-Home After All Deductions', b.takeHome, 'net-row takehome-row')
            : '';

        const warning = b.totalVoluntary > b.netPay
            ? `<div class="net-warning">Voluntary deductions exceed net pay — the take-home figure is negative. Please review the optional deductions.</div>`
            : '';

        return `
            <div class="result-card net-result">
                <div class="result-header">
                    <h3 class="employee-name">Salary Breakdown</h3>
                    <span class="employee-badge badge-net">Net Salary</span>
                </div>
                <table class="breakdown-table">
                    <thead>
                        <tr><th>Item</th><th>Monthly (KES)</th><th>Annual (KES)</th></tr>
                    </thead>
                    <tbody>
                        ${row('Gross Income', b.gross)}
                        ${row('PAYE (Income Tax)', b.netPaye, 'deduction-row')}
                        ${row('NSSF Contribution', b.nssf, 'deduction-row')}
                        ${row('SHIF Contribution (2.75%)', b.shif, 'deduction-row')}
                        ${row('Housing Levy (1.5%)', b.ahl, 'deduction-row')}
                        ${row('Personal Relief', b.personalRelief, 'relief-row')}
                        ${row('Net Pay', b.netPay, 'net-row')}
                        ${voluntaryRows}
                        ${takeHomeRow}
                    </tbody>
                </table>
                ${warning}
                <table class="breakdown-table ctc-table">
                    <caption>Cost to Company (Employer View)</caption>
                    <thead>
                        <tr><th>Item</th><th>Monthly (KES)</th><th>Annual (KES)</th></tr>
                    </thead>
                    <tbody>
                        ${row('Gross Salary', b.gross)}
                        ${row('Employer NSSF', b.employer.nssf, 'deduction-row')}
                        ${row('Employer SHIF (2.75%)', b.employer.shif, 'deduction-row')}
                        ${row('Employer Housing Levy (1.5%)', b.employer.ahl, 'deduction-row')}
                        ${row('Total Cost to Company', b.employer.costToCompany, 'net-row')}
                    </tbody>
                </table>
            </div>
        `;
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
            'parttime': 'Part-Time',
            'gross': 'Gross'
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
        } else if (type === 'gross') {
            totalLabel = 'Total Gross Salary';
            totalValue = employee.gross;
            detailsHTML = `
                <div class="detail-row">
                    <span class="detail-label">Basic Salary:</span>
                    <span class="detail-value">${formatKES(employee.basicSalary)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Allowances:</span>
                    <span class="detail-value">${formatKES(employee.allowances)}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Other Taxable Benefits:</span>
                    <span class="detail-value">${formatKES(employee.otherTaxableBenefits)}</span>
                </div>
            `;
        }

        // Gross results carry no employee name; the other types use the full name.
        const cardTitle = type === 'gross' ? 'Gross Salary' : employee.fullName;
        // Gross is reported in KES; the hourly-based types stay in USD.
        const totalDisplay = type === 'gross'
            ? formatKES(totalValue)
            : `$${totalValue.toFixed(2)}`;

        return `
            <div class="result-card">
                <div class="result-header">
                    <h3 class="employee-name">${cardTitle}</h3>
                    <span class="employee-badge badge-${type}">${typeLabels[type]}</span>
                </div>
                <div class="result-details">
                    ${detailsHTML}
                    <div class="detail-row total-row">
                        <span class="detail-label">${totalLabel}:</span>
                        <span class="detail-value">${totalDisplay}</span>
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
