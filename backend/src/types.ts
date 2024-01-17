// Represents a student
export type Student = {
    student_id: number; // Unique identifier for the student
    first_name: string; // First name of the student
    last_name: string; // Last name of the student
    dob: string; // Date of birth of the student
}

// Represents a course
export type Course = {
    course_id: number; // Unique identifier for the course
    course_name: string; // Name of the course
}

// Represents a result
export type Result = {
    result_id: number; // Unique identifier for the result
    student_id: number; // Identifier of the student
    course_id: number; // Identifier of the course
    score: string; // Score obtained by the student in the course
}

// Represents a student result, extending the Result type
export type StudentResult = Result & {
    first_name: string; // First name of the student
    last_name: string; // Last name of the student
    course_name: string; // Name of the course
}