import {
	Box,
	Button,
	Center,
	Container,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Spinner,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import LeftNav from "../components/LeftNav";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Student } from "../types";
import { getStudents } from "../api";

interface NewStudentForm {
	firstName: string;
	lastName: string;
	dob: Date;
}

const Students = () => {
	const [students, setStudents] = useState<Student[] | null>(null);
	const [form, setForm] = useState<NewStudentForm>({
		firstName: "",
		lastName: "",
		dob: new Date(),
	});

	const [formErrors, setFormErrors] = useState({
		firstName: "",
		lastName: "",
		dob: "",
	});

	const fetchStudents = async () => {
		const students = await getStudents();
		if (students.data) {
			setStudents(students.data);
		}
	};

	useEffect(() => {
		fetchStudents();
	}, []);

	const checkDate = (date: Date) => {
		const today = new Date();
		today.setFullYear(today.getFullYear() - 10);
		return date <= today;
	};

    const checkValidDate = (date: Date) => {
        const today = new Date();
        return date <= today;
    }

	const submit = () => {
		if (form.firstName && form.lastName && form.dob) {
			setFormErrors({ firstName: "", lastName: "", dob: "" });
            if(!checkValidDate(form.dob)) {
                setFormErrors({
                    ...formErrors,
                    dob: "Date of birth cannot be in the future"
                })
            } else if (!checkDate(form.dob)) {
				setFormErrors({
					...formErrors,
					dob: "Date of birth must be at least 10 years ago",
				});
			} else {
				setFormErrors({ ...formErrors, dob: "" });
				// submit here
			}
		} else {
            console.log(form)
			if (!form.firstName) {
				setFormErrors((formErrors) => ({
					...formErrors,
					firstName: "First name cannot be empty",
				}));
			} else {
				setFormErrors({ ...formErrors, firstName: "" });
			}

			if (!form.lastName) {
				setFormErrors((formErrors) => ({
					...formErrors,
					lastName: "Last name cannot be empty",
				}));
			} else {
				setFormErrors((formErrors) => ({ ...formErrors, lastName: "" }));
			}

			if (!form.dob) {
				setFormErrors(formErrors => ({
					...formErrors,
					dob: "Date of birth cannot be empty",
				}));
			} else {
                if(!checkValidDate(form.dob)) {
                    setFormErrors(formErrors => ({
                        ...formErrors,
                        dob: "Date of birth cannot be in the future"
                    }))
                } else if (!checkDate(form.dob)) {
                    setFormErrors(formErrors => ({
                        ...formErrors,
                        dob: "Date of birth must be at least 10 years ago",
                    }));
                } else {
                    setFormErrors(formErrors => ({ ...formErrors, dob: "" }));
                }
			}
		}
	};

	return (
		<Center minW="100vw" minH="100vh">
			<Flex minW="100%" minH="100vh">
				<LeftNav />
				<Box flex="1" bg="white">
					<Container maxW="container.xl" mt={4}>
						<Box bgColor="gray.200" m={10} p={6} rounded="xl">
							<Heading>Add New Student</Heading>
							<FormControl>
								<FormLabel>First Name</FormLabel>
								<Input
									value={form.firstName}
									type="text"
									name="firstName"
									bgColor="white"
									onChange={(e) =>
										setForm({
											...form,
											firstName: e.target.value,
										})
									}
								></Input>
								{formErrors.firstName && (
									<Text color="red">
										{formErrors.firstName}
									</Text>
								)}
								<FormLabel>Last Name</FormLabel>
								<Input
									value={form.lastName}
									type="text"
									name="lastName"
									bgColor="white"
									onChange={(e) =>
										setForm({
											...form,
											lastName: e.target.value,
										})
									}
								></Input>
								{formErrors.lastName && (
									<Text color="red">
										{formErrors.lastName}
									</Text>
								)}
								<FormLabel>Date of Birth</FormLabel>
								<Input
									value={format(form.dob, "yyyy-MM-dd")}
									type="date"
									name="dob"
									bgColor="white"
									onChange={(e) => {
										setForm({
											...form,
											dob:
												e.target.valueAsDate ??
												new Date(),
										});
									}}
								></Input>
								{formErrors.dob && (
									<Text color="red">{formErrors.dob}</Text>
								)}
							</FormControl>
							<Button colorScheme="blue" mt={4} onClick={submit}>
								Submit
							</Button>
						</Box>
						<Box bgColor={"gray.200"} m={10} p={6} rounded="xl">
							<Heading>Students</Heading>
							{!students && <Spinner size="xl" />}
							{students && (
								<TableContainer>
									<Table>
										<Thead>
											<Tr>
												<Th>First Name</Th>
												<Th>Last Name</Th>
												<Th>Date of Birth</Th>
											</Tr>
										</Thead>
										<Tbody>
											{students.map((student) => {
												return (
													<Tr>
														<Td>
															{student.first_name}
														</Td>
														<Td>
															{student.last_name}
														</Td>
														<Td>{student.dob}</Td>
													</Tr>
												);
											})}
										</Tbody>
									</Table>
								</TableContainer>
							)}
						</Box>
					</Container>
				</Box>
			</Flex>
		</Center>
	);
};

export default Students;
