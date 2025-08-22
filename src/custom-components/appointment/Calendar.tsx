import { format, isSameDay, isSameMonth, isToday } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Appointment {
  id: string;
  title: string;
  start: Date;
  end: Date;
  clientName: string;
  status: "confirmed" | "pending" | "cancelled";
}

export function Calendar() {
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  // Sample appointments data
  const appointments: Appointment[] = [
    {
      id: "1",
      title: "Dental Checkup",
      start: new Date(2025, 7, 21, 9, 0),
      end: new Date(2025, 7, 21, 10, 0),
      clientName: "John Doe",
      status: "confirmed",
    },
    {
      id: "2",
      title: "Teeth Cleaning",
      start: new Date(2025, 7, 22, 11, 0),
      end: new Date(2025, 7, 22, 11, 30),
      clientName: "Jane Smith",
      status: "pending",
    },
  ];

  const dayAppointments = appointments.filter((appt) =>
    isSameDay(appt.start, selectedDay)
  );

  const isDaySelected = (day: Date) => {
    return isSameDay(day, selectedDay);
  };

  const isDayWithAppointments = (day: Date) => {
    return appointments.some((appt) => isSameDay(appt.start, day));
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-6xl mx-auto">
      {/* Calendar Section */}
      <div className="bg-white rounded-lg shadow p-4">
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={(day) => day && setSelectedDay(day)}
          month={currentMonth}
          onMonthChange={setCurrentMonth}
          className="border rounded-lg"
          modifiers={{
            today: (day) => isToday(day),
            selected: (day) => isDaySelected(day),
            hasAppointments: (day) => isDayWithAppointments(day),
          }}
          modifiersClassNames={{
            selected: "bg-blue-500 text-white",
            today: "font-bold",
            hasAppointments: "relative after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1 after:h-1 after:bg-blue-500 after:rounded-full",
          }}
          components={{
            Day: (props) => {
              const date = props?.day?.date ?? new Date();
              const hasAppointments = isDayWithAppointments(date);
              
              return (
                <button
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative ${
                    isToday(date) ? "border-2 border-blue-500" : ""
                  } ${
                    isSameMonth(date, currentMonth) ? "text-gray-900" : "text-gray-400"
                  }`}
                >
                  {format(date, "d")}
                  {hasAppointments && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></span>
                  )}
                </button>
              );
            },
          }}
        />
      </div>

      {/* Appointments List */}
      <div className="flex-1 bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4">
          Appointments for {format(selectedDay, "EEEE, MMMM d, yyyy")}
        </h2>
        
        {dayAppointments.length > 0 ? (
          <div className="space-y-4">
            {dayAppointments.map((appt) => (
              <div
                key={appt.id}
                className={`p-4 rounded-lg border-l-4 ${
                  appt.status === "confirmed"
                    ? "border-green-500 bg-green-50"
                    : appt.status === "pending"
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-red-500 bg-red-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{appt.title}</h3>
                    <p className="text-gray-600">{appt.clientName}</p>
                    <p className="text-sm text-gray-500">
                      {format(appt.start, "h:mm a")} - {format(appt.end, "h:mm a")}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      appt.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : appt.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No appointments scheduled for this day.</p>
          </div>
        )}

        <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <span>+</span> Schedule New Appointment
        </button>
      </div>
    </div>
  );
}