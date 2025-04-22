// SkeletonLoading.js
const SkeletonLoading = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden my-20 p-4">
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md mb-4"></div>
      <div className="px-4 md:px-3 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex-1 md:pr-8 text-left">
          <div className="h-4 bg-gray-200 animate-pulse mb-2 w-1/4"></div>
          <div className="h-6 bg-gray-200 animate-pulse mb-4 w-3/4"></div>
          <div className="h-4 bg-gray-200 animate-pulse mb-8 w-full"></div>
          <div className="h-8 bg-gray-200 animate-pulse mb-4 w-1/2"></div>
          <div className="h-4 bg-gray-200 animate-pulse mb-4 w-full"></div>
          <div className="h-4 bg-gray-200 animate-pulse mb-4 w-full"></div>
        </div>
        <div className="w-full md:w-1/4 flex flex-col items-end space-y-4">
          <div className="w-full text-left">
            <div className="h-6 bg-gray-200 animate-pulse mb-3 w-1/2"></div>
            <div className="flex space-x-3 py-1">
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
              <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
            </div>
          </div>
          <div className="w-full text-left">
            <div className="h-6 bg-gray-200 animate-pulse mb-5 w-1/2"></div>
            <div className="space-y-4">
              <div className="flex items-center gap-x-4">
                <div className="w-full h-20 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              </div>
              <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 animate-pulse w-3/4"></div>
            </div>
          </div>
          <div className="w-full text-left">
            <div className="h-6 bg-gray-200 animate-pulse mb-5 w-1/2"></div>
            <div className="space-y-4">
              <div className="flex items-center gap-x-4">
                <div className="w-full h-20 bg-gray-200 animate-pulse rounded-md mb-2"></div>
              </div>
              <div className="h-4 bg-gray-200 animate-pulse w-full"></div>
              <div className="h-4 bg-gray-200 animate-pulse w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoading;
