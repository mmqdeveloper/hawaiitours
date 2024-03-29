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

export const productColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 200,
  },
  {
    field: "sku",
    headerName: "SKU",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 230,
  },
  {
    field: "categories",
    headerName: "Categories",
    width: 200,
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 200,
  },
  {
    field: "author",
    headerName: "Author",
    width: 200,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <h4 className="cellImg">
            {params.row.author}
          </h4>
        </div>
      );
    },
  },
  {
    field: "badge",
    headerName: "Badge",
    width: 200,
  },
  {
    field: "commission_rate",
    headerName: "Commission Rate",
    width: 200,
  },
  {
    field: "product_notes",
    headerName: "Product Notes",
    width: 200,
  },
  {
    field: "pickup",
    headerName: "Pickup",
    width: 200,
  },
  // {
  //   field: "product_image",
  //   headerName: "Product Image",
  //   width: 200,
  //   renderCell: (params) => {
  //     return (
  //       <div className="cellWithImg">
  //         <img className="cellImg" src={params.row.product_image || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="avatar" />
  //         {params.row.name}
  //       </div>
  //     );
  //   },
  // },
  // {
  //   field: "product_gallery",
  //   headerName: "Product Gallery",
  //   width: 300,
  // },
  {
    field: "seo_title",
    headerName: "SEO Title",
    width: 200,
  },
  {
    field: "meta_desc",
    headerName: "Meta Desc",
    width: 200,
  },
  {
    field: "keyphrase",
    headerName: "Keyphrase",
    width: 200,
  },
  {
    field: "vendor",
    headerName: "Vendor",
    width: 200,
  },
  {
    field: "api",
    headerName: "API",
    width: 200,
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
          {params.row.name}
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
    width: 200,
  },
  {
    field: "parentCategory",
    headerName: "Parent Category",
    width: 230,
  },
];


export const BookingColumns = [
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

export const resourceColumns = [
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
    field: "desc",
    headerName: "Description",
    width: 500,
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 100,
  },
  {
    field: "product",
    headerName: "Product",
    width: 100,
    renderCell: (params) => {
      const productValue = Array.isArray(params.row.product) && params.row.product.length > 0
        ? params.row.product.join(", ") 
        : "None";
  
      return (
        <div className="cellWithImg">
          {productValue}
        </div>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      const statusValue = params.row.status ? "Public" : "Private";
  
      return (
        <div className="cellWithImg">
          {statusValue}
        </div>
      );
    },
  },  
];