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
 * Escapes the five HTML-significant characters so user-entered identity fields
 * are rendered as text, never markup, inside the payslip preview.
 * @param {string} str
 * @returns {string} The escaped string.
 */
function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[c]));
}

// Accepted image types and size cap for the optional company-logo upload.
const LOGO_TYPES = ['image/png', 'image/jpeg', 'image/webp'];
const LOGO_MAX_BYTES = 2 * 1024 * 1024;

/**
 * Assembles a payslip from identity fields, a gross figure, and optional
 * deductions. Reuses NetSalaryCalculator to derive the statutory deductions
 * (PAYE, NSSF, SHIF, Housing Levy) so the payslip always agrees with the Net
 * Salary calculator. Exposes the assembled data via a single getter.
 */
class Payslip {
    #data;

    constructor(input) {
        const calculator = new NetSalaryCalculator({
            basic: input.grossSalary,
            allowances: 0,
            otherBenefits: 0,
            helb: 0,
            sacco: input.sacco,
            pensionTopUp: input.pension,
            insurance: input.insurance,
            childCare: 0,
            commuter: 0,
            houseAllowance: 0,
            transportAllowance: 0,
            otherAllowance: 0,
            mortgageInterest: 0,
            healthInsurance: 0,
            lifeInsurance: 0,
            isPWD: false
        });
        const b = calculator.getBreakdown();

        const deductions = [
            { label: 'PAYE', amount: b.netPaye },
            { label: 'NSSF', amount: b.nssf },
            { label: 'SHIF', amount: b.shif },
            { label: 'Housing Levy', amount: b.ahl }
        ];
        if (input.sacco > 0) { deductions.push({ label: 'SACCO Loan', amount: input.sacco }); }
        if (input.pension > 0) { deductions.push({ label: 'Pension Scheme', amount: input.pension }); }
        if (input.insurance > 0) { deductions.push({ label: 'Insurance Premium', amount: input.insurance }); }

        const totalDeductions = Math.round(
            deductions.reduce((sum, d) => sum + d.amount, 0) * 100
        ) / 100;

        this.#data = {
            employeeName: input.employeeName || '',
            employeeId: input.employeeId || '',
            kraPin: input.kraPin || '',
            payPeriod: input.payPeriod || '',
            logoDataUrl: input.logoDataUrl || '',
            earnings: [{ label: 'Basic Salary', amount: b.gross }],
            deductions: deductions,
            totalEarnings: b.gross,
            totalDeductions: totalDeductions,
            netPay: b.takeHome
        };
    }

    get data() {
        return this.#data;
    }
}

/**
 * Exports a payslip to PNG, PDF, or DOCX. PNG and PDF are snapshots of the
 * on-screen preview node (via html2canvas); DOCX is rebuilt programmatically
 * from the payslip data so it stays fully editable in Word.
 */
class PayslipExporter {
    /**
     * @param {string} name - Raw filename seed.
     * @returns {string} A filesystem-safe filename (no extension).
     */
    static #sanitize(name) {
        return name.replace(/[^a-z0-9_-]+/gi, '_').replace(/^_+|_+$/g, '') || 'payslip';
    }

    static #filename(data) {
        return PayslipExporter.#sanitize(`${data.employeeName}_${data.payPeriod}_payslip`);
    }

    /**
     * Triggers a browser download for a Blob.
     */
    static #download(blob, filename) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    /**
     * Snapshots the payslip node and downloads it as a PNG image.
     */
    static exportPng(node, data) {
        return html2canvas(node, { scale: 2, backgroundColor: '#ffffff' }).then((canvas) => {
            canvas.toBlob((blob) => {
                PayslipExporter.#download(blob, PayslipExporter.#filename(data) + '.png');
            });
        });
    }

    /**
     * Snapshots the payslip node and places it on an A4 PDF page.
     */
    static exportPdf(node, data) {
        return html2canvas(node, { scale: 2, backgroundColor: '#ffffff' }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();

            let width = pageWidth;
            let height = canvas.height * width / canvas.width;
            if (height > pageHeight) {
                height = pageHeight;
                width = canvas.width * height / canvas.height;
            }
            const x = (pageWidth - width) / 2;
            pdf.addImage(imgData, 'PNG', x, 0, width, height);
            pdf.save(PayslipExporter.#filename(data) + '.pdf');
        });
    }

    /**
     * Converts a data URL to the byte array a docx ImageRun expects.
     */
    static #dataUrlToBytes(dataUrl) {
        const base64 = dataUrl.split(',')[1];
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }

    /**
     * Crops a square circle out of the centre of an image data URL and returns
     * it as a transparent-corner PNG data URL, so the logo reads as a circle in
     * the Word document (matching the on-screen and PNG/PDF appearance).
     * @param {string} dataUrl
     * @returns {Promise<string>} A circular PNG data URL (or the original on error).
     */
    static #toCircularPng(dataUrl) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const size = Math.min(img.width, img.height);
                const canvas = document.createElement('canvas');
                canvas.width = size;
                canvas.height = size;
                const ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                const sx = (img.width - size) / 2;
                const sy = (img.height - size) / 2;
                ctx.drawImage(img, sx, sy, size, size, 0, 0, size, size);
                resolve(canvas.toDataURL('image/png'));
            };
            img.onerror = () => resolve(dataUrl);
            img.src = dataUrl;
        });
    }

    /**
     * Builds and downloads an editable Word document mirroring the payslip.
     * If a logo is present it is circle-cropped first so it matches the preview.
     */
    static exportDocx(data) {
        if (data.logoDataUrl) {
            return PayslipExporter.#toCircularPng(data.logoDataUrl).then((circular) =>
                PayslipExporter.#buildDocx(data, circular));
        }
        return PayslipExporter.#buildDocx(data, '');
    }

    /**
     * Assembles the Word document and triggers the download.
     * @param {object} data - The payslip data.
     * @param {string} logoDataUrl - A (circular) logo data URL, or '' for none.
     */
    static #buildDocx(data, logoDataUrl) {
        const d = window.docx;

        // Brand palette (matching styles.css) and shared border definitions.
        const ACCENT = 'E85D04';
        const ACCENT_DARK = 'D84A00';
        const INK = '1A1A1A';
        const MUTED = '5F5F5F';
        const LIGHT = '8A8A8A';
        const NET_FILL = 'FCEDE2';
        const noBorder = { style: d.BorderStyle.NONE, size: 0, color: 'FFFFFF' };
        const hairline = { style: d.BorderStyle.SINGLE, size: 2, color: 'EEEEEE' };
        const blankBorders = {
            top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
            insideHorizontal: noBorder, insideVertical: noBorder
        };

        // One labelled line: left description, right-aligned amount.
        const itemRow = (label, amount, bold) => new d.TableRow({
            children: [
                new d.TableCell({
                    width: { size: 70, type: d.WidthType.PERCENTAGE },
                    margins: { top: 60, bottom: 60 },
                    children: [new d.Paragraph({ children: [new d.TextRun({ text: label, bold: !!bold, color: bold ? INK : MUTED })] })]
                }),
                new d.TableCell({
                    width: { size: 30, type: d.WidthType.PERCENTAGE },
                    margins: { top: 60, bottom: 60 },
                    children: [new d.Paragraph({ alignment: d.AlignmentType.RIGHT, children: [new d.TextRun({ text: formatKES(amount), bold: !!bold, color: INK })] })]
                })
            ]
        });

        // An itemised section: rows + a bold subtotal row, with hairline dividers.
        const itemTable = (items, totalLabel, totalAmount) => {
            const rows = items.map((it) => itemRow(it.label, it.amount, false));
            rows.push(itemRow(totalLabel, totalAmount, true));
            return new d.Table({
                width: { size: 100, type: d.WidthType.PERCENTAGE },
                borders: {
                    top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
                    insideHorizontal: hairline, insideVertical: noBorder
                },
                rows: rows
            });
        };

        // Accent-coloured uppercase section heading with an underline rule.
        const sectionTitle = (text) => new d.Paragraph({
            spacing: { before: 260, after: 100 },
            border: { bottom: { style: d.BorderStyle.SINGLE, size: 4, color: ACCENT } },
            children: [new d.TextRun({ text: text.toUpperCase(), bold: true, color: ACCENT, size: 20, characterSpacing: 20 })]
        });

        // Employee meta as a single borderless row of three key/value cells.
        const metaCell = (key, value, align) => {
            const alignment = align === 'center' ? d.AlignmentType.CENTER
                : align === 'right' ? d.AlignmentType.RIGHT
                : d.AlignmentType.LEFT;
            return new d.TableCell({
                width: { size: 33, type: d.WidthType.PERCENTAGE },
                margins: { top: 40, bottom: 40 },
                children: [
                    new d.Paragraph({ alignment: alignment, children: [new d.TextRun({ text: key.toUpperCase(), color: LIGHT, size: 14, characterSpacing: 16 })] }),
                    new d.Paragraph({ alignment: alignment, children: [new d.TextRun({ text: value || '—', size: 20, color: INK })] })
                ]
            });
        };
        const metaTable = new d.Table({
            width: { size: 100, type: d.WidthType.PERCENTAGE },
            borders: blankBorders,
            rows: [
                new d.TableRow({ children: [
                    metaCell('Employee No', data.employeeId, 'left'),
                    metaCell('Pay Period', data.payPeriod, 'center'),
                    metaCell('KRA PIN', data.kraPin, 'right')
                ] })
            ]
        });

        // Net Pay: a single shaded row, amount in accent.
        const netTable = new d.Table({
            width: { size: 100, type: d.WidthType.PERCENTAGE },
            borders: blankBorders,
            rows: [new d.TableRow({
                children: [
                    new d.TableCell({
                        width: { size: 60, type: d.WidthType.PERCENTAGE },
                        shading: { fill: NET_FILL },
                        margins: { top: 120, bottom: 120, left: 120 },
                        children: [new d.Paragraph({ children: [new d.TextRun({ text: 'NET PAY', bold: true, color: MUTED, size: 20, characterSpacing: 20 })] })]
                    }),
                    new d.TableCell({
                        width: { size: 40, type: d.WidthType.PERCENTAGE },
                        shading: { fill: NET_FILL },
                        margins: { top: 120, bottom: 120, right: 120 },
                        children: [new d.Paragraph({ alignment: d.AlignmentType.RIGHT, children: [new d.TextRun({ text: formatKES(data.netPay), bold: true, color: ACCENT_DARK, size: 30 })] })]
                    })
                ]
            })]
        });

        const children = [];
        if (logoDataUrl) {
            try {
                children.push(new d.Paragraph({
                    alignment: d.AlignmentType.CENTER,
                    children: [new d.ImageRun({
                        data: PayslipExporter.#dataUrlToBytes(logoDataUrl),
                        transformation: { width: 80, height: 80 }
                    })]
                }));
            } catch (err) {
                // A malformed logo should never block the document — skip it.
            }
        }
        children.push(new d.Paragraph({
            alignment: d.AlignmentType.CENTER,
            spacing: { after: 200 },
            children: [new d.TextRun({ text: data.employeeName || '—', bold: true, size: 32, color: INK })]
        }));
        children.push(metaTable);
        children.push(sectionTitle('Earnings'));
        children.push(itemTable(data.earnings, 'Total Earnings', data.totalEarnings));
        children.push(sectionTitle('Deductions'));
        children.push(itemTable(data.deductions, 'Total Deductions', data.totalDeductions));
        children.push(new d.Paragraph({ text: '', spacing: { after: 200 } }));
        children.push(netTable);
        children.push(new d.Paragraph({
            alignment: d.AlignmentType.CENTER,
            spacing: { before: 300 },
            children: [new d.TextRun({ text: 'This is a computer generated payslip and does not require a signature.', italics: true, size: 16, color: LIGHT })]
        }));

        const doc = new d.Document({ sections: [{ children: children }] });

        return d.Packer.toBlob(doc).then((blob) => {
            PayslipExporter.#download(blob, PayslipExporter.#filename(data) + '.docx');
        });
    }
}

/**
 * Manages form interactions, employee type switching, and result rendering.
 * A single instance is created on DOMContentLoaded.
 */
class UIController {
    constructor() {
        this.currentType = 'employee';
        this.currentPayslip = null;
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

        document.getElementById('payslipForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePayslipSubmit();
        });

        document.getElementById('viewPayslipBtn').addEventListener('click', () => this.openPayslipModal());
        document.getElementById('closePayslipBtn').addEventListener('click', () => this.closePayslipModal());

        const modal = document.getElementById('payslipModal');
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                this.closePayslipModal();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closePayslipModal();
            }
        });

        document.getElementById('exportPng').addEventListener('click', () => this.exportPayslip('png'));
        document.getElementById('exportPdf').addEventListener('click', () => this.exportPayslip('pdf'));
        document.getElementById('exportDocx').addEventListener('click', () => this.exportPayslip('docx'));

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
     * Reads the payslip form, validates the gross figure, reads any logo file,
     * builds a Payslip, and renders the preview. Identity fields are optional;
     * an invalid KRA PIN warns but never blocks (per the guide).
     */
    handlePayslipSubmit() {
        const gross = parseFloat(document.getElementById('ps-gross').value);
        if (isNaN(gross) || gross < 0) {
            return;
        }

        const pin = document.getElementById('ps-pin').value.trim();
        if (pin && !/^[A-Z]\d{9}[A-Z]$/.test(pin)) {
            console.warn('KRA PIN does not match the expected format (e.g. A012345678F).');
        }

        const build = (logoDataUrl) => {
            const input = {
                employeeName: document.getElementById('ps-name').value.trim(),
                employeeId: document.getElementById('ps-id').value.trim(),
                kraPin: pin,
                payPeriod: document.getElementById('ps-period').value.trim(),
                grossSalary: gross,
                sacco: parseFloat(document.getElementById('ps-sacco').value) || 0,
                pension: parseFloat(document.getElementById('ps-pension').value) || 0,
                insurance: parseFloat(document.getElementById('ps-insurance').value) || 0,
                logoDataUrl: logoDataUrl || ''
            };
            this.currentPayslip = new Payslip(input);
            this.showPayslipReady();
        };

        const errorEl = document.getElementById('ps-logo-error');
        errorEl.textContent = '';

        const logoInput = document.getElementById('ps-logo');
        const file = logoInput.files && logoInput.files[0];
        if (file) {
            this.loadAndSanitizeLogo(file)
                .then((cleanDataUrl) => build(cleanDataUrl))
                .catch((message) => { errorEl.textContent = message; });
        } else {
            build('');
        }
    }

    /**
     * Validates and sanitizes an uploaded logo entirely in the browser: checks
     * the type and size, then re-encodes the pixels through a canvas so only a
     * clean raster PNG is used (any embedded payload or metadata is discarded).
     * @param {File} file - The user-selected image file.
     * @returns {Promise<string>} Resolves with a clean PNG data URL, or rejects
     * with a user-facing message.
     */
    loadAndSanitizeLogo(file) {
        return new Promise((resolve, reject) => {
            if (!LOGO_TYPES.includes(file.type)) {
                reject('Please upload a PNG, JPEG, or WebP image.');
                return;
            }
            if (file.size > LOGO_MAX_BYTES) {
                reject('Image is too large. Please use a file under 2 MB.');
                return;
            }

            const reader = new FileReader();
            reader.onerror = () => reject('Could not read the selected file.');
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const maxDim = 512;
                    let width = img.width;
                    let height = img.height;
                    if (width > maxDim || height > maxDim) {
                        const scale = Math.min(maxDim / width, maxDim / height);
                        width = Math.round(width * scale);
                        height = Math.round(height * scale);
                    }
                    const canvas = document.createElement('canvas');
                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    resolve(canvas.toDataURL('image/png'));
                };
                img.onerror = () => reject('That file is not a valid image.');
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    /**
     * Shows a brief loading effect in the results column, then reveals a
     * "View Payslip" button. The payslip itself is not rendered here — it opens
     * full-screen on demand so it is never squeezed into the narrow column.
     */
    showPayslipReady() {
        const output = document.getElementById('payslipOutput');
        const loading = document.getElementById('payslipLoading');
        const ready = document.getElementById('payslipReady');

        output.classList.remove('hidden');
        loading.classList.remove('hidden');
        ready.classList.add('hidden');
        output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        setTimeout(() => {
            loading.classList.add('hidden');
            ready.classList.remove('hidden');
        }, 800);
    }

    /**
     * Renders the current payslip full-width and opens the full-screen overlay.
     */
    openPayslipModal() {
        if (!this.currentPayslip) {
            return;
        }
        this.renderPayslip(this.currentPayslip.data);
        document.getElementById('payslipModal').classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Closes the full-screen payslip overlay and restores background scrolling.
     */
    closePayslipModal() {
        document.getElementById('payslipModal').classList.remove('open');
        document.body.style.overflow = '';
    }

    /**
     * Renders the payslip preview node (full-width, inside the overlay).
     * @param {object} d - The payslip data from Payslip.data.
     */
    renderPayslip(d) {
        const row = (label, amount, cls = '') =>
            `<div class="ps-row ${cls}"><span>${escapeHtml(label)}</span><span>${formatKES(amount)}</span></div>`;

        const earningsRows = d.earnings.map((e) => row(e.label, e.amount)).join('');
        const deductionRows = d.deductions.map((x) => row(x.label, x.amount)).join('');
        const metaItem = (key, value, align = 'left') => {
            const alignClass = align === 'center' ? ' ps-center' : align === 'right' ? ' ps-right' : '';
            return `<div class="ps-meta-item${alignClass}"><span class="ps-k">${key}</span><span class="ps-v">${escapeHtml(value) || '—'}</span></div>`;
        };
        const logo = d.logoDataUrl
            ? `<img src="${d.logoDataUrl}" alt="Company logo" class="payslip-logo">`
            : '';

        document.getElementById('payslipPreview').innerHTML = `
            <header class="ps-head">
                ${logo}
                <h2 class="ps-name">${escapeHtml(d.employeeName) || '—'}</h2>
            </header>
            <section class="ps-meta">
                ${metaItem('Employee No', d.employeeId, 'left')}
                ${metaItem('Pay Period', d.payPeriod, 'center')}
                ${metaItem('KRA PIN', d.kraPin, 'right')}
            </section>
            <section class="ps-section">
                <h3 class="ps-section-title">Earnings</h3>
                ${earningsRows}
                ${row('Total Earnings', d.totalEarnings, 'ps-subtotal')}
            </section>
            <section class="ps-section">
                <h3 class="ps-section-title">Deductions</h3>
                ${deductionRows}
                ${row('Total Deductions', d.totalDeductions, 'ps-subtotal')}
            </section>
            <div class="ps-net">
                <span class="ps-net-label">Net Pay</span>
                <span class="ps-net-value">${formatKES(d.netPay)}</span>
            </div>
            <p class="ps-foot">This is a computer generated payslip and does not require a signature.</p>
        `;
    }

    /**
     * Dispatches the requested export format for the current payslip.
     * @param {string} format - 'png', 'pdf', or 'docx'.
     */
    exportPayslip(format) {
        if (!this.currentPayslip) {
            return;
        }
        const node = document.getElementById('payslipPreview');
        const data = this.currentPayslip.data;
        if (format === 'png') {
            PayslipExporter.exportPng(node, data);
        } else if (format === 'pdf') {
            PayslipExporter.exportPdf(node, data);
        } else if (format === 'docx') {
            PayslipExporter.exportDocx(data);
        }
    }

    /**
     * @param {string} formId - The id attribute of the form element to reset.
     */
    clearForm(formId) {
        document.getElementById(formId).reset();
        if (formId === 'payslipForm') {
            this.currentPayslip = null;
            document.getElementById('payslipPreview').innerHTML = '';
            document.getElementById('payslipOutput').classList.add('hidden');
            document.getElementById('payslipLoading').classList.remove('hidden');
            document.getElementById('payslipReady').classList.add('hidden');
            this.closePayslipModal();
        }
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
