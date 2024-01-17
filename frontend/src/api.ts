import { Course, Result, Student, StudentResult } from "./types"

const API_URL = 'http://localhost:4000'

interface APIResponse<T> {
    data: T | null,
    error: string | null,
}

export const getStudents = async (): Promise<APIResponse<Student[]>> => {
    const response = await fetch(`${API_URL}/students`);
    const students = await response.json();

    if(response.ok) {
        return { data: students, error: null };
    }

    return { data: null, error: students.error };
}

export const createStudent = async (student: Omit<Student, 'student_id'>): Promise<APIResponse<{ message: string }>> => {
    const response = await fetch(`${API_URL}/student`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(student),
    });

    const data = await response.json();

    if(response.ok) {
        return { data, error: null };
    }

    return { data: null, error: data.error };
}

export const getCourses = async (): Promise<APIResponse<Course[]>> => {
    const response = await fetch(`${API_URL}/courses`);
    const courses = await response.json();

    if(response.ok) {
        return { data: courses, error: null };
    }

    return { data: null, error: courses.error };
}

export const createCourse = async (course: Omit<Course, 'course_id'>): Promise<APIResponse<{ message: string }>> => {
    const response = await fetch(`${API_URL}/course`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(course),
    });

    const data = await response.json();

    if(response.ok) {
        return { data, error: null };
    }

    return { data: null, error: data.error };
}

export const getResults = async (): Promise<APIResponse<StudentResult[]>> => {
    const response = await fetch(`${API_URL}/results`);
    const results = await response.json();

    if(response.ok) {
        return { data: results, error: null };
    }

    return { data: null, error: results.error };
}

export const createResult = async (result: Omit<Result, 'result_id'>): Promise<APIResponse<{ message: string }>> => {
    const response = await fetch(`${API_URL}/result`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(result),
    });

    const data = await response.json();

    if(response.ok) {
        return { data, error: null };
    }

    return { data: null, error: data.error };
}

export const deleteStudent = async (student_id: number): Promise<APIResponse<{ message: string }>> => {
    const response = await fetch(`${API_URL}/student`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ student_id }),
    });

    const data = await response.json();

    if(response.ok) {
        return { data, error: null };
    }

    return { data: null, error: data.error };
}

export const deleteCourse = async (course_id: number): Promise<APIResponse<{ message: string }>> => {
    const response = await fetch(`${API_URL}/course`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ course_id }),
    });

    const data = await response.json();

    if(response.ok) {
        return { data, error: null };
    }

    return { data: null, error: data.error };
}

export const deleteResult = async (result_id: number): Promise<APIResponse<{ message: string }>> => {
    const response = await fetch(`${API_URL}/result`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ result_id }),
    });

    const data = await response.json();

    if(response.ok) {
        return { data, error: null };
    }

    return { data: null, error: data.error };
}