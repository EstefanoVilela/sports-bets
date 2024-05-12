import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { AdvisorDashboard } from "./AdvisorDashboard";
import { PlayerHistory } from "./PlayerHistory";

export const Home = ({ logout }) => {
  const [roleId, setRoleId] = useState(null);

  useEffect(() => {
    const _roleId = Cookies.get("roleId");
    setRoleId(_roleId);
  });

  return (
    <>
      {
        roleId == 1
          ? <AdvisorDashboard logout={ logout } />
          : <PlayerHistory logout={ logout } />
      }
    </>
  );
}