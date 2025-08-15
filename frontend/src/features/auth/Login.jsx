import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { fetchUserDetails, loginUser } from "@/services/loginApi";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // 1️⃣ Login and get tokens
      let userData;
      const token = await loginUser(form); // { access, refresh }
      localStorage.setItem("access", token.access);
      localStorage.setItem("refresh", token.refresh);
      console.log(token);

      if (token.user.mongoID) {
        // 2️⃣ Fetch user profile using access token
        userData = await fetchUserDetails(token.user.mongoID);
        console.log(userData);
        // if (!res.ok) throw new Error("Failed to fetch user profile");
      } else {
        userData = { username: token.user.username, email: token.user.email, role:"admin" };
      }

      // 3️⃣ Store user info in localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      login(userData, token.access)

      toast.success("User successfully logged in");
      navigate("/");
    } catch (err) {
      if (err.response) {
        console.error("Backend Error:", err.response.data);
        console.error("Status:", err.response.status);

        if (typeof err.response.data === "object") {
          for (let field in err.response.data) {
            toast.error(`${field}: ${err.response.data[field]}`);
          }
        } else {
          toast.error(err.response.data?.message || "Request failed");
        }
      } else if (err.request) {
        console.error("No response from server:", err.request);
        toast.error("No response from server");
      } else {
        console.error("Error:", err.message);
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4">
      <form
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center gap-2">
          <LogIn className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
        </div>

        <div className="space-y-1">
          <Label htmlFor="username" className="text-sm text-gray-600">
            Username
          </Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="password" className="text-sm text-gray-600">
            Password
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>
        <div>
          <p>Don't have an account? <Link to="/auth/register" className="text-purple-950 cursor-pointer underline">  Sign Up Now</Link> </p>
        </div>

        <Button
          className="w-full bg-purple-500 hover:bg-purple-700 cursor-pointer"
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
