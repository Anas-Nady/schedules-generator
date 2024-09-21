import React from "react";
import { Schedule } from "@/helper/generateSchedules";
import renderScheduleTable from "@/components/renderScheduleTable";
import { UI_TEXTS, ERROR_MESSAGES } from "@/constants/arabic";

interface SchedulesTableProps {
  schedules: Schedule[];
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SchedulesTable: React.FC<SchedulesTableProps> = ({
  schedules,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{UI_TEXTS.GENERATED_SCHEDULES}</h2>
      {schedules.length > 0 && (
        <p className="mt-4 text-xl pb-5 font-bold text-green-500 text-center">
          {UI_TEXTS.TOTAL_UNITS}{" "}
          {Object.values(schedules[currentPage - 1] || {})
            .flat()
            .filter(
              (subject, index, self) =>
                index === self.findIndex((t) => t?.code === subject?.code)
            )
            .reduce((total, subject) => total + (subject?.units || 0), 0)}
        </p>
      )}
      {schedules.length > 0 ? (
        <>
          <div className="mb-4 border border-gray-600 p-4 rounded">
            <h3 className="font-bold mb-2 text-xl text-green-500">
              {UI_TEXTS.SCHEDULE} {currentPage}
            </h3>
            {renderScheduleTable(schedules[currentPage - 1])}
          </div>
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white p-2 rounded transition duration-300 hover:bg-blue-600 disabled:bg-gray-400"
            >
              {UI_TEXTS.PREVIOUS}
            </button>
            <span className="p-2">
              {UI_TEXTS.TABLE} {currentPage} {UI_TEXTS.OF} {schedules.length}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, schedules.length))
              }
              disabled={currentPage === schedules.length}
              className="bg-blue-500 text-white p-2 rounded transition duration-300 hover:bg-blue-600 disabled:bg-gray-400"
            >
              {UI_TEXTS.NEXT}
            </button>
          </div>
        </>
      ) : (
        <p className="text-yellow-500">{ERROR_MESSAGES.NO_SCHEDULES}</p>
      )}
    </div>
  );
};

export default SchedulesTable;
