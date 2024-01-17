import { getDb } from "./database";
import { Course, Result, Student, StudentResult } from "./types";

export const getStudents = async (): Promise<Array<Student>> => {
	const db = await getDb();
	const students = await db.all<Student[]>("SELECT * FROM students");
    await db.close();
	return students;
};

export const createStudent = async (
	student: Omit<Student, "student_id">
): Promise<boolean> => {
	const db = await getDb();
	const new_student = await db.run(
		"INSERT INTO students (first_name, last_name, dob) VALUES (?, ?, ?)",
		[student.first_name, student.last_name, student.dob]
	);

    await db.close();

	if (new_student.lastID) {
		return true;
	}

	return false;
};

export const deleteStudent = async (student_id: number): Promise<boolean> => {
    const db = await getDb();
    const deleted_student = await db.run(
        "DELETE FROM students WHERE student_id = ?",
        [student_id]
    );

    await db.close();

    if (deleted_student.changes) return true;
    return false;

}

export const getCourses = async (): Promise<Array<Course>> => {
    const db = await getDb();
    const courses = await db.all<Course[]>("SELECT * FROM courses");
    await db.close();

    return courses;
}

export const createCourse = async (course: Omit<Course, "course_id">): Promise<boolean> => {
    const db = await getDb();
    const new_course = await db.run(
        "INSERT INTO courses (course_name) VALUES (?)",
        [course.course_name]
    );

    await db.close();

    if (new_course.lastID) {
        return true;
    }

    return false;
}

export const deleteCourse = async (course_id: number): Promise<boolean> => {
    const db = await getDb();
    const deleted_course = await db.run(
        "DELETE FROM courses WHERE course_id = ?",
        [course_id]
    );

    if(deleted_course.changes) return true;
    return false;

}

export const getResults = async (): Promise<Array<StudentResult>> => {
    const db = await getDb();
    const results = await db.all<StudentResult[]>(
        "SELECT * FROM results INNER JOIN students ON results.student_id = students.student_id INNER JOIN courses ON results.course_id = courses.course_id"
    );

    await db.close();

    return results;
}

export const createResult = async (result: Omit<Result, "result_id">): Promise<boolean> => {
    const db = await getDb();
    const new_result = await db.run(
        "INSERT INTO results (student_id, course_id, score) VALUES (?, ?, ?)",
        [result.student_id, result.course_id, result.score]
    );

    await db.close();

    if (new_result.lastID) {
        return true;
    }

    return false;
}

export const deleteResult = async (result_id: number): Promise<boolean> => {
    const db = await getDb();
    const deleted_result = await db.run(
        "DELETE FROM results WHERE result_id = ?",
        [result_id]
    );

    await db.close();

    if (deleted_result.changes) return true;
    return false;
}