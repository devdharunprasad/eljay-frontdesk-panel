
import { useParams } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Calendar } from "@/components/ui/calendar";
import { MoreVertical } from "lucide-react";

function getAge(dob: string) {
	const birth = new Date(dob);
	const today = new Date();
	let age = today.getFullYear() - birth.getFullYear();
	const m = today.getMonth() - birth.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
	return age;
}


const PatientDetails: React.FC = () => {
	const { id } = useParams();
	const { data, isLoading } = useFetch(`/patients/${id}`,1);
	const patient = data?.patient;
	const [editing, setEditing] = useState(false);
	const [form, setForm] = useState<any>(null);

	// Initialize form state when patient data loads
	React.useEffect(() => {
		if (patient) {
			setForm({ ...patient });
		}
	}, [patient]);

	if (isLoading) return <div className="p-6">Loading...</div>;
	if (!patient || !form) return <div className="p-6 text-red-500">Patient not found.</div>;

	function handleEdit() {
		setEditing(true);
	}
	function handleCancel() {
		setEditing(false);
		setForm({ ...patient });
	}
	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		setForm((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
	}
	function handleDateChange(date: Date) {
		setForm((prev: any) => ({ ...prev, dob: date.toISOString().slice(0, 10) }));
	}

	return (
		<div className="p-6">
			{/* Header */}
			<div className="flex items-center gap-4 mb-4">
				<div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-2xl font-bold text-orange-700">
					{form.full_name.split(" ").map((n: string) => n[0]).join("")}
				</div>
				<div className="flex-1">
					<div className="flex items-center gap-2">
						<span className="text-xl font-semibold">{form.full_name}</span>
						{form.type && <Badge variant="secondary">{form.type}</Badge>}
						<Badge variant="outline" className="bg-blue-100 text-blue-700">{form.status === "active" ? "New" : form.status}</Badge>
					</div>
					<div className="text-gray-500 text-sm">
						Patient ID: {form.patient_id} • Last updated: {form.updated_at?.slice(0, 10) || "-"}
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<MoreVertical />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
						<DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			{/* Card */}
			<Card className="rounded-xl">
				<CardContent className="p-6">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center gap-2">
							<span className="font-semibold text-lg">Patient Information</span>
						</div>
					</div>
					<hr className="mb-4" />
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
						<div>
							<div className="font-semibold mb-2">Personal Details</div>
							<div className="flex flex-col gap-2">
								<div>
									<span className="font-medium">Full Name *</span>
									<Input name="full_name" value={form.full_name} onChange={handleChange} disabled={!editing} />
								</div>
								<div>
									<span className="font-medium">Date of Birth</span>
									<Input
										type="date"
										name="dob"
										value={form.dob}
										onChange={handleChange}
										disabled={!editing}
									/>
									<span className="text-xs text-gray-500">({getAge(form.dob)} years)</span>
								</div>
								<div>
									<span className="font-medium">Gender</span>
									<Input name="gender" value={form.gender || "-"} onChange={handleChange} disabled={!editing} />
								</div>
								<div>
									<span className="font-medium">Occupation</span>
									<Input name="occupation" value={form.occupation} onChange={handleChange} disabled={!editing} />
								</div>
							</div>
						</div>
						<div>
							<div className="font-semibold mb-2">Contact Information</div>
							<div className="flex flex-col gap-2">
								<div>
									<span className="font-medium">Mobile Number *</span>
									<Input name="mobile_number" value={form.mobile_number} onChange={handleChange} disabled={!editing} />
								</div>
								<div>
									<span className="font-medium">Email Address</span>
									<Input name="email_address" value={form.email_address} onChange={handleChange} disabled={!editing} />
								</div>
								<div>
									<span className="font-medium">Address</span>
									<Input name="address" value={form.address || "Not provided"} onChange={handleChange} disabled={!editing} />
								</div>
							</div>
						</div>
					</div>
					{editing && (
						<div className="flex gap-2 mt-4">
							<Button variant="default" className="bg-[#f54a00]">Save</Button>
							<Button variant="outline" onClick={handleCancel}>Cancel</Button>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default PatientDetails;
