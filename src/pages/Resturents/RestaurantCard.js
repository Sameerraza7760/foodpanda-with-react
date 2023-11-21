  import swal from "sweetalert";
  
  
  export default function RestaurantCard({ item, onClick }) {
    return (
<div className="card" onClick={() => item.restMode ? onClick(`/detail/${item.id}`) : swal("The restaurant is closed now")}>
  <img src={item.restImage} alt="Card Image" />
  <div className="card-content">
    <h1 style={{ fontSize: '20px', color: 'black', fontFamily: 'sans-serif' }}>{item.restName}</h1>
    <p>{item.restCountry}</p>
    <a href="#">Read More</a>
  </div>
</div>

    );
  } 