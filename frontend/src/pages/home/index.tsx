import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="text-[red]">Home</div>
      <Link to="/test">go test</Link>
    </div>
  );
}
