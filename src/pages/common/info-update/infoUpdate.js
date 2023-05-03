import { Grid } from "@mui/material";
import { Container } from "@mui/system";
import { TitleButtonBar } from "../../../component/titleButtonBar";
import { UpdateForm } from "./updateForm";

export const InfoUpdate = () => {
  return (
    <>
      <TitleButtonBar title={"개인정보 수정"} />
      <UpdateForm />
    </>
  );
};
