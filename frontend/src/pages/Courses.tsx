import { Center, Flex, Container, Heading, FormControl, FormLabel, Input, Button, Spinner, TableContainer, Table, Thead, Tr, Th, Tbody, Td, Box, Text, useToast } from "@chakra-ui/react";
import LeftNav from "../components/LeftNav";
import { useEffect, useState } from "react";
import { Course } from "../types";
import { createCourse, getCourses } from "../api";

interface NewCourseForm {
    courseName: string;
}

const Courses = () => {
    const toast = useToast();
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [form, setForm] = useState<NewCourseForm>({
        courseName: ''
    })

    const [formErrors, setFormErrors] = useState({
        courseName: ''
    })

    const fetchCourses = async () => {
        const courses = await getCourses();
        if(courses.data) {
            setCourses(courses.data)
        }
    }

    const addNewCourse = async (courseName: string) => {
        await createCourse({ course_name: courseName });
        fetchCourses();
    }

    const submit = () => {
        if (form.courseName === '') {
            setFormErrors({ ...formErrors, courseName: 'Course name cannot be empty' })
        } else {
            addNewCourse(form.courseName);
            toast({
                title: 'Course Added - ' + form.courseName,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top'
            })
            
            setForm({ courseName: '' });
            setFormErrors({ courseName: '' });
        }
    }

    useEffect(() => {
        fetchCourses();
    }, [])

    return (
        <Center minW="100vw" minH="100vh">
			<Flex minW="100%" minH="100vh">
				<LeftNav />
				<Box flex="1" bg="white">
                    <Container maxW="container.xl" mt={4}>
                        <Box bgColor='gray.200' m={10} p={6} rounded='xl'>
                            <Heading>Add New Course</Heading>
                            <FormControl>
                                <FormLabel>Course Name</FormLabel>
                                <Input value={form.courseName} type='text' name='courseName' bgColor='white' onChange={e => setForm({...form, courseName: e.target.value})}></Input>
                                {formErrors.courseName && <Text color='red'>{formErrors.courseName}</Text>}
                            </FormControl>
                            <Button colorScheme="blue" mt={4} onClick={submit}>Submit</Button>
                        </Box> 
                        <Box bgColor={'gray.200'} m={10} p={6} rounded='xl'>
                            <Heading>Courses</Heading>
                            {!courses && <Spinner size='xl'/>}
                            {courses &&<TableContainer>
                                <Table>
                                    <Thead>
                                        <Tr>
                                            <Th>Course Name</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {courses.map((course) => {
                                            return (
                                                <Tr>
                                                    <Td>{course.course_name}</Td>
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
		</Center>
    )
}

export default Courses;