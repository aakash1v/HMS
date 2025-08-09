import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useState } from "react";
import {
  deleteStudent,
  registerStudent,
  registerStudentDjango,
} from "@/services/studentsApi.js"; // adjust path if needed
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    prn: "",
    branch: "",
    dob: "",
    year: "",
    email: "",
    mobile: "",
    username: "",
    password: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let newStudent;
    try {
      let payload = { ...form, year: Number(form.year) };
      newStudent = await registerStudent(payload);
      console.log("Registered (MongoDB):", newStudent);

      payload = { ...payload, mongoID: newStudent._id };
      const newStudent2 = await registerStudentDjango(payload);

      console.log("Registered (Django):", newStudent2);

      toast.success("Student registered successfully!");
      navigate("/auth/login");
    } catch (err) {
      if (err.response) {
        //deleting user if created in mongodb but not in Django
        if (newStudent) {
          const deletedStudent = await deleteStudent(newStudent._id);
          console.log("Deleted Student is ->", deletedStudent);
        }

        // Server responded with a status outside 2xx
        console.error("Backend Error:", err.response.data);
        console.error("Status:", err.response.status);

        // If Django sends field errors, you can display them
        if (typeof err.response.data === "object") {
          for (let field in err.response.data) {
            toast.error(`${field}: ${err.response.data[field]}`);
          }
        } else {
          toast.error(err.response.data?.message || "Request failed");
        }
      } else if (err.request) {
        // Request was made but no response
        console.error("No response from server:", err.request);
        toast.error("No response from server");
      } else {
        // Something else (network, config, etc.)
        console.error("Error:", err.message);
        toast.error("Something went wrong");
      }
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
          <h2 className="text-2xl font-semibold text-gray-800">
            Register Student
          </h2>
        </div>

        {[
          { label: "First Name", name: "first_name", type: "text" },
          { label: "Last Name", name: "last_name", type: "text" },
          { label: "PRN", name: "prn", type: "text" },
          { label: "Date of Birth", name: "dob", type: "date" },
          { label: "Current Year", name: "year", type: "number" },
          { label: "Email", name: "email", type: "email" },
          { label: "Mobile", name: "mobile", type: "tel" },
          { label: "Username", name: "username", type: "text" },
          { label: "Password", name: "password", type: "password" },
        ].map(({ label, name, type }) => (
          <div key={name} className="space-y-1">
            <Label htmlFor={name} className="text-sm text-gray-600">
              {label}
            </Label>
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
        <div className="space-y-1">
          <Label htmlFor="branch" className="text-sm text-gray-600">
            Branch
          </Label>
          <select
            id="branch"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2"
          >
            <option value="other">Select Branch</option>
            <option value="AI/ML">AI/ML</option>
            <option value="CSE">CSE</option>
            <option value="EE">EE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
            <option value="AG">AG</option>
            <option value="BBA">BBA</option>
            <option value="MBA">MBA</option>
            <option value="POLY">POLY</option>
          </select>
        </div>

        <Button
          className="w-full bg-purple-500 hover:bg-purple-700 cursor-pointer"
          type="submit"
        >
          Create Account
        </Button>
      </form>
    </div>
  );
}
