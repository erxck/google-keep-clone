import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col h-screen w-full bg-gray-200">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
