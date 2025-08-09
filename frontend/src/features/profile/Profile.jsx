import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import SelectSlot from "./SelectSlot";
import { useAuth } from "@/context/AuthContext";

function Profile() {
  const {user} = useAuth(null);

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
            <span>Name</span>
            <span className="font-medium">{user.first_name } {user.last_name}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
            <span>Branch </span>
            <span className="font-medium">{user.branch || "N/A"}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
            <span>Current Year </span>
            <span className="font-medium">{user.year || "N/A"}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600 border-b pb-2">
            <span>Joined</span>
            <span className="font-medium">{user.created_at || "N/A"}</span>
          </div>
        </CardContent>
      </Card>
      <SelectSlot/>
    </div>
  );
}

export default Profile;

