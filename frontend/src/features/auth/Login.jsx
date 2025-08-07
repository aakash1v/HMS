import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(form);
    // TODO: Handle login logic here
  }

  return (
    <div className=" flex items-center justify-center bg-gray-100 px-4 ">
      <form
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-2xl shadow-lg mt-10"
        onSubmit={handleSubmit}
      >
        <div className="flex items-center justify-center gap-2">
          <LogIn className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
        </div>

        <div className="space-y-1">
          <Label htmlFor="email" className="text-sm text-gray-600">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
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
            placeholder="••••••"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full"
          />
        </div>

        <Button className="w-full bg-purple-500 hover:bg-purple-700 cursor-pointer" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}

