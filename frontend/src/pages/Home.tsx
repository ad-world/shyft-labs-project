import { Box, Center, Flex } from "@chakra-ui/react"
import LeftNav from "../components/LeftNav";

const Home = () => {
    return (
        <Center minW='100vw' minH='100vh'>
            <Flex minW='100%' minH='100vh'>
                    <LeftNav/>
                    <Box flex="1" bg="white">
                    </Box>
                </Flex>
        </Center>
    )
}

export default Home;