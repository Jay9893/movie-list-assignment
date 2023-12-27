import { useRouter } from 'next/router';
import MovieCreate from "../components/movie/MovieCreate"

const DynamicPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <MovieCreate id={id}/>
  );
};

export default DynamicPage;
