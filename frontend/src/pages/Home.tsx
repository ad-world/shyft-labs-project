import { Box, Center, Flex, Heading, VStack } from "@chakra-ui/react"
import LeftNav from "../components/LeftNav";

const Home = () => {
    return (
        <Center minW='100vw' minH='100vh'>
            <Flex minW='100%' minH='100vh'>
                    <LeftNav/>
                    <Box flex="1" bg="white" minW='70%' minH="100%">
                        <Center minW='100%' minH="100%">
                            <VStack>
                                <Heading as="h1" size="xl" color="gray.500">Welcome to the Student Result Management System</Heading>
                                <Heading size="2xl">ShyftLabs</Heading>
                            </VStack>
                        </Center>
                    </Box>
                </Flex>
        </Center>
    )
}

export default Home;