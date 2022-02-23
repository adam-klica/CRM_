import {
  Box,
  Text,
  Center,
  Input,
  FormLabel,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Header from "../../components/header";
import { gql, useQuery } from "@apollo/client";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";

const ViewerQuery = gql`
  query ViewerQuery {
    viewer {
      id
      email
      name
      role
    }
  }
`;

const SingleProject = (props) => {
  const router = useRouter();
  const { data, loading, error } = useQuery(ViewerQuery);
  const viewer = data?.viewer;
  const project = props.project[0];
  const [date, setDate] = useState(project.date);
  const [title, setTitle] = useState(project.title);
  const [desc, setDesc] = useState(project.descr);
  const [status, setStatus] = useState(project.status);

  const updateHandler = () => {
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

    axios
      .post("/api/updateProject", {
        id: project.id,
        title: title,
        date: date,
        desc: desc,
        status: status,
      })
      .then((respone) => {
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
    toast.success("Project updated!", {
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
  };

  const deleteHandler = () => {
    axios
      .post("/api/deleteProject", {
        id: project.id,
      })
      .then((respone) => {
        router.push("/");
      })
      .catch((e) => {
        console.log(e);
      });
    toast.warn("Project deleted!", {
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
  };
  if (
    (viewer && project && viewer.email === project.email) ||
    (viewer && project && viewer.role === "admin")
  ) {
    return (
      <Box backgroundColor="gray.100" height="100vh">
        <Header user={viewer}></Header>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          width="50%"
          ml="25%"
          mt="5%"
          p="10"
          backgroundColor="white"
          borderRadius="2xl"
        >
          <Box>
            <FormLabel>Project Title</FormLabel>
            <Input
              defaultValue={project.title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></Input>
          </Box>
          <Box>
            <FormLabel>Project Description</FormLabel>
            <Input
              defaultValue={project.descr}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            ></Input>
          </Box>
          <Box>
            <FormLabel>Project Status</FormLabel>
            <Select
              defaultValue={project.status}
              onChange={(e) => {
                setStatus(e.target.value);
              }}
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Canceled">Cancelled</option>
              <option value="Completed">Completed</option>
            </Select>
          </Box>
          <Box>
            <FormLabel>Deadline</FormLabel>
            <Input
              mb="4"
              type="date"
              defaultValue={project.date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></Input>
          </Box>

          <Box display="flex" justifyContent="flex-end" mt="3" mb="-3">
            <Button colorScheme="green" mr="2" onClick={updateHandler}>
              Update
            </Button>
            <Button colorScheme="red" onClick={deleteHandler}>
              Delete
            </Button>
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
  }
  return <Text>Loading...</Text>;
};

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/${context.query.id}`);
  const project = await res.json();

  return {
    props: { project },
  };
}

export default SingleProject;
