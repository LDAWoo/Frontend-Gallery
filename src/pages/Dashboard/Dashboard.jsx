import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { findOwnerByToken } from "~/api/Owner";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import LoadingFullScreen from "~/components/Loading/LoadingFullScreen";
import routesConfig from "~/configs";
import getCookie from "~/hooks/useRegisterGetCookie";
import setCookie from "~/hooks/useRegisterSetCookie";
import { useGlobalState } from "~/store";
import ModalCheckInboxEmail from "./ModalCheckInboxEmail";
import ModalEmailExpired from "./ModalEmailExpired/ModalEmailExpired";
import ModalWelcomeBack from "./ModalWelcomeBack/ModalWelcomeBack";

const Dashboard = () => {
  const [searchParams] = useSearchParams();
  const paramsToken = searchParams.get("token") || "";

  const navigate = useNavigate();
  const [loading] = useGlobalState("loading");
  const [visible, setVisible] = useState(false);
  const { setOwner } = useContext(UserContext);
  const token = getCookie("token");

  useEffect(() => {
    if (paramsToken) {
      const fetchData = async () => {
        try {
          const result = await findOwnerByToken(paramsToken);
          setVisible(false);
          setCookie("token", paramsToken);
          setOwner(result);
          navigate(routesConfig.dashboard);
        } catch (e) {
          console.error("Error fetching data by token:", e);
          setVisible(true);
        }
      };

      fetchData();
    } else {
      if (token.length > 0) {
        const checkTokenOwner = async () => {
          try {
            const result = await findOwnerByToken(token);
            setVisible(false);
            setOwner(result);
          } catch (e) {
            console.error("Error checking token owner:", e);
            setVisible(true);
          }
        };
        checkTokenOwner();
      } else {
        setVisible(true);
      }
    }
  }, [token, paramsToken, navigate, setOwner]);

  return (
    <div>
      {visible ? (
        <>
          <ModalWelcomeBack />
          <ModalCheckInboxEmail />
          <ModalEmailExpired />
        </>
      ) : (
        <div>DashBoard</div>
      )}
      <LoadingFullScreen isLoading={loading} />
    </div>
  );
};

export default Dashboard;
