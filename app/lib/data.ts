import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function fetchDepartments() {
  try {
    const data = await sql`
      SELECT 
        id, 
        name
      FROM departments 
      ORDER BY name;
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch department data.");
  }
}

export async function fetchScheduleByDay(day: number) {
  try {
    const data = await sql`
      SELECT 
        s.id,
        s.day_of_week,
        d.id AS department_id,
        d.name AS department_name
      FROM schedule s
      JOIN departments d ON s.department_id = d.id
      WHERE s.day_of_week = ${day}
      ORDER BY d.name;
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error(`Failed to fetch schedule for day ${day}.`);
  }
}

export async function fetchAllSchedule() {
  try {
    const data = await sql`
      SELECT 
        s.id,
        s.day_of_week,
        d.id AS department_id,
        d.name AS department_name
      FROM schedule s
      JOIN departments d ON s.department_id = d.id
      ORDER BY s.day_of_week, d.name;
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all schedule data.");
  }
}

export async function fetchAllSchedule1() {
  try {
    const data = await sql`
      SELECT 
        s.day_of_week,
        json_agg(
          json_build_object(
            'id', s.id,
            'department_id', d.id,
            'department_name', d.name
          )
        ) AS departments
      FROM schedule s
      JOIN departments d ON s.department_id = d.id
      GROUP BY s.day_of_week
      ORDER BY s.day_of_week;
    `;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch all schedule data.");
  }
}
