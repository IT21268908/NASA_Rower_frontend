/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import GalleryFilter from "../components/GalleryFilter";
import DateSummary from "../components/DateSummary";
import PhotoGallery from "../components/PhotoGallery";
import { apiManifestUrl,apiDateBase } from "../utils/constants";

const RowerPage = () => {

  // Data from manifest api
  const [manifestData, setManifestData] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Photos fetched from getPhotosByDate()
  const [fetchedPhotos, setFetchedPhotos] = useState([]);
  //  Date Picked by user
  const [datePicked, setDatePicked] = useState("");
  // Currently selected camera filter for photo gallery - 0 state returns all - real cameras have unique ids
  const [activeCamera, setActiveCamera] = useState({
    value: 0,
    label: "All Cameras",
  });
  const [activeCameraName, setActiveCameraName] = useState("");
  const [numberOfFilteredPhotos, setNumberOfFilteredPhotos] = useState(0);
  // Photos filtered by selected activeCamera
  const [filteredPhotos, setFilteredPhotos] = useState([]);
  //Load 25 images at a time
  const [imagesPerPage, setImagesPerPage] = useState(0);
  const [currentFilteredImages, setCurrentFilteredImages] = useState([]);

  // Fetches all photos by given Earth date
  const getPhotosByDate = async (date) => {
    setIsLoading(true);
    setFetchedPhotos([]);
    setImagesPerPage(25);
    const response = await (await fetch(apiDateBase + date)).json();
    setFetchedPhotos(response.photos);
    setFilteredPhotos(response.photos);
    setNumberOfFilteredPhotos(response.photos.length);
    setActiveCamera({ value: 0, label: "All Cameras" });
    setIsLoading(false);
    return response;
  };
  // 1. - Fetches mission manifest to get latest date photos were provided
  // 2. - Uses that date to call getPhotosByDate(date) to display the most recent images
  // 3. - Uses date for setDatePicked(date) to update the Datepicker placeholder
  useEffect(() => {
    fetch(apiManifestUrl)
      .then((response) => response.json())
      .then((response) => {
        setDatePicked(response.photo_manifest.max_date);
        setManifestData(response.photo_manifest);
        setDatePicked(
          new Date(response.photo_manifest.max_date).toISOString().split("T")[0]
        );
        return response.photo_manifest;
      });
  }, []);

  useEffect(() => {
    if (datePicked) getPhotosByDate(datePicked);
  }, [datePicked]);

  useEffect(() => {
    if (activeCamera.value === 0) {
      setCurrentFilteredImages(fetchedPhotos.slice(0, imagesPerPage));
    } else {
      setCurrentFilteredImages(currentFilteredImages.slice(0, imagesPerPage));
    }
  }, [imagesPerPage, fetchedPhotos]);

  //Infinite Scroll loading for gallery
  const [loadMore, handleLoadMore] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", calcLoadMore);
    if (loadMore) {
      setImagesPerPage(imagesPerPage + 25);
    }
  }, [loadMore]);

  const calcLoadMore = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 200
    ) {
      handleLoadMore(true);
    } else {
      handleLoadMore(false);
    }
    return () => window.removeEventListener("scroll", calcLoadMore);
  };
  return (
    <>
      <Row>
        <Col className="searchBox">
          <div></div>
          <div className="searchInputs">
            <input
              type="date"
              value={datePicked}
              onChange={(e) => setDatePicked(e.target.value)}
              min={manifestData.landing_date}
              max={manifestData.max_date}
              placeholder="Select a date"
            />
          </div>
          <div className="searchInputs g-filter">
            <GalleryFilter
              setCurrentFilteredImages={setCurrentFilteredImages}
              activeCamera={activeCamera}
              setActiveCamera={setActiveCamera}
              setActiveCameraName={setActiveCameraName}
              fetchedPhotos={fetchedPhotos}
              setNumberOfFilteredPhotos={setNumberOfFilteredPhotos}
            />
          </div>
        </Col>
      </Row>
      <DateSummary
        isLoading={isLoading}
        fetchedPhotos={fetchedPhotos}
        filteredPhotos={filteredPhotos}
        activeCamera={activeCamera}
        activeCameraName={activeCameraName}
        numberOfFilteredPhotos={numberOfFilteredPhotos}
      />
      <PhotoGallery currentFilteredImages={currentFilteredImages} />
    </>
  );
};

export default RowerPage;
