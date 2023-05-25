const FormContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="row justify-content-md-center mt-5">
        <div className="col-xs-12 col-md-6 card p-5">{children}</div>
      </div>
    </div>
  );
};

export default FormContainer;
