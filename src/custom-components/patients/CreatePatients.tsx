"use client";
import * as React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { usePost } from "@/hooks/usePost";

// If you haven't added these components yet, run:
// npx shadcn@latest add dialog button input label textarea popover calendar form select

const schema = z.object({
  full_name: z.string().min(2, "Name is too short"),
  mobile_number: z
    .string()
    .regex(/^\d{10}$/g, "Enter a valid 10-digit mobile number"),
  email_address: z.string().email("Invalid email"),
  dob: z.date().refine((val) => val instanceof Date && !isNaN(val.getTime()), {
    message: "Pick a date of birth",
  }),
  gender: z.enum(["Male", "Female", "Other"], { message: "Select a gender" }),
  occupation: z.string().min(2, "Occupation is required"),
  address: z.string().min(4, "Address is required"),
});

export type PatientFormValues = z.infer<typeof schema>;

function toISODate(d: Date) {
  // yyyy-mm-dd
  return d.toISOString().slice(0, 10);
}

export default function PatientCreateDialog() {
  const [open, setOpen] = useState(false);
  const {handlePost, isLoading} = usePost()

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      full_name:  "",
      mobile_number:  "",
      email_address:  "",
      dob: new Date("2000-01-01"),
      gender: undefined,
      occupation:  "",
      address: "",
    },
    mode: "onTouched",
  });

  async function handleSubmit(values: PatientFormValues) {
    const payload = {
      full_name: values.full_name,
      mobile_number: values.mobile_number,
      email_address: values.email_address,
      dob: toISODate(values.dob),
      gender: values.gender,
      occupation: values.occupation,
      address: values.address,
    };

    try {
      // Call the onCreate function if it exists
      handlePost("/patients", payload);
      setOpen(false);
      form.reset();
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#f54a00] hover:bg-[#d54100] text-white">Create Patient</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[560px]">
        <DialogHeader>
          <DialogTitle>New Patient</DialogTitle>
          <DialogDescription>Enter the patient details below and click Create.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dharun" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile Number</FormLabel>
                  <FormControl>
                    <Input inputMode="numeric" maxLength={10} placeholder="7358527440" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email_address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="dharun@vizdale.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                              onChange={e => field.onChange(new Date(e.target.value))}
                              min="1940-01-01"
                              max={format(new Date(), "yyyy-MM-dd")}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="occupation"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Occupation</FormLabel>
                  <FormControl>
                    <Input placeholder="Developer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="This is where I live" rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="sm:col-span-2 mt-2">
              <DialogClose asChild>
                <Button type="button" variant="ghost">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled = {isLoading} className="bg-[#f54a00] hover:bg-[#d54100] text-white">{isLoading ? "Creating..." : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

// Example of using preset values (like in your prompt)
// <PatientCreateDialog preset={{
//   full_name: "Dharun",
//   mobile_number: "7358527440",
//   email_address: "dharun@vizdale.com",
//   dob: new Date("2002-10-03"),
//   gender: "Male",
//   occupation: "Developer",
//   address: "This is where I live",
// }}
// onCreate={async (payload) => {
//   await fetch("/api/patients", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
// }} />
