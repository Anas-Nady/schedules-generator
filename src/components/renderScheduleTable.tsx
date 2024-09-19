import { Schedule } from "@/helper/generateSchedules";

const renderScheduleTable = (schedule: Schedule) => {
  if (!schedule) return null;

  const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء"];

  return (
    <table className="w-full border-collapse border border-gray-600">
      <thead>
        <tr>
          <th className="border border-gray-600 p-2">اليوم / الفترة</th>
          {Array.from({ length: 8 }, (_, i) => (
            <th key={i} className="border border-gray-600 p-2">
              {i + 1}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"].map(
          (day, dayIndex) => (
            <tr key={day}>
              <td className="border border-gray-600 p-2 font-bold">
                {days[dayIndex]}
              </td>
              {schedule[day].map((subject, periodIndex) => (
                <td key={periodIndex} className="border border-gray-600 p-2">
                  {subject
                    ? `${subject.name} \nالمجموعة: ${subject.group}`
                    : "-"}
                </td>
              ))}
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};
export default renderScheduleTable;
