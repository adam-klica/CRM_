import { Box, Text, Button, Input, Select, FormLabel } from "@chakra-ui/react";
import axios from "axios";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import Header from "../components/header";
import { AiOutlineFileAdd } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import styles from "../style/Index.module.css";

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
const Project = () => {
  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("un");
  const [status, setStatus] = useState("un");
  const router = useRouter();
  useEffect(() => {
    document.querySelector("body").classList.add(styles.body);
  });

  const hendler = (e) => {
    e.preventDefault();
    if (title.length < 1) {
      toast.error("Title should not be empty!", {
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

    if (desc.length < 1) {
      toast.error("Description should not be empty!", {
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
    if (status === "un") {
      toast.error("Select project status!", {
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
    if (date === "un") {
      toast.error("Select deadline!", {
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
      .post("/api/addProject", {
        title: title,
        desc: desc,
        date: date,
        status: status,
        email: viewer.email,
      })
      .then((respone) => {
        toast.success("Project added!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(function () {
          router.push("/");
        }, 5500);
      })
      .catch((e) => {
        console.log(e);
      });

    setTitle("");
    setDesc("");
  };

  if (viewer) {
    return (
      <Box height="100vh">
        <Header user={viewer}></Header>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          width="50%"
          ml="25%"
          mt="5%"
          p="10"
          backgroundColor="white"
          borderRadius="2xl"
        >
          <Text mb="4" fontSize="3xl">
            Add New Project
          </Text>
          <Input
            variant="filled"
            value={title}
            mb="4"
            placeholder="Project Title"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          ></Input>

          <Input
            value={desc}
            variant="filled"
            mb="4"
            placeholder="Project Description"
            type="text"
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></Input>

          <Select
            variant="filled"
            onChange={(e) => {
              setStatus(e.target.value);
            }}
          >
            <option value="" style={{ display: "none" }}>
              Project Status
            </option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Canceled">Cancelled</option>
            <option value="Completed">Completed</option>
          </Select>

          <FormLabel mt="2" fontSize="sm" fontWeight="normal">
            Deadline
          </FormLabel>
          <Input
            variant="filled"
            mb="4"
            type="date"
            onChange={(e) => {
              setDate(e.target.value);
            }}
          ></Input>

          <Button
            rightIcon={<AiOutlineFileAdd />}
            mt="5"
            onClick={hendler}
            colorScheme="blue"
          >
            Add New
          </Button>
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
  }
  return <p>Loading...</p>;
};

export default Project;
