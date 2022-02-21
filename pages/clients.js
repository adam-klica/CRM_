import { Box, Text, Grid, GridItem, Center, Button } from "@chakra-ui/react";
import Header from "../components/header";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import styles from "../style/Index.module.css";
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

const Clients = (props) => {
  const router = useRouter();
  const { clients } = props;
  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  useEffect(() => {
    document.querySelector("body").classList.add(styles.body);
  });

  if (viewer && viewer.role === "admin") {
    return (
      <Box height="100vh">
        <Header user={viewer}></Header>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <Text p="5" color="white" fontSize="3xl">
            List of All Clients:
          </Text>
          <Box>
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
              {clients.map((client) => {
                return (
                  <GridItem key={client.email} width="250px">
                    <Box backgroundColor="white" p="4" borderRadius="xl">
                      <Text>{client.email}</Text>
                      <Text
                        textAlign="center"
                        fontSize="2xl"
                        p="4"
                        backgroundColor="gray.200"
                      >
                        {client.name}
                      </Text>
                      <Box>
                        <Center>
                          <Button
                            colorScheme="blue"
                            size="sm"
                            mt="4"
                            onClick={() => {
                              router.push(`/client-projects/${client.email}`);
                            }}
                          >
                            See All Projects
                          </Button>
                        </Center>
                      </Box>
                    </Box>
                  </GridItem>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Box>
    );
  }
  return (
    <Text color="white">You don't have permissions to accees this page.</Text>
  );
};

export async function getStaticProps(context) {
  const res = await fetch("http://localhost:3000/api/getClients");
  const clients = await res.json();

  return {
    props: { clients },
  };
}

export default Clients;
