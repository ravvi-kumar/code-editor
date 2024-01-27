import { PropsWithChildren } from "react";
import { ThemeProvider } from "./theme-provider";

function Provider({ children }: PropsWithChildren<{}>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export default Provider;
