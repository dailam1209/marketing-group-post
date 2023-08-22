import HomePage from "@/components/crm/home/home_page";
import { checkAndRedirectToHomeIfNotLoggedIn } from "@/components/crm/ultis/checkLogin";

export default function Home() {
  return <>{!checkAndRedirectToHomeIfNotLoggedIn() ? null : <HomePage />}</>;
}
