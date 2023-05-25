import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="userPassword" className="form-label">
            Password
          </label>
          <input type="password" className="form-control" id="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {isLoading && <Loader />}
        <div className="mb-3">
          <button type="submit" className="btn btn-dark w-100">
            Sign In
          </button>
        </div>
        <div className="row py-3">
          <div className="col">
            <p>
              Don't Have Account yet ? <Link to="/register">Register</Link>
            </p>
          </div>
        </div>
      </form>
    </FormContainer>
  );
};

export default LoginPage;
