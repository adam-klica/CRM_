import { Box, Text, Input, Button, FormLabel, Center } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../style/Index.module.css";

const Reset = () => {
  const router = useRouter();
  const { id } = router.query;
  const [password, setPassword] = useState();
  const [passwordConfirm, setPasswordConfirm] = useState();
  useEffect(() => {
    document.querySelector("body").classList.add(styles.body);
  });
  const changeHandler = () => {
    if (password !== passwordConfirm) {
      toast.warn("Password do not match!", {
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
    axios
      .post("/api/reset", {
        id: id,
        password: password,
      })
      .then((respone) => {
        toast.success("Password changed!", {
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(function () {
          router.push("/signout");
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      mt="10"
      flexDirection="column"
    >
      <Box
        backgroundColor="white"
        padding="6"
        borderRadius="2xl"
        boxShadow="dark-lg"
        width="400px"
      >
        <Text color="black" fontSize="3xl" textAlign="center" mb="4">
          Password Reset
        </Text>
        <Box>
          <FormLabel>Password *</FormLabel>
          <Input
            type="password"
            variant="filled"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></Input>
          <FormLabel>Confirm Password *</FormLabel>

          <Input
            type="password"
            variant="filled"
            onChange={(e) => {
              setPasswordConfirm(e.target.value);
            }}
          ></Input>
          <Center>
            <Button
              mt="6"
              colorScheme="green"
              size="lg"
              onClick={changeHandler}
            >
              Change Password
            </Button>
          </Center>
        </Box>
      </Box>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
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
};

export default Reset;
