"use client";

import {useState} from "react";
import useAuth from "@app/utils/useAuth";
import * as process from "process";

const CreateItem = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");

  const loginUserEmail = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/item/create`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          title: title,
          price: price,
          image: image,
          description: description,
          email: loginUserEmail
        })
      });
      const jsonData = await response.json();
      alert(jsonData.message);
    } catch (e) {
      alert("Failed to create an item.");
    }
  };

  if (loginUserEmail) {
    return (
      <div>
        <h1 className="page-title">Create an item</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)}
                 placeholder="アイテム名" required/>
          <input type="text" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="価格"
                 required/>
          <input type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} placeholder="画像"
                 required/>
          <textarea name="description" value={description} onChange={(e) => setDescription(e.target.value)}
                    placeholder="商品説明" required></textarea>
          <button>作成</button>
        </form>
      </div>
    );
  }
};

export default CreateItem;