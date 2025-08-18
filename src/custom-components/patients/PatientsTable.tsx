
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { MoreVertical } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

// PatientTable.js
import { useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import PatientCreateDialog from "./CreatePatients";
import { NavLink } from "react-router-dom";
const PatientsTable = () => {
  const [page, setPage] = useState(1);
  const limit = 10;
  const [gender, setGender] = useState<string | undefined>(undefined);
  const [status, setStatus] = useState<string | undefined>(undefined);

  // Build query string based on filters
  let query = `/patients?page=${page}&limit=${limit}`;
  if (gender) query += `&gender=${gender === "all" ? "" : gender}`;
  if (status) query += `&status=${status === "all" ? "" : status}`;

  const { data, isLoading } = useFetch(query, limit);
console.log(data);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Patients</h2>
        <div className="flex items-end space-x-2">

          {/* Gender Filter Dropdown (shadcn/ui) */}
          <div className="min-w-[120px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
            <Select value={gender ?? ""} onValueChange={val => setGender(val || undefined)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter Dropdown (shadcn/ui) */}
          <div className="min-w-[120px]">
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <Select value={status ?? ""} onValueChange={val => setStatus(val || undefined)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <PatientCreateDialog/>
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full">
            <thead className="bg-gray-100 text-sm text-gray-600">
              <tr className="h-12">
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
              {data?.patients?.map((patient: any) => (
                <tr key={patient.id} className="border-b text-sm h-12 hover:bg-gray-50">
                  <td className="p-2">
                    <Checkbox />
                  </td>
                  <td className="p-2">
                    <div className="font-medium">{patient.full_name}</div>
                    <div className="text-sm text-gray-600">{patient.ref_id}</div>
                  </td>
                  <td className="p-2 ">{patient.email_address}</td>
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
                        <DropdownMenuItem>
                          <NavLink className="block h-full w-full" to={`/patients/${patient.patient_id}`}>View</NavLink>
                        </DropdownMenuItem>
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