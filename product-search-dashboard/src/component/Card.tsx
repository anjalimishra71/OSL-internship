import type { Employee } from "./types";

type CardProps = {
    employee: Employee;
    handleDelete: (id: string) => void;
    handleEdit: (id: string) => void;
}

const Card = ({ employee, handleDelete, handleEdit }: CardProps) => {
    return (
        <div>
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
                <h2 className="mb-2 text-xl font-semibold text-gray-800">
                    {employee.name}
                </h2>

                <p className="mb-1 text-sm text-gray-600">
                    {employee.email}
                </p>
                 <p className="mb-1 text-sm text-gray-600">
                    {employee.organization+" "}
                </p>

                <p className="mb-1 text-sm text-gray-600">
                    Department: {employee.department}
                </p>

                <p className="mb-4 text-lg font-semibold text-gray-800">
                    ₹{employee.salary.toLocaleString()}
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={() => handleDelete(employee._id)}
                        className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 cursor-pointer"
                    >
                        Delete
                    </button>

                    <button
                        onClick={() => handleEdit(employee._id)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 cursor-pointer"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Card;