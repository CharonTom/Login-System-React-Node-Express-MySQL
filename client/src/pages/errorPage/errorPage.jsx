import { Link } from "react-router-dom";

function Error() {
  return (
    <div className="error">
      <div className="error__big">404</div>
      <div className="error__text">Oups! Page not Found....</div>
      <Link className="button" to="/">
        Go to homepage
      </Link>
    </div>
  );
}

export default Error;
