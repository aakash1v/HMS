import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import SelectSlot from "./SelectSlot";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/auth/login"); // redirect if not logged in
    }
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   navigate("/auth/login");
  // };

  if (!user) {
    return null; // avoids flicker before redirect
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-100 px-4 gap-5">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="flex flex-col items-center gap-3">
          <div className="w-20 h-20 bg-purple-200 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            {user.username || "Guest"}
          </CardTitle>
          <p className="text-gray-500 text-sm">{user.email || "No email provided"}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
            <span>Role</span>
            <span className="font-medium">{user.role || "User"}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
            <span>Joined</span>
            <span className="font-medium">{user.joined || "N/A"}</span>
          </div>

          <Button
            // onClick={handleLogout}
            variant="outline"
            className="w-full flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-600 hover:text-white"
            disabled={true}
          >
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </CardContent>
      </Card>
      <SelectSlot/>
    </div>
  );
}

export default Profile;

