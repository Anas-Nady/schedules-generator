import React, { useState, useRef } from "react";
import { Subject } from "@/helper/generateSchedules";
import { DAYS, UI_TEXTS, ERROR_MESSAGES } from "@/constants/arabic";
import { sortSubjects } from "@/helper/sortSubjects";
import Button from "@/components/Button";
import { FaDownload, FaUpload } from "react-icons/fa"; // Add this import

interface SubjectsListProps {
  subjects: Subject[];
  editSubject: (subject: Subject) => void;
  deleteSubject: (key: string) => void;
  downloadSubjects: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SubjectsList: React.FC<SubjectsListProps> = ({
  subjects,
  editSubject,
  deleteSubject,
  downloadSubjects,
  handleFileUpload,
}) => {
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteClick = (key: string) => {
    setConfirmDelete(key);
  };

  const handleConfirmDelete = (key: string) => {
    deleteSubject(key);
    setConfirmDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Sort subjects.
  const sortedSubjects = sortSubjects(subjects);

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-bold">{UI_TEXTS.SUBJECTS}</h2>
        <div className="flex gap-2">
          <div className="p-1 flex gap-1 items-center rounded border border-gray-400 hover:bg-gray-700 duration-150">
            <Button
              onClick={downloadSubjects}
              className="flex gap-2 justify-between items-center"
              disabled={subjects.length === 0}
            >
              <FaDownload className="inline-block" />
              {UI_TEXTS.DOWNLOAD_SUBJECTS}
            </Button>
          </div>
          <div className="p-1 rounded border border-gray-400 hover:bg-gray-700 duration-150">
            <Button
              onClick={triggerFileInput}
              className="flex gap-2 justify-between items-center"
            >
              <FaUpload className="inline-block" />
              {UI_TEXTS.UPLOAD_SUBJECTS}
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".js"
              className="hidden"
            />
          </div>
        </div>
      </div>
      {sortedSubjects.length > 0 ? (
        <ul className="list-disc list-inside">
          {sortedSubjects.map((subject, index) => (
            <li
              key={index}
              className="mb-1 flex items-center justify-between group"
            >
              <span className="group-hover:border-b-2 group-hover:border-white transition-all duration-100">
                {subject.name} - G: {subject.group} - يوم المحاضرة:{" "}
                {DAYS[subject.primaryDay]}
                {subject.secondaryDay !== undefined &&
                  ` - يوم السكشن: ${DAYS[subject.secondaryDay]}`}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => editSubject(subject)}
                  className="bg-yellow-500 text-white p-1 rounded transition duration-300 hover:bg-yellow-600"
                >
                  {UI_TEXTS.EDIT}
                </button>
                {confirmDelete === `${subject.code}-${subject.group}` ? (
                  <>
                    <button
                      onClick={() =>
                        handleConfirmDelete(`${subject.code}-${subject.group}`)
                      }
                      className="bg-red-500 text-white p-1 rounded transition duration-300 hover:bg-red-600"
                    >
                      {UI_TEXTS.CONFIRM}
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="bg-gray-500 text-white p-1 rounded transition duration-300 hover:bg-gray-600"
                    >
                      {UI_TEXTS.CANCEL}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() =>
                      handleDeleteClick(`${subject.code}-${subject.group}`)
                    }
                    className="bg-red-500 text-white p-1 rounded transition duration-300 hover:bg-red-600"
                  >
                    {UI_TEXTS.DELETE}
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-yellow-500">{ERROR_MESSAGES.NO_SUBJECTS}</p>
      )}
    </div>
  );
};

export default SubjectsList;
