import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();
  return (
    <h2
      id="logo"
      onClick={() => {
        navigate("/");
      }}
    >
      Blogul meu<span id="dot">.</span>
    </h2>
  );
}
