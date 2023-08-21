import Setting from "@/components/crm/setting/setting";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";

export default function Home() {
  return <>{!checkAndRedirectToHomeIfNotLoggedIn() ? null : <Setting />}</>;
}
