import { useState } from "react";
import type { EmployeeForm } from "./types";
import type { ChangeEvent, FormEvent } from "react";
import { toast } from "react-toastify";

type FormProps = {
    employee: EmployeeForm;
    handleCancel: () => void;
    handleSubmit: (form: EmployeeForm) => void;
    organizations: string[];
}


const Form = ({ employee, handleCancel, handleSubmit, organizations }: FormProps) => {
    let [form, setForm] = useState<EmployeeForm>(employee)

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSmt = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.employeeType === "full-time" && form.organization.length > 1) {
            toast.error("Full-time employee can have only one organization");
            return;
        }

        if (form.organization.length === 0) {
            toast.error("Please select an organization");
            return;
        }

        handleSubmit(form);
    }; 
    return (
        <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-6">
            <form onSubmit={handleSmt} className="space-y-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Organization:
                    </label>

                    <select
                        name="organization"
                        multiple
                        value={form.organization}
                        onChange={(e) => {
                            const selectedOrganizations = Array.from(
                                e.target.selectedOptions,
                                option => option.value
                            );

                            setForm(prev => ({
                                ...prev,
                                organization: selectedOrganizations
                            }));
                        }}
                        className="h-28 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
                    >

                        {organizations.map(organization => (
                            <option key={organization} value={organization}>{organization}</option>
                        )
                        )}
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Employee Type:
                    </label>

                    <select
                        name="employeeType"
                        value={form.employeeType}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 outline-none focus:border-blue-500"
                    >
                        <option value="">Select Type</option>
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Name:
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Email:
                    </label>

                    <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Salary:
                    </label>

                    <input
                        type="text"
                        name="salary"
                        value={form.salary}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Department:
                    </label>

                    <input
                        type="text"
                        name="department"
                        value={form.department}
                        onChange={handleChange}
                        required
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-blue-500"
                    />
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        className="rounded-lg bg-gray-200 px-5 py-2 font-medium text-gray-700 hover:bg-gray-300 cursor-pointer"
                    >
                        Cancel
                    </button>
                </div>

            </form>
        </div>
    )
}
export default Form;