export interface ISalaryAllowance {
  basic: number;
  houseRent: number;
  medical: number;
  conveyanceAllowance: number;
  pfEmployerContribution: number;
  eobiEmployerContribution: number;
}

export interface ISalaryDeduction {
incomeTax: number;
pfEmployeeContribution: number;
eobiEmployeeContribution: number;
}

export interface ISalaryBreakup {
  grossSalary: number;
  totalSalary: number;
  netSalary: number;
  allowances: ISalaryAllowance;
  deductions: ISalaryDeduction;
}

export interface IMonth {
  monthName: string;
  monthNumber: number;
}
