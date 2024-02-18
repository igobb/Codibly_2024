import './ErrorPage.scss';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="error-page__container">
      <h1>We dont know site like this.</h1>
      <Link to="/">Go home!</Link>
    </div>
  );
};

export default ErrorPage;
