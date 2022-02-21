import { useState } from "react";
import { useRouter } from "next/router";
import { gql } from "@apollo/client";
import { useMutation, useApolloClient } from "@apollo/client";
import { getErrorMessage } from "../lib/form";
import { Box, Text, Center, Button, Input, FormLabel } from "@chakra-ui/react";
import { RiLoginCircleLine } from "react-icons/ri";

const SignInMutation = gql`
  mutation SignInMutation($email: String!, $password: String!) {
    signIn(input: { email: $email, password: $password }) {
      user {
        id
        email
      }
    }
  }
`;

function SignIn() {
  const client = useApolloClient();
  const [signIn] = useMutation(SignInMutation);
  const [errorMsg, setErrorMsg] = useState();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const emailElement = event.currentTarget.elements.email;
    const passwordElement = event.currentTarget.elements.password;

    try {
      await client.resetStore();
      const { data } = await signIn({
        variables: {
          email: emailElement.value,
          password: passwordElement.value,
        },
      });
      if (data.signIn.user) {
        await router.push("/");
      }
    } catch (error) {
      setErrorMsg(getErrorMessage(error));
    }
  }

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      margin="0"
      height="100vh"
      backgroundColor="#474747"
    >
      <Box>
        <Text color="white" fontSize="4xl" textAlign="center" mb="4">
          Sign In
        </Text>
        <Box
          backgroundColor="white"
          padding="6"
          borderRadius="2xl"
          boxShadow="dark-lg"
          width="400px"
        >
          <form onSubmit={handleSubmit}>
            {errorMsg && <p>{errorMsg}</p>}
            <FormLabel>Email *</FormLabel>
            <Input
              type="email"
              required
              label="Email"
              variant="filled"
              name="email"
            />
            <FormLabel>Password *</FormLabel>
            <Input
              variant="filled"
              label="Password"
              name="password"
              type="password"
            ></Input>
            <Center>
              <Button
                type="submit"
                mt="6"
                colorScheme="blue"
                size="lg"
                rightIcon={<RiLoginCircleLine />}
              >
                Login
              </Button>
            </Center>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
