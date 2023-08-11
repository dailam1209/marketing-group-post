import { ModalWrapper } from "@/components/modal/ModalWrapper"

export const ConfirmDuyetModal = ({
  open,
  setOpen,
  data
}: {
  open: boolean
  setOpen: any
  data: any
}) => {
  return ModalWrapper(
    open,
    setOpen,
    <p style={{ textAlign: "center" }}>
      {data?.length > 1
        ? "Các tài khoản đã được duyệt"
        : "Tài khoản đã được duyệt"}
    </p>,
    400,
    "",
    "OK",
    () => setOpen(false),
    false,
    true,
    false,
    false
  )
}
