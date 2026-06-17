import postgres from "postgres";
import { departments, scheduleByDay } from "../lib/placeholder-data";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function seedDepartments() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS departments (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const insertedDepartments = await Promise.all(
    departments.map(async (user) => {
      return sql`
        INSERT INTO departments (id, name)
        VALUES (${user.id}, ${user.name})
        ON CONFLICT (id) DO NOTHING;
      `;
    })
  );

  return insertedDepartments;
}

async function seedSchedule() {
  await sql`
    CREATE TABLE IF NOT EXISTS schedule (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      day_of_week INTEGER NOT NULL,
      department_id UUID REFERENCES departments(id) ON DELETE CASCADE
    );
  `;
  for (let i = 0; i < scheduleByDay.length; i++) {
    await Promise.all(
      scheduleByDay.map(async (entry) => {
        return sql`
          INSERT INTO schedule (id, day_of_week, department_id)
          VALUES (${entry.id}, ${entry.day}, ${entry.departmentId})
          ON CONFLICT (id) DO NOTHING;
        `;
      })
    );

    console.log(
      `  ✅ Processed ${Math.min(i + 1, scheduleByDay.length)}/${
        scheduleByDay.length
      } entries`
    );
  }

  return scheduleByDay.length;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
      // seedDepartments(),
      // seedSchedule(),
    ]);

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
