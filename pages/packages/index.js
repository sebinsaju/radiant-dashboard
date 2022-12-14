import React, { useEffect, useState } from "react";
import { instance } from "../../axios";
import ModalWrapper from "../../components/modal";
import style from "./Packages.module.scss";
import Input from "../../components/input";
const Packages = () => {
  const [data, setData] = useState([]);
  const [openAddNew, setOpenAddNew] = useState(false);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [items, setItems] = useState([]);
  const [feature, setFeature] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    instance
      .get("outingpackages")
      .then((res) => {
        setIsLoading(false);
        setData(res.data.packages);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);
  const Delete = (id) => {
    alert("Delete Package");
    setIsLoading(true);
    instance
      .post(`admin/deleteoutingpackage/${id}`)
      .then((res) => {
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  const ToggleModal = () => {
    setModal(!modal);
  };
  const AddNewAddress = () => {
    ToggleModal();
    setOpenAddNew(true);
  };
  const addFeature = (e) => {
    e.preventDefault();
    items.push(feature);
    setFeature("");
  };
  const AddNewPackage = (e) => {
    setIsLoading(true);
    e.preventDefault();
    instance
      .post("admin/addoutingpackage", {
        title,
        price,
        items,
      })
      .then((res) => {
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setIsLoading(false);
      });
  };
  return (
    <div className={style.packages}>
      {isLoading && <div className={style.overlay}></div>}
      <ModalWrapper isOpen={modal} toggle={ToggleModal}>
        {openAddNew && (
          <div>
            <form onSubmit={AddNewPackage}>
              <div>
                <Input
                  placeholder="title"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </div>
              <div>
                <Input
                  placeholder="price"
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
              </div>
              <div style={{ display: "flex" }}>
                <div style={{ flex: "auto" }}>
                  <Input
                    placeholder="features"
                    id="features"
                    onChange={(e) => {
                      setFeature(e.target.value);
                    }}
                    value={feature}
                  />
                </div>
                <button style={{ marginLeft: "40px" }} onClick={addFeature}>
                  Add
                </button>
              </div>
              {items && (
                <ol>
                  {items.map((item, index) => {
                    return <li key={index}>{item}</li>;
                  })}
                </ol>
              )}
              <div>
                <button type="submit" disabled={(title&&price&&items.length>0)?false:true}>Submit</button>
              </div>
            </form>
          </div>
        )}
      </ModalWrapper>
      <div className={style.btn_add}>
        <button onClick={AddNewAddress}>Add new</button>
      </div>
      {data.map((item, index) => {
        return (
          <div key={index} className={style.package}>
            <div className={style.title}>{item.title}</div>
            <div className={style.price}>Price : {item.price}</div>
            <ol>
              {item.items.map((packages, index) => {
                return <li key={index}>{packages}</li>;
              })}
            </ol>
            <div>
              {/* <button>Edit</button> */}
              <button
                onClick={() => {
                  Delete(item._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Packages;
