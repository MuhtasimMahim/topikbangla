export default function Loading() {
  return (
    <div className="min-h-screen bg-[#121212] text-[#EAEAEA] py-20">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-12 bg-[#1E1E1E] rounded mb-8 mx-auto max-w-md"></div>

          <div className="h-12 bg-[#1E1E1E] rounded mb-8"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, index) => (
              <div key={index} className="bg-[#1E1E1E] p-6 rounded-lg">
                <div className="h-16 bg-[#252525] rounded mb-4"></div>
                <div className="h-6 bg-[#252525] rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
