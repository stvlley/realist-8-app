import Image from "next/image";
import Link from "next/link";
import Banner from "./LandingBanner";
import Contact from "./LandingContact";
import { Button } from "./ui/button";
import { ChevronRight } from "lucide-react";
import { LoginButton } from "./auth/login-button";

export default function LandingPage() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      {/* Updated Navbar */}
      <nav className="w-full fixed top-0 z-50 flex justify-center items-center bg-white shadow">
        <div className="max-w-7xl w-full flex justify-between items-center px-6">
          {/* Logo */}
          <Link href="/">
            <Image className="m-3" src="/slate-r-logo.svg" alt="Realist Logo" width={25} height={50} />
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-6">
            <li>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">
                <Button variant="link">
                  About Us
                </Button>
              </Link>
            </li>
            <li>
              <Link href="/auth/login" className="text-gray-700 hover:text-gray-900">
                <Button>
                  Sign In
                </Button>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Background SVG */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 w-full h-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
      >
        <defs>
          <pattern
            x="50%"
            y={-1}
            id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
            width={200}
            height={200}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <rect fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" width="100%" height="100%" strokeWidth={0} />
      </svg>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
          <div className="flex flex-col-2 gap-4 justify-between">
            <h1 className="mt-10 text-pretty font-semibold tracking-tight text-gray-900 text-6xl">
              Streamline Your Real Estate Workflow with Realist
            </h1>
            <Image className="hidden md:block" src="/slate-r-logo.svg" alt="Realist Logo" width={200} height={100} />
          </div>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Realist combines advanced AI, detailed property data, and curated contractor networks to simplify your workflow and maximize client satisfaction.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <LoginButton>
              <Button className="bg-cyan-600 hover:bg-cyan-500">
                Sign In
              </Button>
            </LoginButton>

            <Link href="/auth/register" className="flex items-center">
              <Button variant="link">
                Register <span><ChevronRight /></span>
              </Button>
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <img
                alt="App screenshot"
                src="https://cdn.dribbble.com/userupload/16784967/file/original-3fda9bf6f4f493f35660fb88fd205d7b.png?resize=752x&vertical=center"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />
            </div>
          </div>
        </div>
      </div>

      <Banner />
      <Contact />
    </div>
  );
}