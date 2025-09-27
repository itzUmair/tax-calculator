import {Injectable} from '@angular/core';
import {ISalaryBreakup} from '../interfaces/salary.interface';

@Injectable({
  providedIn: 'root'
})
export class Salary {
  private BASIC_SALARY_PERCENTAGE: number = 0.6667;
  private MEDICAL_PERCENTAGE: number = 0.10;
  private PF_PERCENTAGE: number = 0.0833;
  private EOBI_EMPLOYER_CONTRIBUTION: number = 2000
  private EOBI_EMPLOYEE_CONTRIBUTION: number = 400
  private FISCAL_YEAR_START_MONTH:number = 7

  private TAX_BRACKETS = [
    {
      minIncome: 0,
      maxIncome: 600000,
      taxPercentage: 0,
      additionalCharges: 0
    },
    {
      minIncome: 600000,
      maxIncome: 1200000,
      taxPercentage: 0.01,
      additionalCharges: 0
    },
    {
      minIncome: 1200000,
      maxIncome: 2200000,
      taxPercentage: 0.11,
      additionalCharges: 6000
    },
    {
      minIncome: 2200000,
      maxIncome: 3200000,
      taxPercentage: 0.23,
      additionalCharges: 116000
    },
    {
      minIncome: 3200000,
      maxIncome: 4100000,
      taxPercentage: 0.30,
      additionalCharges: 346000
    },
    {
      minIncome: 4100000,
      maxIncome: Infinity,
      taxPercentage: 0.35,
      additionalCharges: 4100000
    },
  ]

  calculateSalaryBreakup(grossSalary: number, joiningMonth: number): ISalaryBreakup {
    const basicSalary = Math.round(grossSalary * this.BASIC_SALARY_PERCENTAGE);
    const medical = Math.round(basicSalary * this.MEDICAL_PERCENTAGE);
    const houseRent = Math.round(grossSalary - basicSalary - medical);
    const employerPF = Math.round(basicSalary * this.PF_PERCENTAGE);
    const employeePF = employerPF;
    const totalSalary = Math.round(grossSalary + employerPF + this.EOBI_EMPLOYER_CONTRIBUTION)

    const taxBracket = this.calculateIncomeTax(grossSalary, joiningMonth)

    let incomeTax = 0
    if (taxBracket) {
      incomeTax = (grossSalary * taxBracket.taxPercentage) + taxBracket.additionalCharges
    }

    const netSalary = Math.round(grossSalary - (this.EOBI_EMPLOYEE_CONTRIBUTION + employeePF + incomeTax));

    return {
      grossSalary,
      totalSalary,
      allowances: {
        basic: basicSalary,
        houseRent,
        medical,
        conveyanceAllowance: 0,
        pfEmployerContribution: employerPF,
        eobiEmployerContribution: this.EOBI_EMPLOYER_CONTRIBUTION,
      },
      deductions: {
        incomeTax,
        eobiEmployeeContribution: this.EOBI_EMPLOYEE_CONTRIBUTION,
        pfEmployeeContribution: employeePF
      },
      netSalary
    }
  }

  calculateIncomeTax(salary: number, joiningMonth: number, ) {
    const monthsTillFiscalYear = (this.FISCAL_YEAR_START_MONTH - joiningMonth) + 12;
    const salaryForFiscalYear = monthsTillFiscalYear * salary
    return this.TAX_BRACKETS.find(
      (bracket) =>
        salaryForFiscalYear >= bracket.minIncome && salaryForFiscalYear < bracket.maxIncome)
  }
}
