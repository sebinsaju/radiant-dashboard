import axios from "axios";
import React, { useEffect, useState } from "react";
import { instance } from "../../axios";
import Input from "../../components/input";
import ModalWrapper from "../../components/modal";
import style from "./Banners.module.scss";

const Bannners = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    instance
      .get("banners")
      .then((res) => {
        setIsLoading(false);
        setData(res.data.banners);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);
  const toggleModal = () => {
    setModal(!modal);
  };
  let token;
  if (typeof window != "undefined") {
    token = localStorage.getItem("Token");
  }
  useEffect(() => {
    setImage(image);
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("https://api-radiant.herokuapp.com/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data.picture && setImageUrl(res.data.picture))
      .catch((err) => {
      });
  }, [image]);
  const imageSubmit = (e) => {
    setImage(e.target.files[0]);
  };
  const addNew = () => {
    setModal(true);
  };
  const formSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault();
    instance
      .post("admin/addbanner", {
        title: name,
        image: imageUrl,
      })
      .then((res) => {
        setIsLoading(false)
        window.location.reload();
      }).catch((err)=>{
        setIsLoading(false)
      });
  };
  const deleteBanner = (id) => {
    alert("Delete image");
    setIsLoading(true)
    instance.post(`admin/deletebanner/${id}`).then((res) => {
      setIsLoading(false)
      window.location.reload();
    }).catch((err)=>{setIsLoading(false)});
  };
  return (
    <div>
      {isLoading && <div className={style.overlay}></div>}
      <ModalWrapper isOpen={modal} toggle={toggleModal}>
        <form onSubmit={formSubmit}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input type="file" onChange={imageSubmit} />
          <button type="submit" disabled={(imageUrl&&name)?false:true}>Submit</button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </ModalWrapper>
      <div className={style.btn_add}>
        <button onClick={addNew}>Add new</button>
      </div>
      <div className={style.banners}>
        {data &&
          data.map((item, index) => {
            {
              console.log(item);
            }
            return (
              <div className={style.image_wrapper} key={index}>
                <button
                  onClick={() => {
                    deleteBanner(item._id);
                  }}
                >
                  Delete
                </button>
                <img src={item.image} alt={item.name} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Bannners;
