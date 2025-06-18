export default function LoginPage() {
  return (
    <div className="pt-16 flex items-start justify-center bg-gradient-to-br from-gray-900 to-gray-800 min-h-[calc(100vh-60px)] px-4">
      <div className="w-full max-w-sm bg-[#2a2f38] rounded-3xl shadow-2xl p-8">
        
        
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Login
        </h2>
        

        {/* Formulario de Log in */}
        <form className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />                
          <input
            type="email"
            placeholder="E-mail"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"        
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-gray-700 text-white px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          <label className="flex items-start gap-2 text-sm text-white">
            <input type="checkbox" className="mt-1 accent-teal-600" />
            <span>You are about to change your body, your mind, your life!</span>
          </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-950 to-teal-500 active:brightness-125 transition duration-300 text-white placeholder:text-white outline-none font-bold py-2 rounded-full mt-2"
          >
            LOG IN
          </button>
        </form>

        {/* Footer */}
       
         <div className="mt-6 text-center text-gray-400">
          Don't have an account?
          <button className="ml-2 bg-gradient-to-r from-teal-600 to-teal-300 text-transparent bg-clip-text font-semibold">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}