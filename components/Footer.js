export default function Footer() {
    return (
        <footer className="border-t border-surface-800 bg-background py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <p className="text-zinc-500 text-sm">
                    &copy; {new Date().getFullYear()} <span className="text-zinc-300 font-medium">Moon Reps</span>. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
