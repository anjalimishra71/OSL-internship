import type { Employee as EmployeeType, EmployeeForm, Sorting } from "./types.ts"
import { toast } from 'react-toastify'
import Card from "./Card.js"
import Form from "./Form.js"
import type { ChangeEvent } from "react"
import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce.ts"


const Employee = () => {
    const [employeeData, setEmployeeData] = useState<EmployeeType[]>([]);
    const [search, setSearch] = useState<string>("");

    const debouncedSearch = useDebounce(search);

    const [department, setDepartment] = useState<string>("selectAll");
    const [sorting, setSorting] = useState<Sorting>("default");
    const [editingId, setEditingId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [organizations, setOrganizations] = useState<string[]>([]);
    const [selectedOrganization, setSelectedOrganization] = useState("all");
    const [showOrganizationForm, setShowOrganizationForm] = useState(false);
    const [organizationName, setOrganizationName] = useState("");
    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await fetch("http://localhost:5000/api/employees");
            const data = await response.json();

            setEmployeeData(data);
        };
        fetchEmployees();
    }, []);

    useEffect(() => {
        const fetchOrganizations = async () => {
            const response = await fetch("http://localhost:5000/api/organizations");
            const data = await response.json();

            setOrganizations(data.map((organization: { name: string }) => organization.name));
        };

        fetchOrganizations();
    }, []);

    const uniqueDepartment = [...new Set(employeeData.map(employeDepartment => employeDepartment.department))];

    console.log(employeeData);



    // const filteredEmployees = employeeData.filter((employe) => {
    //     return (
    //         department === "selectAll" ? employe.name.toLowerCase().includes(debouncedSearch.toLowerCase()) :
    //             employe.name.toLowerCase().includes(debouncedSearch.toLowerCase()) && employe.department === department
    //     )
    // })
    const filteredEmployees = employeeData.filter((employee) => {
        const matchesSearch = employee.name
            .toLowerCase()
            .includes(debouncedSearch.toLowerCase());

        const matchesDepartment =
            department === "selectAll" ||
            employee.department === department;

        const matchesOrganization =
            selectedOrganization === "all" ||
            employee.organization.includes(selectedOrganization);

        return matchesSearch && matchesDepartment && matchesOrganization;
    });

    const sortedEmployees = sorting === "default" ? filteredEmployees : (sorting === "lowToHigh" ? [...filteredEmployees].sort((a, b) => a.salary - b.salary) : sorting === "highToLow" && [...filteredEmployees].sort((a, b) => b.salary - a.salary))

    const handleDelete = async (id: string) => {

        const isConfirmed=window.confirm( "Are you sure you want to delete this employee?")
        if(!isConfirmed){
            return;
        }
        try {
            const response = await fetch(
                `http://localhost:5000/api/employees/${id}`,
                {
                    method: "DELETE"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to delete employee");
            }

            setEmployeeData(prev =>
                prev.filter(employee => employee._id !== id)
            );

            toast.success("Employee deleted successfully");
        } catch (error) {
            toast.error("Failed to delete employee");
        }
    };

    const handleEdit = (id) => {
        setEditingId(id)
    }

    const handleCancel = () => {
        setEditingId(null)
        setShowForm(false)
    }



    const handleSubmit = async (form: EmployeeForm) => {
        try {
            const response = await fetch(
                `http://localhost:5000/api/employees/${editingId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        ...form,
                        salary: Number(form.salary)
                    })
                }
            );

            const updatedEmployee = await response.json();

            setEmployeeData(prev =>
                prev.map(employee =>
                    employee._id === editingId
                        ? updatedEmployee
                        : employee
                )
            );

            setEditingId(null);
            setShowForm(false);

            toast.success("Employee updated successfully");
        } catch (error) {
            toast.error("Failed to update employee");
        }
    };


    const handleAddEmployee = async (form: EmployeeForm) => {
        try {
            const response = await fetch("http://localhost:5000/api/employees", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...form,
                    salary: Number(form.salary)
                })
            });

            const newEmployee = await response.json();

            setEmployeeData(prev => [...prev, newEmployee]);
            setShowForm(false);

            toast.success("Employee added successfully");
        } catch (error) {
            toast.error("Failed to add employee");
        }
    };

    const handleAddOrganization = async () => {
        if (!organizationName.trim()) {
            toast.error("Please enter organization name");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:5000/api/organizations",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: organizationName
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to add organization");
            }

            const newOrganization = await response.json();

            setOrganizations(prev => [...prev, newOrganization.name]);

            setOrganizationName("");
            setShowOrganizationForm(false);

            toast.success("Organization added successfully");
        } catch (error) {
            toast.error("Failed to add organization");
        }
    };


    //pagination
    const employeePerPage = 3;
    const lastIndex = currentPage * employeePerPage;
    const firstIndex = lastIndex - employeePerPage;
    const currentEmployees = sortedEmployees.slice(firstIndex, lastIndex);
    const totalPages = Math.max(
        1, Math.ceil(sortedEmployees.length / employeePerPage));

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }


    const handleNext = () => {
        if (currentPage < totalPages)
            setCurrentPage(prev => prev + 1)
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex gap-6">

                {/* Organization - 40% */}
                <div className="w-[40%] rounded-xl bg-white p-6 shadow-sm">
                    <h2 className="mb-5 text-2xl font-bold text-gray-800">
                        Organizations
                    </h2>

                    <div className="flex flex-col gap-3">
                        <p>Selected: {selectedOrganization}</p>
                        <button
                            className={`rounded-lg px-4 py-3 text-left font-medium transition ${selectedOrganization === "all"
                                ? "bg-blue-700 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                            onClick={() => setSelectedOrganization("all")}
                        >
                            All
                        </button>

                        {organizations.map((organization) => (
                            <button
                                key={organization}
                                className={`rounded-lg px-4 py-3 text-left font-medium transition ${selectedOrganization === organization
                                    ? "bg-blue-700 text-white"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                onClick={() => { setSelectedOrganization(organization); setCurrentPage(1); }}
                            >
                                {organization}
                            </button>
                        ))}
                    </div>


                    <button
                        onClick={() => setShowOrganizationForm(true)}
                        className="mt-4 w-full rounded-lg border border-dashed border-gray-400 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 cursor-pointer"
                    >
                        + Add Organization
                    </button>

                    {showOrganizationForm && (
                        <div className="mt-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
                            <input
                                type="text"
                                placeholder="Organization name"
                                value={organizationName}
                                onChange={(e) => setOrganizationName(e.target.value)}
                                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                            />

                            <div className="mt-3 flex gap-2">
                                <button
                                    onClick={handleAddOrganization}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                    Add
                                </button>

                                <button
                                    onClick={() => {
                                        setShowOrganizationForm(false);
                                        setOrganizationName("");
                                    }}
                                    className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Employees - 60% */}
                <div className="w-[60%] rounded-xl bg-white p-6 shadow-sm">

                    <div className="mb-6 flex flex-wrap items-end gap-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Sort Salary
                            </label>
                            <select
                                name=""
                                id=""
                                value={sorting}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    setSorting(e.target.value as Sorting);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="default">Default</option>
                                <option value="lowToHigh">Low to high</option>
                                <option value="highToLow">High to low</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700 ">
                                Department
                            </label>
                            <select
                                name=""
                                id=""
                                value={department}
                                className="rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500 cursor-pointer"
                                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                                    setDepartment(e.target.value);
                                    setCurrentPage(1);
                                }}
                            >
                                <option value="selectAll">SelectAll</option>

                                {uniqueDepartment.map((departmentEmploye, index) => {
                                    return (
                                        <option key={index} value={departmentEmploye}>
                                            {departmentEmploye}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Search Employee
                            </label>
                            <input
                                type="text"
                                value={search}
                                placeholder="Enter employee name"
                                className="rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>

                        <button
                            className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700 cursor-pointer"
                            onClick={() => setShowForm(true)}
                        >
                            Add Employee +
                        </button>
                    </div>

                    {showForm && (
                        <Form
                            employee={{
                                name: "",
                                email: "",
                                department: "",
                                salary: "",
                                employeeType: "",
                                organization: []
                            }}
                            handleCancel={handleCancel}
                            handleSubmit={handleAddEmployee}
                            organizations={organizations}
                        />
                    )}

                    <p className="font-bold uppercase text-center text-3xl text-cyan-950"> {selectedOrganization}</p>

                    <p className="mb-4 text-sm font-medium text-gray-600">
                        Page {currentPage} of {totalPages}
                    </p>


                    <div className="space-y-4">
                        {
                            currentEmployees.length > 0 ? (
                                currentEmployees.map(employee => {
                                    if (editingId === employee._id) {
                                        return (
                                            <Form
                                                key={employee._id}
                                                employee={{
                                                    ...employee,
                                                    salary: String(employee.salary)
                                                }}
                                                handleCancel={handleCancel}
                                                handleSubmit={handleSubmit}
                                                organizations={organizations}
                                            />
                                        );
                                    } else {
                                        return (
                                            <Card
                                                key={employee._id}
                                                employee={employee}
                                                handleDelete={handleDelete}
                                                handleEdit={handleEdit}
                                            />
                                        );
                                    }
                                })
                            ) : (
                                <h2 className="py-10 text-center text-xl font-semibold text-gray-500">
                                    No Employee Found
                                </h2>
                            )
                        }
                    </div>

                    <div className="mt-6 flex justify-center gap-3">
                        <button
                            className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-700 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                            onClick={handlePrevious}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>


                        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`rounded border px-3 py-2 cursor-pointer ${currentPage === page
                                        ? "bg-blue-600 text-white"
                                        : "bg-white text-gray-700 hover:bg-gray-100"
                                    }`}
                            >
                                {page}
                            </button>
                        )
                        )}


                        <button
                            className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Employee;