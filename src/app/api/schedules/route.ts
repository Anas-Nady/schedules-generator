import generateSchedules, { Schedule } from "@/helpers/generateSchedules";

export async function POST(req: Request) {
  try {
    const { subjects, limit = 100 } = await req.json();

    if (!subjects || !Array.isArray(subjects)) {
      return new Response(
        JSON.stringify({
          message: "Subjects data is required and must be an array.",
        }),
        { status: 400 }
      );
    }

    // Validate that each subject has the required fields
    if (
      !subjects.every(
        (subject) =>
          "name" in subject &&
          "code" in subject &&
          "group" in subject &&
          "primaryDay" in subject &&
          "primaryStartPeriod" in subject &&
          "primaryEndPeriod" in subject
      )
    ) {
      return new Response(
        JSON.stringify({
          message: "Each subject must have all required fields.",
        }),
        { status: 400 }
      );
    }

    const getSchedules: Schedule[] = generateSchedules(subjects, limit);

    return new Response(JSON.stringify(getSchedules), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({ message: "An error occurred.", error: error?.message }),
      { status: 500 }
    );
  }
}
