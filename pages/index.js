import { useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import {
  Box,
  Text,
  Center,
  Grid,
  GridItem,
  Button,
  Heading,
} from "@chakra-ui/react";
import Header from "../components/header";
import styles from "../style/Index.module.css";
import { AiOutlineEdit } from "react-icons/ai";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
      role
      name
    }
  }
`;

const Index = (props) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  const shouldRedirect = !(loading || error || viewer);
  const { projects } = props;
  useEffect(() => {
    document.querySelector("body").classList.add(styles.body);
  });

  useEffect(() => {
    if (shouldRedirect) {
      router.push("/signin");
    }
  }, [shouldRedirect]);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (viewer && projects) {
    return (
      <Box>
        <Header user={viewer}></Header>
        <Box m="10">
          <Center>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {projects.map((project) => {
                if (project.email == viewer.email || viewer.role === "admin")
                  return (
                    <GridItem
                      backgroundColor="white"
                      key={project.descr}
                      width="100%"
                      boxShadow="9px 9px 7px 2px rgba(0,0,0,0.56)"
                      className={styles.gridItem}
                      width="420px"
                      borderRadius="3xl"
                    >
                      <Box>
                        <Box>
                          <Heading
                            as="h1"
                            fontSize="3xl"
                            textAlign="center"
                            p="5"
                            backgroundColor="blue.500"
                            fontWeight="bold"
                            color="white"
                            borderTopRadius="3xl"
                          >
                            {project.title}
                          </Heading>
                        </Box>
                        <Box>
                          <Text
                            p="2"
                            fontWeight="light"
                            textAlign="center"
                            mt="2"
                          >
                            Project Description:
                          </Text>
                          <Text
                            textAlign="center"
                            fontSize="xl"
                            backgroundColor="gray.200"
                            mt="-2"
                            p="1"
                            height="16"
                          >
                            {project.descr}
                          </Text>
                        </Box>
                        <Box>
                          <Text p="2" fontWeight="light" textAlign="center">
                            Deadline:
                          </Text>
                          <Text
                            fontSize="xl"
                            textAlign="center"
                            backgroundColor="gray.200"
                            mt="-2"
                            p="1"
                          >
                            {project.date}
                          </Text>
                        </Box>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mt="5"
                        mb="4"
                      >
                        {project.status === "Completed" && (
                          <Box
                            backgroundColor="green.400"
                            p="4"
                            borderRadius="2xl"
                            mt="2"
                            ml="10"
                            mb="2"
                          >
                            <Text color="white" fontWeight="bold">
                              {project.status}
                            </Text>
                          </Box>
                        )}

                        {project.status === "Open" && (
                          <Box
                            backgroundColor="gray.400"
                            p="4"
                            borderRadius="2xl"
                            mt="2"
                            ml="10"
                            mb="2"
                          >
                            <Text color="white" fontWeight="bold">
                              {project.status}
                            </Text>
                          </Box>
                        )}

                        {project.status === "In Progress" && (
                          <Box
                            backgroundColor="orange.400"
                            p="4"
                            borderRadius="2xl"
                            mt="2"
                            ml="10"
                            mb="2"
                          >
                            <Text color="white" fontWeight="bold">
                              {project.status}
                            </Text>
                          </Box>
                        )}

                        {project.status === "Canceled" && (
                          <Box
                            backgroundColor="red.400"
                            p="4"
                            borderRadius="2xl"
                            mt="2"
                            ml="10"
                            mb="2"
                          >
                            <Text color="white" fontWeight="bold">
                              {project.status}
                            </Text>
                          </Box>
                        )}
                        <Box
                          mr="10"
                          onClick={() => {
                            router.push(`/projects/${project.id}`);
                          }}
                        >
                          {(viewer.role === "admin" ||
                            viewer.email == project.email) && (
                            <Button backgroundColor="transparent" mr="2">
                              <AiOutlineEdit size="35px" />
                            </Button>
                          )}
                        </Box>
                      </Box>
                      {viewer.role === "admin" && (
                        <Box
                          backgroundColor="gray.500"
                          borderBottomEndRadius="3xl"
                          borderBottomLeftRadius="3xl"
                        >
                          <Text textAlign="center" color="white">
                            Client: {project.email}
                          </Text>
                        </Box>
                      )}
                    </GridItem>
                  );
              })}
            </Grid>
          </Center>
        </Box>
      </Box>
    );
  }

  return <p>Loading...</p>;
};

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/getProjects");
  const projects = await res.json();

  return {
    props: { projects },
  };
}

export default Index;
