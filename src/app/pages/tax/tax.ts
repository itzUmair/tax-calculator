import {Component, inject, signal} from '@angular/core';
import {PrimengModule} from '../../primeng/primeng-module';
import {AppModule} from '../../app-module';
import {Salary} from '../../services/salary';
import {IMonth, ISalaryAllowance, ISalaryBreakup, ISalaryDeduction} from '../../interfaces/salary.interface';

@Component({
  selector: 'app-tax',
  imports: [PrimengModule, AppModule],
  templateUrl: './tax.html',
  styleUrl: './tax.css'
})
export class Tax {
  private readonly salaryService = inject(Salary);

  grossSalary = signal<number>(0)
  salaryBreakup= signal<ISalaryBreakup | null>(null);
  allowances = signal<ISalaryAllowance | null>(null);
  deductions = signal<ISalaryDeduction | null>(null);

  joiningMonth = signal<IMonth | null>(null);

  allowancesNameMap = {
    basic: 'Basic',
    houseRent: 'House Rent',
    medical: 'Medical',
    conveyanceAllowance: 'Conveyance Allowance',
    pfEmployerContribution: "PF Employer's Contribution",
    eobiEmployerContribution: "EOBI Employer's Contribution"
  }

  deductionsNameMap = {
    incomeTax: 'Income Tax',
    pfEmployeeContribution: "PF Employee's Contribution",
    eobiEmployeeContribution: "EOBI Employee's Contribution",
  }

  months: IMonth[] = [
    {monthName:'January', monthNumber: 1},
    {monthName:'February', monthNumber: 2},
    {monthName:'March', monthNumber: 3},
    {monthName:'April', monthNumber: 4},
    {monthName:'May', monthNumber: 5},
    {monthName:'June', monthNumber: 6},
    {monthName:'July', monthNumber: 7},
    {monthName:'August', monthNumber: 8},
    {monthName:'September', monthNumber: 9},
    {monthName:'October', monthNumber: 10},
    {monthName:'November', monthNumber: 11},
    {monthName:'December', monthNumber: 12},
  ]

  constructor() {
    this.joiningMonth.set(this.months[0])
  }

  calculateSalary() {
    if (this.grossSalary() === 0) return
    const breakup = this.salaryService.calculateSalaryBreakup(this.grossSalary(), this.joiningMonth()!.monthNumber)
    this.salaryBreakup.set(breakup)
    this.allowances.set(breakup.allowances)
    this.deductions.set(breakup.deductions)
  }
}
