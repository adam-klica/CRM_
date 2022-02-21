import {
  Box,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuItem,
  Button,
  MenuDivider,
} from "@chakra-ui/react";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import styles from "../style/Header.module.css";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();
  return (
    <Box
      backgroundColor="blue.600"
      p="5"
      display="flex"
      justifyContent="space-between"
      alignContent="center"
      alignItems="center"
      borderBottomRadius="3xl"
    >
      <Box ml="10">
        <Link href="/">
          <Text color="white" fontSize="2xl" className={styles.navLink} p="2">
            Home
          </Text>
        </Link>
      </Box>
      {props.user.role === "admin" && (
        <Box ml="-65%" className={styles.navLink} borderRadius="2xl">
          <Link href="/clients">
            <Text color="white" fontSize="2xl" p="2">
              Clients
            </Text>
          </Link>
        </Box>
      )}

      <Box display="flex">
        <Menu>
          <MenuButton
            as={Button}
            variant="outline"
            background="white"
            leftIcon={<FaUserCircle />}
            pr="5"
            mr="10"
          >
            {props.user.name}
          </MenuButton>
          <MenuList>
            <MenuGroup title="Profile">
              <MenuItem
                onClick={() => {
                  router.push(`/reset-password/${props.user.id}`);
                }}
              >
                Reset Password
              </MenuItem>
              <Link href="/project">
                <MenuItem>Add Project</MenuItem>
              </Link>
              {props.user.role === "admin" && (
                <Link href="/add-user">
                  <MenuItem>Add User</MenuItem>
                </Link>
              )}
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Session">
              <Link href="/signout">
                <MenuItem>
                  <a>Sign Out</a>
                </MenuItem>
              </Link>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    </Box>
  );
};

export default Header;
