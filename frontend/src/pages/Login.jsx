function Login() {
  return (
    <div className="h-4/6">
      <h1 className="text-center text-3xl my-5">Login</h1>
      <form className="flex flex-col bg-gray-800 w-2/6 text-stone-40 mx-auto m-10 gap-5 px-10 py-5">
        <label htmlFor="username">
          Username
          <input type="text" id="username" name="username" placeholder="enter your username.."/>
        </label>

        <label htmlFor="password">
          Password
          <input type="text" id="password" name="password" placeholder="enter your password.." />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default Login;
