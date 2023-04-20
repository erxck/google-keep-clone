import { IconTailwind, IconReact, IconTypeScript, IconFirebase } from "./Icons";

export default function Header(): JSX.Element {
  return (
    <header className="flex flex-col justify-center items-center text-center gap-3 py-7 px-5">
      <h1 className="text-3xl text-black font-bold sm:text-4xl">
        Google Keep Clone
      </h1>
      <div className="flex items-center gap-3 lg:gap-5">
        {IconReact}
        {IconTypeScript}
        {IconTailwind}
        {IconFirebase}
      </div>
    </header>
  );
}
