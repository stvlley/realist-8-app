"use client";
import { EnvelopeIcon, PhoneIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'
// import data from '@/../data/contractors.json'

// const contractors = data.contractors;

// when you get the real data dont forget to remove the import and use the data from the server
// you will also have to pass the data as a prop to the component
// so you will have to change the function signature to this:
// export default function ContractorsList({ contractors }) { ... }
export interface Contractor {
  id: number;
  name: string;
  rating: number;
  services: string[];
  location: {
    city: string;
    state: string;
  };
  contact: {
    email: string;
    phone: string;
  };
  reviews: number;
}

export default function ContractorsList({ contractors }: { contractors: Contractor[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  //TODO conditional logic to get records based on window size
  const contractorsPerPage = 9;

  // Calculate pagination values
  const indexOfLastContractor = currentPage * contractorsPerPage;
  const indexOfFirstContractor = indexOfLastContractor - contractorsPerPage;
  const currentContractors = contractors.slice(indexOfFirstContractor, indexOfLastContractor);
  const totalPages = Math.ceil(contractors.length / contractorsPerPage);

  return (
    <div className="flex flex-col">
      <div
        className="overflow-y-auto max-h-[calc(100vh-14.2rem)] sm:max-h-[calc(100vh-5rem)]"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
         <div className="flex items-center bg-white/50 border-none rounded-md justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <input type="search" className=''/>
          </div>
          <div>
            
          </div>
        </div>
        </div>


        {/* CARDS */}
        <ul
          role="list"
          className="grid mt-4 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 mb-4"
        >
          {currentContractors.map((contractor) => (
            <li
              key={contractor.id}
              className="col-span-1 max-h-38 max-w-80 divide-gray-200 rounded-lg bg-white/50 shadow-sm"
            >
              <div className="flex w-full items-center justify-between space-x-6 p-4">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <h3 className="truncate text-sm font-medium text-gray-900">
                      {contractor.name}
                    </h3>
                    <span className="inline-flex shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {contractor.rating} ★
                    </span>
                  </div>
                  <p className="mt-1 truncate text-sm text-gray-500">
                    {contractor.services.join(', ')}
                  </p>
                  <p className="text-sm text-gray-400">
                    {contractor.location.city}, {contractor.location.state}
                  </p>
                  <p className="text-sm text-gray-400">
                    {contractor.reviews} reviews
                  </p>
                </div>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="flex w-0 flex-1">
                    <a
                      href={`mailto:${contractor.contact.email}`}
                      className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-2 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                      Email
                    </a>
                  </div>
                  <div className="-ml-px flex w-0 flex-1">
                    <a
                      href={`tel:${contractor.contact.phone}`}
                      className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-2 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                    >
                      <PhoneIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center bg-white/50 border-none rounded-md justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={currentPage === 1}
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-extralight">
              Showing <span className="font-medium">{indexOfFirstContractor + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(indexOfLastContractor, contractors.length)}
              </span>{' '}
              of <span className="font-medium">{contractors.length}</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}