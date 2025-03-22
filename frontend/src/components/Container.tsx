import { ReactNode } from "react";

const Container = ({
  children,
  id = "default",
}: {
  id?: "main" | "default";
  children: ReactNode;
}) => {
  return (
    <div className="container" id={id}>
      {children}
    </div>
  );
};
export default Container;
