import { User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import SelectSlot from "./SelectSlot";

function Profile() {
  const { user } = useAuth();
  console.log(user)

  // Format Dates
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start min-h-screen bg-gray-50 px-4 py-10 gap-10">
      {/* Profile Card */}
      <Card className="w-full max-w-md shadow-xl border border-gray-200 rounded-2xl overflow-hidden bg-white">
        {/* Top Cover Section */}
        <div className="h-28 bg-gradient-to-r from-purple-500 to-indigo-500 relative">
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-purple-200 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <User className="w-12 h-12 text-purple-700" />
          </div>
        </div>

        <CardHeader className="flex flex-col items-center pt-14 pb-4">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            {user?.first_name} {user?.last_name}
          </CardTitle>
          <p className="text-gray-500 text-sm">{user?.email || "No email provided"}</p>
        </CardHeader>

        <CardContent className="space-y-4 px-6 pb-6">
          {[
            { label: "PRN", value: user?.prn },
            { label: "Role", value: user?.role || "User" },
            { label: "Branch", value: user?.branch },
            { label: "Current Year", value: user?.year },
            { label: "Date of Birth", value: formatDate(user?.dob) },
            { label: "Mobile", value: user?.mobile },
            { label: "Joined", value: formatDate(user?.createdAt) },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-sm border-b pb-2 last:border-none"
            >
              <span className="text-gray-500">{item.label}</span>
              <span className="font-medium text-gray-800">{item.value || "N/A"}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Slot Section */}
      <div className="w-full md:w-auto">
        <SelectSlot />
      </div>
    </div>
  );
}

export default Profile;

