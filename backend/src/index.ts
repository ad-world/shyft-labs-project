import express, { Request, Response } from 'express';
import cors from 'cors';
import './database'
import { createCourse, createResult, createStudent, deleteCourse, deleteResult, deleteStudent, getCourses, getResults, getStudents } from './controllers';

const app = express();
app.use(cors())
app.use(express.json())

app.get('/students', async (_: Request, res: Response) => {
    try {
        const students = await getStudents();

        return res.status(200).json(students);
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
});

app.post('/student', async (req: Request, res: Response) => {
    try {
        const { first_name, last_name, dob } = req.body;

        if (!first_name || !last_name || !dob) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const student = await createStudent({ first_name, last_name, dob });

        if (student) {
            return res.status(201).json({ message: 'Student created successfully' });
        }

        return res.status(500).json({ error: 'Failed to create student' });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.delete('/student', async (req: Request, res: Response) => {
    try {
        const { student_id } = req.body;

        if (!student_id) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const student = await deleteStudent(student_id);

        if (student) {
            return res.status(200).json({ message: 'Student deleted successfully' });
        }

        return res.status(500).json({ error: 'Failed to delete student' });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.get('/courses', async (_: Request, res: Response) => {
    try {
        const courses = await getCourses();

        return res.status(200).json( courses);
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.post('/course', async (req: Request, res: Response) => {
    try {
        const { course_name } = req.body;

        if (!course_name) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const course = await createCourse({ course_name });

        if (course) {
            return res.status(201).json({ message: 'Course created successfully' });
        }

        return res.status(500).json({ error: 'Failed to create course' });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.delete('/course', async (req: Request, res: Response) => {
    try {
        const { course_id } = req.body;

        if (!course_id) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const course = await deleteCourse(course_id);

        if (course) {
            return res.status(200).json({ message: 'Course deleted successfully' });
        }

        return res.status(500).json({ error: 'Failed to delete course' });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    
    }
})

app.get('/results', async (_: Request, res: Response) => {
    try {
        const results = await getResults();

        return res.status(200).json(results);
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.post('/result', async (req: Request, res: Response) => {
    try {
        const { student_id, course_id, score } = req.body;

        if (!student_id || !course_id || !score) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const result = await createResult({ student_id, course_id, score });

        if (result) {
            return res.status(201).json({ message: 'Result created successfully' });
        }

        return res.status(500).json({ error: 'Failed to create result' });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.delete('/result', async (req: Request, res: Response) => {
    try {
        const { result_id } = req.body;

        if (!result_id) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const result = await deleteResult(result_id);

        if (result) {
            return res.status(200).json({ message: 'Result deleted successfully' });
        }

        return res.status(500).json({ error: 'Failed to delete result' });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.listen(4000, () => {
    console.log('Server listening on port 4000');
})