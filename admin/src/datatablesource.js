export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const productColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];

export const categoryColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "image",
    headerName: "Image",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 230,
  },
  {
    field: "description",
    headerName: "Description",
    width: 500,
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 100,
  },
];
