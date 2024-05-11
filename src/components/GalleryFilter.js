/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Select from 'react-select';

export default function GalleryFilter({
  setCurrentFilteredImages,
  activeCamera,
  setActiveCamera,
  setActiveCameraName,
  fetchedPhotos,
  setNumberOfFilteredPhotos,
}) {
  const [availableCameras, setAvailableCameras] = useState([]);

  const getCameras = () => {
    const cameraArr = [];
    let loading = true;
    if (loading) {
      fetchedPhotos.map((cameras) => {
        cameraArr.push({
          value: cameras.camera.id,
          label: cameras.camera.full_name,
        });
        return cameraArr;
      });
      const uniqueCameras = Array.from(new Set(cameraArr.map(JSON.stringify))).map(JSON.parse);
      uniqueCameras.unshift({ value: 0, label: 'All Cameras' });
      setAvailableCameras(uniqueCameras);
      loading = false;
    }
  };

  useEffect(() => {
    getCameras();
    setActiveCamera({ value: 0, label: 'All Cameras' });
  }, [fetchedPhotos]);

  useEffect(() => {
    const filtered = fetchedPhotos.filter(
      (photo) => photo.camera.id === activeCamera.value
    );

    activeCamera.value === 0
      ? setCurrentFilteredImages(fetchedPhotos)
      : setCurrentFilteredImages(filtered);

    setNumberOfFilteredPhotos(filtered.length);
  }, [activeCamera]);

  const handleCameraChange = (selectedOption) => {
    setActiveCamera(selectedOption);
    setActiveCameraName(selectedOption.label);
  };

  return (
    <Form style={{
      width: '300px',
    }}>
      <Select
        defaultValue={activeCamera}
        onChange={handleCameraChange}
        options={availableCameras}
      />
    </Form>
  );
}