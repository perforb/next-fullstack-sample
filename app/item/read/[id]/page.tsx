import Image from "next/image";

const getItem = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/item/read/${id}`,
    {cache: "no-store"}
  );
  const jsonData = await response.json();
  return jsonData.item;
};

const ReadItem = async (context) => {
  const item = await getItem(context.params.id);
  return (
    <div>
      <div>
        <Image src={item.image} width={750} height={500} alt="item-image" priority/>
      </div>
      <div>
        <h1>{item.title}</h1>
        <h2>¥{item.price}</h2>
        <hr/>
        <p>{item.description}</p>
      </div>
    </div>
  );
};

export default ReadItem;