import Router, { useRouter } from "next/router";

const ComponentEmpty = () => {
  const router = useRouter();
  router.push("/");
  return null;
};
export default ComponentEmpty;
