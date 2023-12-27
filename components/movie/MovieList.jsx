import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./movie.css";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import btmImage from "../../public/Vector.svg";
import Group from "../../public/Group.svg";

console.log(btmImage, "dsaf");
const MovieList = () => {
  const [movie, setMovie] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleUser = async (Page) => {
    try {
      const response = await axios.get(`/api/movie?page=${currentPage}`);
      setMovie(response.data.result);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error creating User:", error.message);
    }
  };

  useEffect(() => {
    handleUser();
  }, [currentPage]);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected + 1);
  };

  return (
    <div style={{ paddingBottom: "220px" }}>
      <div className="container">
        <div className="titleSection">
          <div className="titlediv">
            <div>
              <h2 className="movietitle">My movies</h2>
            </div>
            <div>
              <Link href="/movie">
                <img
                  src={btmImage?.src}
                  style={{
                    paddingTop: "14px",
                    width: "32px",
                    height: "32px",
                    marginTop: "7px",
                  }}
                />
              </Link>
            </div>
          </div>
          <div className="loginsection">
            <div>
              <h2 className="movietitle">Logout</h2>
            </div>
            <Link href="/login">
              <img
                src={Group?.src}
                style={{
                  paddingTop: "14px",
                  width: "32px",
                  height: "32px",
                  marginTop: "7px",
                }}
              />
            </Link>
          </div>
        </div>

        <div className="row" style={{ minHeight: "1043px" }}>
          {movie?.map((item) => (
            <div className="col-3">
              <div className="card">
                <Link href={`/${item._id}`} style={{ textDecoration: "none" }}>
                  <img
                    src={`/api/imageget/?id=${item._id}`}
                    style={{ width: "100%", height: "400px" }}
                  />
                  <div className="contentarea">
                    <h3 className="imagetitle">{item.title}</h3>
                    <p className="publishingyer">{item.publishingYear}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={10}
          marginPagesDisplayed={currentPage}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default MovieList;
