// Sidebar.js
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-white shadow-lg">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold"></h2>
        </div>

        <nav className="mt-6">
          <ul className="space-y-4">
            {/* Appointments */}
            <li>
              <Link
                to="/appointments"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span className="material-icons"></span>
                <span>Appointments</span>
              </Link>
            </li>

            {/* Patients */}
            <li>
              <Collapsible open={isCollapsed} onOpenChange={() => setIsCollapsed(!isCollapsed)}>
                <CollapsibleTrigger className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                  <span className="material-icons"></span>
                  <NavLink to="/dashboard/patients" className="text-gray-700 hover:text-gray-900">
                    Patients
                  </NavLink>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <ul className="space-y-2 pl-6">
                    <li>
                      <Link to="/patients/list" className="text-gray-600 hover:text-gray-800">
                        List
                      </Link>
                    </li>
                    <li>
                      <Link to="/patients/new" className="text-gray-600 hover:text-gray-800">
                        Add New
                      </Link>
                    </li>
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </li>

            {/* Other Links */}
            <li>
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span className="material-icons"></span>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/doctor-referrals"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span className="material-icons"></span>
                <span>Doctor Referrals</span>
              </Link>
            </li>
            <li>
              <Link
                to="/billing"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span className="material-icons"></span>
                <span>Billing</span>
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span className="material-icons"></span>
                <span>Inventory</span>
              </Link>
            </li>

            {/* Settings */}
            <li>
              <Link
                to="/settings"
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span className="material-icons"></span>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
