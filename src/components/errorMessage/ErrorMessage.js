import img from './error.gif';

const ErrorMessage = () => {
  return (
    <img
      style={{ display: 'block', width: 250, height: 250, margin: '0 auto' }}
      alt="error"
      src={img}
    />
  );
};

export default ErrorMessage;
