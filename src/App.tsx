
import { CookiesProvider, useCookies } from "react-cookie";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import LoginForm from "./custom-components/login";
import PrimarySidebar from "./custom-components/common/PrimarySidebar";
import PatientsPage from "./custom-components/patients";


function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [cookies] = useCookies(["token"]);
  if (!cookies.token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

const router = createBrowserRouter([
  {
    path : "/",
    element: (
      <ProtectedRoute>
        <div className="flex h-screen">
          <PrimarySidebar />
          <main style={{ flex: 1, padding: "2rem" }}>
            <p>Welcome to Eljay hearing center</p>
          </main>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/patients",
    element: (
      <ProtectedRoute>
        <div className="flex h-screen">
          <PrimarySidebar />
          <main style={{ flex: 1, padding: "2rem" }}>
            <PatientsPage/>
                      </main>
        </div>
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
]);

function App() {

  console.log("API URL:", import.meta.env.API_URL);
  return (
    <CookiesProvider>
      <RouterProvider router={router} />;
    </CookiesProvider>
  );
}

export default App;
