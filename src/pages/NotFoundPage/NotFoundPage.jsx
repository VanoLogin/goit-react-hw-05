import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <h2>
      Not Found page. Please go to <Link to="/">home page</Link>
    </h2>
  );
}
