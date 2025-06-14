import { Suspense } from "react";
import ConfirmEmail from "./ConfirmEmail";

export default function Page() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <ConfirmEmail />
    </Suspense>
  );
}
