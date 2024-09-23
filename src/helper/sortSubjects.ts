import { Subject } from "@/helper/generateSchedules";

export const sortSubjects = (subjects: Subject[]): Subject[] => {
  return [...subjects].sort((a, b) => {
    if (a.code !== b.code) {
      return a.code.localeCompare(b.code);
    }
    return parseInt(a.group) - parseInt(b.group);
  });
};
