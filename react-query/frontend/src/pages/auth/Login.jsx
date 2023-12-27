import Card from "../../components/ui/Card";
import LoginForm from "../../components/auth/LoginForm";
import GithubLogin from "../../components/auth/GithubLogin";

const Login = () => {
  return (
    <Card className="p-5">
      <LoginForm />
      <GithubLogin />
    </Card>
  );
};

export default Login;
