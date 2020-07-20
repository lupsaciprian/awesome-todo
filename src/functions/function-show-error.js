import { Dialog, Loading } from "quasar";

export function showErrorMessage(errorMessage) {
  console.log(errorMessage);
  Loading.hide();
  Dialog.create({
    title: "Error",
    message: errorMessage
  });
}
