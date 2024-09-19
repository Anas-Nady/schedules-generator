import {
  createEmptySchedule,
  canPlaceSubject,
  placeSubject,
  removeSubject,
  scheduleContainsAllSubjects,
  scheduleToString,
} from "./scheduleHelpers";

export type Subject = {
  name: string;
  code: string;
  group: string;
  primaryDay: number;
  units?: number;
  primaryStartPeriod: number;
  primaryEndPeriod: number;
  secondaryDay?: number;
  secondaryStartPeriod?: number;
  secondaryEndPeriod?: number;
};

export type Schedule = {
  [key: string]: (Subject | null)[];
};

function generateSchedules(
  subjects: Subject[],
  limit: number = 100
): Schedule[] {
  const allSchedules: Set<string> = new Set(); // Use a Set to store unique schedules
  const currentSchedule: Schedule = createEmptySchedule();
  const placedSubjects: Set<string> = new Set(); // Track placed subjects by their code and group

  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];

  function backtrack(index: number): void {
    if (index === subjects.length) {
      if (scheduleContainsAllSubjects(currentSchedule, subjects)) {
        const scheduleString = scheduleToString(currentSchedule);
        if (!allSchedules.has(scheduleString)) {
          allSchedules.add(scheduleString);
        }
      }
      return;
    }

    if (allSchedules.size >= limit) {
      return;
    }

    const subject = subjects[index];

    // Try to place the subject on its primary day
    const primaryDay = days[subject.primaryDay];
    if (
      canPlaceSubject(
        currentSchedule,
        primaryDay,
        subject.primaryStartPeriod,
        subject.primaryEndPeriod,
        subject
      )
    ) {
      placeSubject(
        currentSchedule,
        primaryDay,
        subject,
        subject.primaryStartPeriod,
        subject.primaryEndPeriod
      );
      placedSubjects.add(`${subject.code}-${subject.group}`);

      // Check if secondary day exists and try to place it
      if (
        subject.secondaryDay !== undefined &&
        subject.secondaryStartPeriod !== undefined &&
        subject.secondaryEndPeriod !== undefined
      ) {
        const secondaryDay = days[subject.secondaryDay];
        if (
          canPlaceSubject(
            currentSchedule,
            secondaryDay,
            subject.secondaryStartPeriod,
            subject.secondaryEndPeriod,
            subject
          )
        ) {
          placeSubject(
            currentSchedule,
            secondaryDay,
            subject,
            subject.secondaryStartPeriod,
            subject.secondaryEndPeriod
          );

          // Both days placed successfully, move to next subject
          backtrack(index + 1);

          // Remove secondary day placement
          removeSubject(
            currentSchedule,
            secondaryDay,
            subject.secondaryStartPeriod,
            subject.secondaryEndPeriod
          );
        }
      } else {
        // If there's no secondary day, move to the next subject
        backtrack(index + 1);
      }

      // Remove primary day placement
      removeSubject(
        currentSchedule,
        primaryDay,
        subject.primaryStartPeriod,
        subject.primaryEndPeriod
      );
      placedSubjects.delete(`${subject.code}-${subject.group}`);
    }

    // Try the next subject even if we couldn't place this one
    backtrack(index + 1);
  }

  backtrack(0);

  // Convert the Set of schedule strings back to an array of Schedule objects
  return Array.from(allSchedules).map((scheduleString) =>
    JSON.parse(scheduleString)
  );
}

export default generateSchedules;
