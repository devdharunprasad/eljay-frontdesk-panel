
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

// PatientTable.js
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
const PatientsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
    const { data, isLoading } = useFetch(`/patients?page=${page}&limit=${limit}`, limit);
console.log(data);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Filter</Button>
          <Button variant="default" color="orange">+ Add Patient</Button>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr>
                <th className="p-2">
                  <Checkbox />
                </th>
                <th className="p-2 text-left">Patient</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Phone</th>
                <th className="p-2 text-left">Age</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Last Visit</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((patient: any) => (
                <tr key={patient.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">
                    <Checkbox />
                  </td>
                  <td className="p-2">
                    <div className="font-medium">{patient.full_name}</div>
                    <div className="text-sm text-gray-600">{patient.ref_id}</div>
                  </td>
                  <td className="p-2">{patient.email_address}</td>
                  <td className="p-2">{patient.mobile_number}</td>
                  <td className="p-2">{patient.age}</td>
                  <td className="p-2">{patient.gender}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${patient.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="p-2">{patient.lastVisit || patient.created_at?.slice(0, 10)}</td>
                  <td className="p-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical size={16} className="text-gray-500" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-end items-center gap-2 p-4">
            <Button
              variant="outline"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <span>
              Page {data?.page} of {data?.totalPages}
            </span>
            <Button
              variant="outline"
              disabled={page >= (data?.totalPages || 1)}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientsTable;