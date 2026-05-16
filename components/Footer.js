export default function Footer() {
  return (
    <footer className="relative mt-auto">

      {/* Borde top con gradiente brand */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(61,123,255,0.35) 30%, rgba(0,35,101,0.7) 50%, rgba(61,123,255,0.35) 70%, transparent 100%)',
        }}
      />

      <div className="bg-surface-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-5">

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://discord.gg/3UW8ZAAWrG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
            >
              <svg
                className="w-4 h-4 text-[#5865F2] group-hover:scale-110 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
              </svg>
              Discord
            </a>

            <a
              href="https://ikako.vip/r/moonreps"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-white transition-colors duration-200 group"
            >
              <svg
                className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Kakobuy
            </a>
          </div>

          {/* Copyright */}
          <p className="text-zinc-600 text-xs text-center sm:text-right">
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-zinc-400 font-medium">Moon Reps</span>.
            {' '}Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
