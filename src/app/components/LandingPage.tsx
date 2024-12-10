import Image from "next/image";
import Link from "next/link";


export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white">

      <nav className="absolute top-4 right-4">

        USER BUTTON
      </nav>
      {/* background affects the whole page */}
      <svg
        aria-hidden="true"
        className="absolute inset-0 -z-10 size-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:shrink-0 lg:pt-8">
          <div className="flex flex-col-2 gap-4 justify-between">
            <h1 className="mt-10 text-pretty font-semibold tracking-tight text-gray-900 text-6xl">
              Streamline Your Real Estate Workflow with Realist
            </h1>
            <Image src="/slate-r-logo.svg" alt="Realist Logo" width={200} height={100} />
          </div>
          <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
            Realist combines advanced AI, detailed property data, and curated contractor networks to simplify your workflow and maximize client satisfaction.
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <div

              className="rounded-md bg-cyan-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
              
                <Link className="flex items-center" href="/sign-in">
                  Sign In 
                </Link>
             
            </div>
            
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
    </div>
  )
}