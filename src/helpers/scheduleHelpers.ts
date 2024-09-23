import { Subject, Schedule } from "./generateSchedules";

export function createEmptySchedule(): Schedule {
  const schedule: Schedule = {};
  const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday"];
  for (const day of days) {
    schedule[day] = new Array(8).fill(null);
  }
  return schedule;
}

export function isSubjectGroupAlreadyPlaced(
  schedule: Schedule,
  subject: Subject
): boolean {
  for (const day in schedule) {
    for (const period of schedule[day]) {
      if (
        period &&
        period.code === subject.code &&
        period.group !== subject.group
      ) {
        return true;
      }
    }
  }
  return false;
}

export function canPlaceSubject(
  schedule: Schedule,
  day: string,
  startPeriod: number,
  endPeriod: number,
  currentSubject: Subject
): boolean {
  if (isSubjectGroupAlreadyPlaced(schedule, currentSubject)) {
    return false;
  }

  for (let i = startPeriod - 1; i < endPeriod; i++) {
    if (schedule[day][i] !== null) {
      return false;
    }
  }

  return true;
}

export function placeSubject(
  schedule: Schedule,
  day: string,
  subject: Subject,
  startPeriod: number,
  endPeriod: number
): void {
  for (let i = startPeriod - 1; i < endPeriod; i++) {
    schedule[day][i] = subject;
  }
}

export function removeSubject(
  schedule: Schedule,
  day: string,
  startPeriod: number,
  endPeriod: number
): void {
  for (let i = startPeriod - 1; i < endPeriod; i++) {
    schedule[day][i] = null;
  }
}

export function scheduleContainsAllSubjects(
  schedule: Schedule,
  subjects: Subject[]
): boolean {
  const scheduledSubjects = new Set<string>();
  for (const day in schedule) {
    for (const period of schedule[day]) {
      if (period) {
        scheduledSubjects.add(period.code);
      }
    }
  }
  return subjects.every((subject) => scheduledSubjects.has(subject.code));
}

export function scheduleToString(schedule: Schedule): string {
  return JSON.stringify(schedule);
}
