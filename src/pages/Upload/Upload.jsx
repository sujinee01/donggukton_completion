import React, { useState, useEffect } from "react";
import { useGeoLocation } from "../../hooks/useGeoLocation";
import { useReverseGeocoding } from "../../hooks/useReverseGeocoding";
import { LocationInput } from "../../components/index";
import { PhotoUpload, UploadButton } from "../../components/Button/Button";
import { Name, PasswordInput } from "../../components/Input/Input";
import LoadingPage from "../Loading/LoadingPage";
import styles from "../../pages/Upload/Upload.module.css";

const Upload = () => {
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const [address, setAddress] = useState();
  const { loc } = useGeoLocation();
  useEffect(() => {
    if (loc) {
      setLat(loc.latitude);
      setLng(loc.longitude);
    }
  }, [loc]);
  const data = useReverseGeocoding(lat, lng);

  useEffect(() => {
    setAddress(data);
  }, [data]);

  return (
    <div className={styles.Uploadback}>
      {address ? (
        <div className={styles.Uploadpage}>
          <div>
            <div className={styles.PhotoUpload}>
              <LocationInput location={address} />
            </div>
            <div className={styles.PhotoUpload}>
              <PhotoUpload />
            </div>
          </div>
          <div className={styles.UploadInput}>
            {" "}
            <Name /> <PasswordInput />{" "}
          </div>
          <div className={styles.UploadButton}>
            <UploadButton />
          </div>
        </div>
      ) : (
        <LoadingPage title={"현재 위치를 파악중입니다."} />
      )}
    </div>
  );
};

export default Upload;
