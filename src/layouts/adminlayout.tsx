import { Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Loading from "../theme/loading";
import { useLoading } from "../contexts/loading";
import Sidebar from "../components/admin/sidebar";
import Header from "../components/admin/header";
import { useTheme } from "../contexts/theme";
import withAdminAuth from "../HOC/withAdminAuth ";

function AdminLayout() {
  const { loading } = useLoading();
  const { darkMode } = useTheme();



  return (
    <>
      <Loading isShow={loading} />
      <div className="flex">
        <Sidebar/>
        <div className="w-full gird grid-cols-1">
          <Header/>
          <div className={`fixed top-10 right-0 p-10 w-[1246px] h-screen overflow-y-auto ${darkMode ? 'bg-[#1A222C] ' : 'bg-[#F1F5F9]'}`}><Outlet /></div>    
        </div>
      </div>
    </>
  );
}

export default withAdminAuth(AdminLayout);
