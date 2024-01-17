import { Center, Flex, Container, Heading, FormControl, FormLabel, Button, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Box, Text, Select, useToast, IconButton } from "@chakra-ui/react";
import LeftNav from "../components/LeftNav";
import { useEffect, useState } from "react";
import { Course, Student, StudentResult } from "../types";
import { createResult, deleteResult, getCourses, getResults, getStudents } from "../api";
import { DeleteIcon } from "@chakra-ui/icons";

interface NewResultForm {
    studentId: number | null;
    courseId: number | null;
    marks: string;
}

const Results = () => {
    const [results, setResults] = useState<StudentResult[] | null>(null);
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [students, setStudents] = useState<Student[] | null>(null);
    const toast = useToast();

    const [form, setForm] = useState<NewResultForm>({
        studentId: null,
        courseId: null,
        marks: ''
    })

    const [formErrors, setFormErrors] = useState({
        studentId: '',
        courseId: '',
        marks: ''
    })

    const fetchResults = async () => {
        const results = await getResults();
        if(results.data) {
            setResults(results.data)
        }
    }

    const fetchCourses = async () => {
        const courses = await getCourses();
        if(courses.data) {
            setCourses(courses.data)
        }
    }

    const fetchStudents = async () => {
        const students = await getStudents();
        if(students.data) {
            setStudents(students.data)
        }
    }

    const removeResult = async (id: number) => {
        const deleted = await deleteResult(id);
        if (deleted.data?.message) {
            toast({
                title: 'Result Deleted',
                description: deleted.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            fetchResults();
        }
    }

    const createNewResult = async () => {
        if(form.studentId && form.courseId && form.marks) {
            setFormErrors({ studentId: '', courseId: '', marks: '' })
            const result = await createResult({ student_id: form.studentId, course_id:form.courseId, score: form.marks });
            if(result.data) {
                toast({
                    title: result.data.message,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                    position: 'top'
                })
                fetchResults();
                setForm({ studentId: null, courseId: null, marks: '' })
            }   
        } else {
            if (!form.studentId) {
                setFormErrors((formErrors) => ({ ...formErrors, studentId: 'Student cannot be empty' }))
            } else {
                setFormErrors((formErrors) => ({ ...formErrors, studentId: '' }))
            }

            if(!form.courseId) {
                setFormErrors((formErrors) => ({ ...formErrors, courseId: 'Course cannot be empty' }))
            } else {
                setFormErrors((formErrors) => ({ ...formErrors, courseId: '' }))
            }

            if(!form.marks) {
                setFormErrors((formErrors) => ({ ...formErrors, marks: 'Grade cannot be empty' }))
            } else {
                setFormErrors((formErrors) => ({ ...formErrors, marks: '' }))
            }
        }
    }

    useEffect(() => {
        fetchResults();
        fetchCourses();
        fetchStudents();
    }, [])

    
    return (
        <Center minW="100vw" minH="100vh">
        <Flex minW="100%" minH="100vh">
            <LeftNav />
            <Box flex="1" bg="white">
                <Container maxW="container.xl" mt={4}>
                    <Box bgColor='gray.200' m={10} p={6} rounded='xl'>
                        <Heading>Add New Result</Heading>
                        <FormControl>
                            <FormLabel>Student</FormLabel>
                            <Select value={form.studentId ?? 0} name='student' bgColor='white' onChange={e => setForm({...form, studentId: Number(e.target.value)})}>
                                <option value={undefined}>Select Student</option>
                                {students?.map((student) => {
                                    return (
                                        <option value={student.student_id}>{student.first_name} {student.last_name}</option>
                                    )
                                })}
                            </Select>
                            {formErrors.studentId && <Text color='red'>{formErrors.studentId}</Text>}
                            <FormLabel>Course</FormLabel>
                            <Select value={form.courseId ?? 0} name='course' bgColor='white' onChange={e => setForm({...form, courseId: Number(e.target.value)})}>
                                <option value={undefined}>Select Course</option>
                                {courses?.map((course) => {
                                    return (
                                        <option value={course.course_id}>{course.course_name}</option>
                                    )
                                })}
                            </Select>
                            {formErrors.courseId && <Text color='red'>{formErrors.courseId}</Text>}
                            <FormLabel>Grade</FormLabel>
                            <Select value={form.marks} name='marks' bgColor='white' onChange={e => setForm({...form, marks: e.target.value})}>
                                <option value={undefined}>Select Grade</option>
                                <option value='A'>A</option>
                                <option value='B'>B</option>
                                <option value='C'>C</option>
                                <option value='D'>D</option>
                                <option value='E'>E</option>
                                <option value='F'>F</option>
                            </Select>
                            {formErrors.marks && <Text color='red'>{formErrors.marks}</Text>}
                        </FormControl>
                        <Button colorScheme="blue" mt={4} onClick={createNewResult}>Submit</Button>
                    </Box> 
                    <Box bgColor={'gray.200'} m={10} p={6} rounded='xl'>
                        <Heading>Results</Heading>
                        {!results && <Spinner size='xl'/>}
                        {results &&<TableContainer>
                            <Table>
                                <Thead>
                                    <Tr>
                                        <Th>Student Name</Th>
                                        <Th>Course Name</Th>
                                        <Th>Grade</Th>
                                        <Th>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {results.map((result) => {
                                        return (
                                            <Tr>
                                                <Td>{result.first_name} {result.last_name}</Td>
                                                <Td>{result.course_name}</Td>
                                                <Td>{result.score}</Td>
                                                <Td><IconButton colorScheme="red" icon={<DeleteIcon/>} aria-label="delete" onClick={() => removeResult(result.result_id)}/></Td>
                                            </Tr>
                                        )
                                    })}
                                </Tbody>
                            </Table>
                        </TableContainer>
                        }
                    </Box>
                </Container>
            </Box>
        </Flex>
    </Center>)
}

export default Results;