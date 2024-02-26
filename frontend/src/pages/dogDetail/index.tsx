import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import "./../../assets/style/DogDetail.scss";
import { IoReturnUpBackOutline } from "react-icons/io5";

import type { AppDispatch, RootState } from "./../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllPets, handleAdopt } from "./../../redux/slices/PetSlice";
import { dogInt } from "../home";
import swal from "sweetalert";

type Props = {};

function DogDetail({}: Props) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { _id } = useParams<{ _id: string }>();

  const [loading, setLoading] = useState(true);

  console.log("_id:", _id); // Log the value of _id

  useEffect(() => {
    dispatch(getAllPets()).then(() => setLoading(false));
  }, []);

  const allDogs = useSelector((state: RootState) => state.pet.data);
  const dog: any | undefined = allDogs.find((elem: any) => elem._id === _id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!dog) {
    return <div>Dog not found!</div>;
  }
  return (
    <>
      <section className="head">
        <div className="wrapper">
          <h1>Your Dog</h1>
          <p>
            <span>Home</span> Your Dog
          </p>
        </div>
      </section>

      <section className="Dog_detail">
        <div className="container">
          <div className="imgWrapper">
            <img src={dog.img} alt="" />
            <button
              onClick={() => {
                dispatch(handleAdopt(dog));
                swal("Added succesfully!")
              }}
            >
              Adopt
            </button>
          </div>

          <div className="articles">
            <h1>{dog.name}</h1>

            <div className="four">
              <div className="breedBirth">
                <p>
                  <span>Breed: </span>
                  {dog.breed}
                </p>
                <p>
                  <span>Gender:</span> {dog.gender}
                </p>
              </div>

              <div className="genderSize">
                <p>
                  <span>Size:</span> {dog.size}
                </p>
                <p>
                  <span>Birth:</span> {dog.age}
                </p>
              </div>
            </div>

            <h3>
              <span>Color:</span> {dog.color}
            </h3>
            <p className="bio">{dog.bio}</p>
            <div className="price">
              <h5>
                <span>Price:</span> {dog.price}
                {dog.price !== "Free" ? "$" : null}
              </h5>
            </div>
          </div>
        </div>
        <div className="back">
          {/* <Link to="/home"> */}
          <IoReturnUpBackOutline
            className="home"
            onClick={() => {
              navigate(-1);
            }}
          />
          {/* </Link> */}
        </div>
      </section>
    </>
  );
}

export default DogDetail;
