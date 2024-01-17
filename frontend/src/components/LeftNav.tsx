import { Box, Button, Heading, VStack } from "@chakra-ui/react";

const LeftNav = () => {

    const navItems = [
        { title: 'Home', path: '/' },
        { title: 'Students', path: '/students' },
        { title: 'Courses', path: '/courses' },
        { title: 'Results', path: '/results' },
    ]

	return (
		<Box w="30%" bg="gray.200" minH="100%" p={4}>
			<Heading size="xl" mb={4}>Student Result Management System</Heading>
            <VStack w='100%'>
                {navItems.map((item, index) => {
                    return (
                        <Button
                            variant={window.location.pathname === item.path ? 'solid' : 'ghost'}
                            key={index}
                            size="md"
                            w="100%"
                            textAlign="left"
                            _hover={{ cursor: 'pointer', bgColor: 'gray.300' }}
                            onClick={() => window.location.pathname = item.path}
                        >
                            {item.title}
                        </Button>
                    );
                })}
            </VStack>
		</Box>
	);
};

export default LeftNav;
