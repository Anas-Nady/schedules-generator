"use client";

import { useState, useEffect } from "react";
import { Subject, Schedule } from "@/helper/generateSchedules";
import { SUCCESS_MESSAGES, ERROR_MESSAGES, UI_TEXTS } from "@/constants/arabic";
import Form from "@/components/Form";
import SubjectsList from "@/components/SubjectsList";
import SchedulesTable from "@/components/SchedulesTable";
import { FaGithub } from "react-icons/fa"; // Import the GitHub icon

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);
  const [formData, setFormData] = useState<Partial<Subject>>({});

  useEffect(() => {
    // Load subjects from localStorage when component mounts
    const storedSubjects = localStorage.getItem("subjects");
    if (storedSubjects) {
      const parsedSubjects = JSON.parse(storedSubjects);
      setSubjects(parsedSubjects);
    }
  }, []);

  useEffect(() => {
    // Save subjects to localStorage whenever it changes
    if (subjects.length > 0) {
      localStorage.setItem("subjects", JSON.stringify(subjects));
    }
  }, [subjects]);

  useEffect(() => {
    if (editingSubject) {
      setFormData(editingSubject);
    } else {
      setFormData({});
    }
  }, [editingSubject]);

  const addOrUpdateSubject = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSubject: Subject = {
      ...formData,
      name: formData.name || "",
      code: formData.code || "",
      group: formData.group || "",
      primaryDay: formData.primaryDay || 0,
      primaryStartPeriod: formData.primaryStartPeriod || 1,
      primaryEndPeriod: formData.primaryEndPeriod || 1,
      units: Number(formData.units) || 0, // Ensure units is a number
    } as Subject;

    setSubjects((prevSubjects) => {
      let updatedSubjects;
      if (editingSubject) {
        updatedSubjects = prevSubjects.map((subject) =>
          `${subject.code}-${subject.group}` ===
          `${editingSubject.code}-${editingSubject.group}`
            ? newSubject
            : subject
        );
        setSuccessMessage(SUCCESS_MESSAGES.SUBJECT_UPDATED);
      } else {
        // Check if a subject with the same code and group already exists
        const subjectExists = prevSubjects.some(
          (subject) =>
            subject.code === newSubject.code &&
            subject.group === newSubject.group
        );

        if (subjectExists) {
          setError(ERROR_MESSAGES.SUBJECT_EXISTS);
          return prevSubjects; // Return the previous subjects without adding the new one
        }

        updatedSubjects = [...prevSubjects, newSubject];
        setSuccessMessage(SUCCESS_MESSAGES.SUBJECT_ADDED);
      }
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
      return updatedSubjects;
    });

    setEditingSubject(null);
    const prevName = formData.name;
    const prevCode = formData.code;
    const prevGroup = formData.group;
    const prevUnits = formData.units;
    setFormData({
      name: prevName,
      code: prevCode,
      group: prevGroup,
      units: prevUnits,
    });
    setError(null); // Clear any previous errors

    // Clear the success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  const editSubject = (subject: Subject) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setEditingSubject(subject);
  };

  const deleteSubject = (key: string) => {
    setSubjects((prevSubjects) => {
      const updatedSubjects = prevSubjects.filter(
        (subject) => `${subject.code}-${subject.group}` !== key
      );
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
      return updatedSubjects;
    });
  };

  const generateSchedules = async () => {
    if (subjects.length === 0) {
      setError(ERROR_MESSAGES.NO_SUBJECTS);
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      console.log("Subjects to generate schedules for:", subjects);
      const response = await fetch("/api/schedules", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subjects, limit: 100 }),
      });
      const data = await response.json();
      console.log("Received schedules:", data);

      if (Array.isArray(data) && data.length > 0) {
        setSchedules(data);
        setCurrentPage(1);
      } else {
        setError(ERROR_MESSAGES.NO_VALID_SCHEDULES);
        setSchedules([]);
      }
    } catch (error) {
      setError(ERROR_MESSAGES.GENERATE_ERROR);
    } finally {
      setIsGenerating(false);
    }
  };

  const resetForm = () => {
    setFormData({});
    setEditingSubject(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-9 bg-gray-800 text-white border border-gray-600 my-5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">
          {UI_TEXTS.SCHEDULE_GENERATOR}
        </h1>
        <a
          href="https://github.com/anas-nady/schedule-generator"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-colors"
        >
          <FaGithub size={35} />
        </a>
      </div>

      <Form
        formData={formData}
        setFormData={setFormData}
        addOrUpdateSubject={addOrUpdateSubject}
        resetForm={resetForm}
        editingSubject={editingSubject}
      />

      {successMessage && (
        <div className="mb-4 p-2 bg-green-500 text-white rounded">
          {successMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-500 text-white rounded">{error}</div>
      )}

      <div className="flex justify-between mb-6">
        <button
          onClick={generateSchedules}
          disabled={subjects.length === 0 || isGenerating}
          className={`text-white p-2 rounded font-bold w-full transition duration-300 ${
            subjects.length === 0 || isGenerating
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isGenerating ? UI_TEXTS.GENERATING : UI_TEXTS.GENERATE_SCHEDULES}
        </button>
      </div>

      <SubjectsList
        subjects={subjects}
        editSubject={editSubject}
        deleteSubject={deleteSubject}
      />

      <SchedulesTable
        schedules={schedules}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
