export default function BentoSection() {
    return (
      <div className=" p-4  max-w-screen-lg mx-auto min-h-screen">
        {/* 
          On mobile (default), this will be a single-column grid.
          On medium screens (md:), it switches to 3 columns and 6 rows.
        */}
        <div className="pt-20 grid gap-4 grid-cols-1 md:grid-cols-3 md:grid-rows-6 min-h-[54rem]">
          
          {/* Box 1 */}
          <div className="bg-primary/30 hover:bg-cyan-300 flex items-center justify-center p-4 rounded">
            <p className="font-bold">Add Services</p>
          </div>
  
          {/* Box 2 */}
          <div className="bg-primary/30 hover:bg-cyan-300 flex items-center justify-center p-4 rounded">
            <p className="font-bold">Find Listings</p>
          </div>
  
          {/* Box 3 */}
          <div className="bg-primary/30 hover:bg-cyan-300 flex items-center justify-center p-4 rounded">
            <p className="font-bold">Box 3</p>
          </div>
  
          {/* Box 4 (spans 1 col & 2 rows at md+) */}
          <div className="bg-primary/30 hover:bg-cyan-300 flex items-center justify-center p-4 rounded md:col-span-1 md:row-span-2">
            <p className="text-center font-bold">Box 4</p>
          </div>
  
          {/* Box 5 (spans 2 cols & 2 rows at md+) */}
          <div className="bg-primary/30 hover:bg-cyan-300 flex items-center justify-center p-4 rounded md:col-span-2 md:row-span-2">
            <p className="font-bold">Box 5</p>
          </div>
  
          {/* Box 6 (spans 3 cols & 2 rows at md+) */}
          <div className="bg-primary/30 hover:bg-cyan-300 flex items-center justify-center p-4 rounded md:col-span-3 md:row-span-2">
            <p className="font-bold">Box 6</p>
          </div>
  
          {/* Box 7 (spans 3 cols & 1 row at md+) */}
          <div className="bg-primary/30 hover:bg-cyan-300 flex items-center justify-center p-4 rounded md:col-span-3 md:row-span-1">
            <p className="font-bold">Box 7</p>
          </div>
        </div>
      </div>
    )
  }