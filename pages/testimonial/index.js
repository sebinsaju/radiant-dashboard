import axios from "axios";
import React, { useEffect, useState } from "react";
import { instance } from "../../axios";
import Input from "../../components/input";
import ModalWrapper from "../../components/modal";
import style from "./Testimonial.module.scss";

const Testimonial = () => {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [image, setImage] = useState({});
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState("");
  useEffect(() => {
    setLoading(true)
    instance
      .get("testimonials")
      .then((res) => {
        setData(res.data.testimonials);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const toggleModal = () => {
    setModal(!modal);
  };
  const addNew = () => {
    toggleModal();
  };
  let token;
  if (typeof window != "undefined") {
    token = localStorage.getItem("Token");
  }

  useEffect(() => {
    setLoading(true)
    setImage(image);
    const formData = new FormData();
    formData.append("image", image);
    axios
      .post("https://api-radiant.herokuapp.com/api/v1/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            `Bearer ${token}`,
        },
      })
      .then((res) => res.data.picture && setImageUrl(res.data.picture),setLoading(false))
      .catch((err) => {
        console.log(err);
      });
  }, [image]);
  const imageSubmit = (e) => {
    setLoading(true)
    setImage(e.target.files[0]);
  };
  const deleteTestimonial = (id) => {
    setLoading(true)
    alert("Delete item")
    instance.post(`admin/deletetestimonial/${id}`).then((res) => {
      window.location.reload(),setLoading(false)
    });
  };
  const formSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    instance.post("admin/addtestimonial", {
      name,
      content,
      image: imageUrl,
    }).then((res)=>{window.location.reload(),setLoading(false)}).catch((err)=>{console.log(err),setError(err.response.data.message)},setLoading(false));
  };
  return (
    <div>
      {loading&&<div className={style.overlay}>jodjoho</div>}
      <ModalWrapper isOpen={modal} toggle={toggleModal}>
        <form onSubmit={formSubmit}>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            placeholder="comment"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <input type="file" onChange={imageSubmit} />
          <button type="submit">Submit</button>
          {error&&<div style={{color:"red"}}>{error}</div>}
        </form>
      </ModalWrapper>
      <div className={style.btn_add}>
        <button onClick={addNew}>Add new</button>
      </div>
      <div className={style.testimonials}>
        {data.map((item, index) => {
          return (
            <div key={index} className={style.testimonial}>
              <div className={style.name}>{item.name}</div>
              <div>
                <img src={item.image} />
              </div>
              <div>{item.content}</div>
              <div className={style.btn_wrapper}>
                {/* <button>Edit</button> */}
                <button
                  onClick={() => {
                    deleteTestimonial(item._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Testimonial;
