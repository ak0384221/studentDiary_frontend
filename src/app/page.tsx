import { StudentCard } from "@/components/composed/StudentCard";
import { StudentForm } from "@/components/composed/StudentForm";
import { getStudents, Student } from "@/features/students/api";

export default async function Home() {
  const { data, ok, status, error } = await getStudents();
  console.log(data, ok, status, error);

  //error ui
  if (error) {
    return (
      <>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg">
            {error}
          </div>
        </div>
      </>
    );
  }

  //if no error occurs
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-blue-50 to-indigo-100 ">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <span className="text-5xl">📚</span> Student Diary
          </h1>
          <p className="text-blue-100 text-lg">
            Manage and track student homeworks effortlessly
          </p>
        </div>
      </div>

      {/* Main Content */}

      {/* student creation form */}
      <div className="w-5/6 mx-auto mt-8">
        <StudentForm existingStudents={data || []} />
      </div>

      {data && data.length === 0 ? (
        <div className="text-center py-16 w-5/6">
          <div className="text-6xl mb-4">😴</div>
          <p className="text-gray-600 text-lg">
            No students found. Please add some students first.
          </p>
        </div>
      ) : (
        <>
          <div className="mb-8 w-5/6 border mx-auto my-5">
            <p className="text-gray-700 text-lg font-medium">
              👥 Total Students:{" "}
              <span className="text-blue-600 font-bold">
                {data?.length || 0}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-5/6 border mx-auto my-5">
            {data?.map((student: Student) => (
              <StudentCard key={student.id} student={student} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
