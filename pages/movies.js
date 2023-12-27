import MovieList from "../components/movie/MovieList";
import { useRouter } from 'next/router';

export default function Movie() {
    const router = useRouter();
    return <> <MovieList/></>;
  }
  