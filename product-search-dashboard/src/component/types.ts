export type Employee = {
    _id: string;
    name: string;
    email: string;
    department: string;
    salary: number;
    employeeType: string;
    organization: string[];
};


export type EmployeeForm = {
    name: string;
    email: string;
    department: string;
    salary: string;
    employeeType: string;
    organization: string[];
}

export type Sorting = "default" | "lowToHigh" | "highToLow";