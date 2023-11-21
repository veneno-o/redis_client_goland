import { useNavigate } from "react-router-dom";

export default function Test() {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate("/");
      }}
    >
      Test
    </div>
  );
}
