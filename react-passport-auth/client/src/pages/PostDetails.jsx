import { useLoaderData } from "react-router-dom";

const PostDetails = () => {
  const { img, title, desc, longDesc } = useLoaderData()[0];

  return (
    <div className="post">
      <img src={img} alt={title} className="postImg" />
      <h1 className="postTitle">{title}</h1>
      <p className="postDesc">{desc}</p>
      <p className="postLongDesc">{longDesc}</p>
    </div>
  );
};

export default PostDetails;
