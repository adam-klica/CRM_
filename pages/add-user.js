import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import {
  Text,
  Box,
  Button,
  Center,
  Input,
  FormLabel,
  FormHelperText,
  FormControl,
} from "@chakra-ui/react";
import Header from "../components/header";
import styles from "../style/Index.module.css";
import { FiUserPlus } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

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

function SignUp() {
  const router = useRouter();
  const { data, loading, error } = useQuery(ViewerQuery);

  // const viewer = data?.viewer; uncomment this line after you added admin
  // and remove line below
  const viewer = "un";
  const [email, setEmail] = useState();
  const [password, setPassword] = useState("password123");
  const [name, setName] = useState();

  const addUserHandler = (e) => {
    e.preventDefault();
    axios
      .post("/api/addUser", {
        email: email,
        password: password,
        name: name,
      })
      .then((respone) => {
        const { data } = respone;
        if (!data.affectedRows) {
          toast.warn("User already exist!", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return;
        }
        toast.success("User added!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        axios
          .post("/api/email", {
            email: email,
          })
          .then((respone) => {
            router.push("/");
          })
          .catch((e) => {
            console.log(e);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const userHandler = () => {};

  useEffect(() => {
    document.querySelector("body").classList.add(styles.body);
  });
  // set conditions after admin is added to:   if (viewer && viewer.role === "admin")
  if (viewer === "un")
    return (
      <Box>
        {viewer !== "un" && <Header user={viewer}></Header>}

        <Box display="flex" alignItems="center" justifyContent="center" mt="10">
          <Box>
            <Text color="white" fontSize="4xl" textAlign="center" mb="4">
              Add new user
            </Text>
            <Box
              backgroundColor="white"
              padding="6"
              borderRadius="2xl"
              boxShadow="dark-lg"
              width="400px"
            >
              <form onSubmit={addUserHandler}>
                <FormLabel>Name *</FormLabel>
                <Input
                  variant="filled"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                ></Input>
                <FormLabel>Email *</FormLabel>
                <Input
                  variant="filled"
                  type="email"
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <FormLabel>Password *</FormLabel>
                <Input
                  variant="filled"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <FormControl>
                  <FormHelperText>
                    Default password is: "password123"
                  </FormHelperText>
                </FormControl>

                <Center>
                  <Button
                    onClick={userHandler}
                    type="submit"
                    mt="6"
                    colorScheme="green"
                    size="lg"
                    rightIcon={<FiUserPlus />}
                  >
                    Add User
                  </Button>
                </Center>
              </form>
            </Box>
          </Box>
        </Box>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    );
  return (
    <Text color="white" fontSize="2xl">
      You don't have permissions to accees this page!
    </Text>
  );
}

export default SignUp;
