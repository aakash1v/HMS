import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import { registerStudent , registerStudentDjango} from "@/services/studentsApi.js"; // adjust path if needed
import toast from "react-hot-toast";
import { useNavigation } from "react-router-dom";

export default function Register() {
  const navigate = useNavigation()
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    prn: "",
    branch: "",
    dob: "",
    year: "",
    email: "",
    phone: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const newStudent = await registerStudent(form);
      const newStudent2 = await registerStudentDjango(form);
      console.log("Registered:", newStudent);
      console.log("Registered:", newStudent2);
      toast.success("Student registered successfully!");
      navigate("/auth/login")
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Failed to register student");

    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 overflow-scroll py-5">
      <form
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center gap-2">
          <UserPlus className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-800">Register Student</h2>
        </div>

        {[
          { label: "First Name", name: "first_name", type: "text" },
          { label: "Last Name", name: "last_name", type: "text" },
          { label: "PRN", name: "prn", type: "text" },
          { label: "Branch", name: "branch", type: "text" },
          { label: "Date of Birth", name: "dob", type: "date" },
          { label: "Current Year", name: "year", type: "number" },
          { label: "Email", name: "email", type: "email" },
          { label: "Phone", name: "phone", type: "tel" },
        ].map(({ label, name, type }) => (
          <div key={name} className="space-y-1">
            <Label htmlFor={name} className="text-sm text-gray-600">{label}</Label>
            <Input
              id={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required={name !== "email" && name !== "phone"}
              className="w-full"
            />
          </div>
        ))}

        <Button className="w-full bg-purple-500 hover:bg-purple-700 cursor-pointer" type="submit">
          Create Account
        </Button>
      </form>
    </div>
  );
}

