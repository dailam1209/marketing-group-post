import { MyTable } from "@/components/quan-ly-cong-ty/quan-ly-phong-ban/table/Table";
import styles from "./index.module.css";
import { DanhSachNhanVienTable } from "@/components/de-xuat/so-do-to-chuc/table/Table";
import { POST_SS, POST_SS_HR } from "@/pages/api/BaseApi";

export default function DanhSachNhanVienChuaChamCong({
  listEmUntimed,
  listDepartments,
  listTeams,
  listGroups,
  type,
  id,
}) {
  return (
    <div>
      <DanhSachNhanVienTable
        id={id}
        type={type}
        listEmUntimed={listEmUntimed?.listEmployee}
        listDepartments={listDepartments}
        listTeams={listTeams}
        listGroups={listGroups}
      />
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const type = context?.query?.type || null;
  const id = context?.query?.id || null;

  const listEmUntimed = await POST_SS(
    "api/hr/organizationalStructure/listEmUntimed",
    {
      type_timekeep: 2,
    },
    context,
    "hr"
  );

  const listTeams = await POST_SS(
    "api/qlc/team/list",
    {
      com_id: 1763,
    },
    context
  );

  const listDepartments = await POST_SS(
    "api/qlc/department/list",
    {
      com_id: 1763,
    },
    context
  );

  const listGroups = await POST_SS(
    "api/qlc/group/search",
    {
      com_id: 1763,
    },
    context
  );

  return {
    props: {
      listEmUntimed,
      listDepartments,
      listTeams,
      listGroups,
      type,
      id,
    },
  };
};
