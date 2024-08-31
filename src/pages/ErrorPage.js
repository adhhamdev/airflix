import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className='ErrorPage'>
      <h1>Oops! Something went wrong</h1>
      <p>We're sorry, but an error occurred while processing your request.</p>
      <p>
        <strong>Error details:</strong> {error.statusText || error.message}
      </p>
      <Link to='/' className='backToHome'>
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
