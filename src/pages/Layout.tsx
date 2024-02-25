import { Box } from "@chakra-ui/layout";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/index";

function Layout() {
  return (
    <>
      <Navbar />
      <Box padding={5}>
        <Outlet />
      </Box>
    </>
  );
}

export default Layout;
