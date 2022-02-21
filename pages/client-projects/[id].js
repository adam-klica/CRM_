import { Box, Text, Grid, GridItem, Button, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import styles from "../../style/Index.module.css";
import { gql, useQuery } from "@apollo/client";
import { AiOutlineEdit } from "react-icons/ai";
import Header from "../../components/header";
import { useEffect } from "react";

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

const Projects = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const { projects } = props;
  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  useEffect(() => {
    document.querySelector("body").classList.add(styles.body);
  });

  if (projects.length !== 0 && viewer && viewer.role === "admin") {
    return (
      <Box>
        <Header user={viewer}></Header>
        <Center>
          <Text mt="4" color="white" fontSize="3xl">
            List of all projects by: {id}
          </Text>
        </Center>
        <Box m="10">
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {projects.map((project) => {
              if (project)
                return (
                  <GridItem
                    backgroundColor="white"
                    key={project.descr}
                    width="100%"
                    boxShadow="9px 9px 7px 2px rgba(0,0,0,0.56)"
                    className={styles.gridItem}
                    width="450px"
                    borderRadius="3xl"
                  >
                    <Box>
                      <Box>
                        <Text
                          fontSize="3xl"
                          textAlign="center"
                          p="5"
                          backgroundColor="blue.500"
                          fontWeight="bold"
                          color="white"
                          borderTopRadius="3xl"
                        >
                          {project.title}
                        </Text>
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
                          fontSize="xl"
                          textAlign="center"
                          backgroundColor="gray.200"
                          mt="-2"
                          p="1"
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
                  </GridItem>
                );
            })}
          </Grid>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Text color="white" fontSize="3xl">
        Something goes wrong!
      </Text>
    </Box>
  );
};

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:3000/api/projects/${context.query.id}`
  );
  const projects = await res.json();

  return {
    props: { projects },
  };
}

export default Projects;
