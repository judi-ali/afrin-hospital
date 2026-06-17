import {
  // fetchAllSchedule,
  fetchAllSchedule1,
  fetchDepartments,
} from "./lib/data";
import { getArabicDayName } from "./lib/utils";

export default async function Page() {
  const departments = await fetchDepartments();
  // const schedule = await fetchAllSchedule();
  const schedule = await fetchAllSchedule1();
  console.log("Schedule1 Data:", schedule); // Debugging line

  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 -mx-4 sm:mx-0 px-4 sm:px-6 py-8 rounded-none sm:rounded-2xl shadow-sm">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-600/10 p-2.5 rounded-xl">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                مرحباً بك في مشفى عفرين
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                نقدم لكم أفضل الخدمات الطبية
              </p>
            </div>
          </div>

          {/* Departments Section */}
          <section className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  الأقسام
                </h2>
                {departments.length > 0 && (
                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">
                    {departments.length}
                  </span>
                )}
              </div>
              {departments.length > 3 && (
                <button className="text-sm text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors">
                  عرض الكل
                </button>
              )}
            </div>

            {departments.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {departments.map((dept, index) => (
                  <div
                    key={dept.id}
                    className="group relative bg-white rounded-xl border border-gray-200/80 hover:border-blue-300 
                shadow-sm hover:shadow-md transition-all duration-200 
                hover:scale-[1.02] hover:bg-blue-50/30 cursor-pointer"
                    style={{
                      animationDelay: `${index * 50}ms`,
                    }}
                  >
                    <div className="flex items-center gap-3 p-3.5">
                      {/* Department Icon - You can customize based on dept type */}
                      <div
                        className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 
                  flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 
                  transition-colors duration-200"
                      >
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                          {dept.name}
                        </p>
                        {dept.description && (
                          <p className="text-xs text-gray-500 truncate mt-0.5">
                            {dept.description}
                          </p>
                        )}
                        {dept.doctors_count !== undefined && (
                          <p className="text-xs text-gray-400 mt-0.5">
                            {dept.doctors_count} طبيب
                          </p>
                        )}
                      </div>

                      {/* Arrow indicator */}
                      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <svg
                          className="w-4 h-4 text-blue-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>

                    {/* Subtle top accent line */}
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-indigo-400 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"
                    ></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-white/50 rounded-xl border-2 border-dashed border-gray-200">
                <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">لا توجد أقسام متاحة</p>
                <p className="text-sm text-gray-400 mt-1">
                  سيتم إضافة الأقسام قريباً
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
      <section className="mt-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 p-2 rounded-lg">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            الجدول الزمني
          </h2>
          {schedule.length > 0 && (
            <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {schedule.length} {schedule.length === 1 ? "يوم" : "أيام"}
            </span>
          )}
        </div>

        <div className="overflow-hidden border border-gray-200 rounded-xl shadow-sm bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    اليوم
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    الأقسام
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {schedule.map((entry, index) => (
                  <tr
                    key={entry.day_of_week}
                    className={`
                transition-colors duration-150 hover:bg-blue-50/50
                ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}
              `}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {getArabicDayName(entry.day_of_week)}
                        </span>
                        {/* Optional: Add day number or badge */}
                        <span className="text-xs text-gray-400 font-mono">
                          #{entry.day_of_week}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        {entry.departments.map(
                          (dept: { id: string; department_name: string }) => (
                            <span
                              key={dept.id}
                              className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium 
                        bg-blue-50 text-blue-700 border border-blue-100
                        hover:bg-blue-100 hover:border-blue-200 hover:shadow-sm
                        transition-all duration-200 cursor-default"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 group-hover:bg-blue-600 transition-colors"></span>
                              {dept.department_name}
                            </span>
                          )
                        )}
                        {entry.departments.length === 0 && (
                          <span className="text-sm text-gray-400 italic">
                            لا توجد أقسام
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {schedule.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gray-50 rounded-full p-4 mb-3">
                  <svg
                    className="w-8 h-8 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">
                  لا يوجد جدول زمني متاح
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  سيتم إضافة الجدول قريباً
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
