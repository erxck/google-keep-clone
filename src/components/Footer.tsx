export default function Footer(): JSX.Element {
  return (
    <footer className="flex justify-center text-center py-2 px-3 bg-gray-200 sm:px-5">
      <p className="text-sm text-gray-600 sm:text-base">
        Projetado e desenvolvido por{" "}
        <a
          className="font-bold border-b border-emerald-500 hover:border-emerald-600 text-emerald-500 hover:text-emerald-600 duration-300"
          href={"https://github.com/erxck"}
          target="_blank"
          rel="noreferrer"
        >
          Erick Rian
        </a>
      </p>
    </footer>
  );
}
