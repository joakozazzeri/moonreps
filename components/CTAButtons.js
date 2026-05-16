import Image from 'next/image';

export default function CTAButtons() {
    return (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center my-8">
            <a
                href="https://ikako.vip/r/moonreps"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn bg-primary-500 hover:bg-primary-600 text-white px-6 py-4 gap-3 shadow-lg shadow-primary-500/20 group"
            >
                <Image
                    src="/kakobuy-logo.png"
                    alt="Kakobuy"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain group-hover:scale-110 transition-transform"
                />
                <span className="font-semibold">Registro + $410 Cupones</span>
            </a>

            <a
                href="https://discord.gg/3UW8ZAAWrG"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto btn bg-[#5865F2] hover:bg-[#4752C4] text-white px-6 py-4 gap-3 shadow-lg shadow-[#5865F2]/20 group"
            >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z" />
                </svg>
                <span>Únete al Discord</span>
            </a>
        </div>
    );
}
