export default function LoginPage() {
  return (
    <div className="pt-16 flex items-start justify-center bg-black/90 min-h-[calc(100vh-60px)] px-4">
      <div className="w-full max-w-xs text-white">
        {/* Acciones: Sign up (izquierda) y Log in (derecha) */}
        <div className="flex justify-between mb-6 space-x-2">
          <button
            className="w-1/2 bg-zinc-800 text-white py-2 rounded-full font-semibold"
            onClick={() => alert('Redirigir a /signup (aún no implementado)')}
          >
            Sign up
          </button>
          <button
            className="w-1/2 bg-cyan-400 bg-gradient-to-r from-teal-950 to-teal-400 text-white placeholder:text-white outline-none py-2 rounded-full font-bold"
          >
            Log in
          </button>
        </div>

        {/* Formulario de Log in */}
        <form className="space-y-4">

          <input
            type="text"
            placeholder="Username"
            className="w-full rounded-full px-4 py-2 bg-gradient-to-r from-teal-950 to-teal-400 text-white placeholder:text-white outline-none"
          />                
          <input
            type="email"
            placeholder="E-mail"
            className="w-full rounded-full px-4 py-2 bg-gradient-to-r from-teal-950 to-teal-400 text-white placeholder:text-white outline-none"        
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-full px-4 py-2 bg-gradient-to-r from-teal-950 to-teal-400 text-white placeholder:text-white outline-none"          

          />

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" className="mt-1 accent-teal-600" />
            <span>You are about to change your body, your mind, your life!</span>
          </label>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-950 to-teal-400 text-white placeholder:text-white outline-none font-bold py-2 rounded-full mt-2"
          >
            LOG IN
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Not a user yet? Sign up!
        </p>
      </div>
    </div>
  );
}