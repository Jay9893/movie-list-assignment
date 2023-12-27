import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";
import btmImage from "../public/Vectors.svg"
export default function App({ Component, pageProps }) {
  return (
    <div className="main_wrapper">
      <Component {...pageProps} />
      <div className="bottom-image">
        <img src={btmImage.src} style={{width: "100%"}} />
      </div>
    </div>
  );
}
