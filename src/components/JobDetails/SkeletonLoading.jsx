const SkeletonLoading = () => {
  return (
    <div className="bg-white p-10 mt-20 max-w-7xl mx-auto">
      <div className="mx-auto mb-10 max-w-2xl lg:text-center">
        <p className="mt-5 text-3xl font-extrabold tracking-tight text-gray-800 sm:text-4xl uppercase">
          Detail Pekerjaan
        </p>
      </div>
      <div className="animate-pulse">
        {/* Skeleton Header */}
        <div className="flex items-center mb-5">
          <div className="w-20 h-20 bg-gray-200 rounded-md"></div>
          <div className="ml-4 flex-1">
            <div className="h-6 bg-gray-200 rounded-md mb-2"></div>
            <div className="h-4 bg-gray-200 rounded-md w-3/4"></div>
          </div>
        </div>

        {/* Skeleton Detail Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-5 sm:gap-x-6 sm:gap-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-1">
              <div className="h-4 bg-gray-200 rounded-md mb-2"></div>
              <div className="h-6 bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>

        {/* Skeleton Text */}
        <div className="mt-10">
          <div className="h-6 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
          <div className="h-4 bg-gray-200 rounded-md mb-4"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
