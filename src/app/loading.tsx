export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="inline-block animate-spin">
          <div className="text-[3rem]">📚</div>
        </div>
        <p className="mt-4 text-gray-600 font-semibold">Loading students...</p>
      </div>
    </div>
  );
}
