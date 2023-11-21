import React, { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";

import "./style.css";
import {
  swal,
  doc,
  setDoc,
  collection,
  getDocs,
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  updateDoc,
  auth,deleteDoc  
} from "../../Config/firebase/firebase";
import { useNavigate } from "react-router-dom";
import { Switch } from 'antd';

import { Input } from 'antd';
import { Button, Modal } from 'antd';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function Additem() {
  const navigate=useNavigate()
  const [restItem, setResItem] = useState([]);
  const [restShow,setshowRest]=useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode,setModalMode]=useState('')
  const [selectedItemId,setSelectedItemId]=useState(null)
  const [resturentMode, setResturentMode] = useState(false);
  const [mode, setMode] = useState(false);





  const changeResturentMode = async () => {
    const newResturentMode = !resturentMode;
    const resturentmode = {
      restMode: newResturentMode,
    };


    try {
      const resturentDocRef = doc(db, 'Resturants', auth.currentUser.uid); 
      await updateDoc(resturentDocRef, resturentmode);
      localStorage.setItem(`${auth.currentUser.uid}`, newResturentMode);
      swal(`Restaurant ${newResturentMode ? 'ON' : 'OFF'}`);
    } catch (error) {
      swal(error.message);
    }
  };

  useEffect(() => {
    const userUID = auth.currentUser?.uid;
    const initialMode = localStorage.getItem(`${userUID}`);
    if (initialMode !== false) {
      setResturentMode(initialMode === 'true');
      setMode(initialMode === 'true');
    }
  }, [changeResturentMode]);




  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  }

  const createItems = async () => {
    try {
      const itemName = document.getElementById("itemname").value;
      const itemPrice = document.getElementById("itemprice").value;
      const itemDescribtion = document.getElementById("itemdescription").value;
      const itemServing = document.getElementById("itemserving").value;
      const itemCategory = document.getElementById("itemcategory").value;
      const itemImage = await uploadImage(
        document.getElementById("itemimage").files[0]
      );

      console.log(itemName,itemPrice,itemDescribtion);
      let itemsResturent = {
        itemName,
        itemPrice,
        itemDescribtion,
        itemServing,
        itemCategory,
        itemImage,
      };

      for (let i in itemsResturent) {
        if (itemsResturent[i].length === 0) {
          await swal("Please Fill All Inputs");
          return;
        }
      }

     if (modalMode==='add'&& selectedItemId===null) {
      await setDoc(
        doc(db, "ResturentsItems", auth.currentUser.uid + Date.now()),
        itemsResturent
      );
      swal("Item Added in Your Resturent")
      
     }
     else if(modalMode==='ubdate' && selectedItemId !==null){
      await updateDoc(
        doc(db, "ResturentsItems", selectedItemId),
        itemsResturent
      );
       swal("Ubdate Item")
      
     }
      await swal("Congratulations!", "Item Added", "success");
    } catch (e) {
      swal({
        icon: "error",
        title: "Oops...",
        text: e.message,
      });
    }
  };


  const Ubdatemodal=(id)=>{
console.log(id);
setIsModalOpen(true)
setModalMode('ubdate')
setSelectedItemId(id)
// handleModeAction()
  }

  const addModal=()=>{
    setIsModalOpen(true)
    setModalMode('add')
    setSelectedItemId(null)
  
  }
  
  const deleteItem=async(id)=>{

    await deleteDoc(doc(db, "ResturentsItems", id));
    swal('Delete Item')
  }
  
    useEffect(() => {  
  const fetchRestItems = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ResturentsItems"));
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setResItem(itemsArray); 
    } catch (e) {
      console.error("Error fetching restaurant items:", e);
    }
  };
  fetchRestItems();
      const filterRestItems = () => {
        auth.onAuthStateChanged((user) => {
          if (user) {
            const filteredItems = restItem.filter((item) => user.uid === item.id.slice(0, 28));
            setshowRest(filteredItems);
          }
        });
      };
    
      filterRestItems();
    }, [restItem]);
  const uploadImage = async (image) => {
    const storageRef = ref(storage, `images/${image.name}`);
    const snapshot = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(snapshot.ref);
    return url;
  };
  const placeholderText = {
    itemname: 'Enter item name',
    itemprice: 'Enter item price',
    itemdescription: 'Enter item description',
    itemserving: 'Enter item serving',
    itemcategory: 'Enter item category',
  };

  
 
  return (
    <>
      <Header />
      <div className="addItem-container">
        <h1 className="accounts-h1">ADD Items in Your Resturent</h1>

      


{/* // modal */}





<Button type="primary" onClick={addModal}  style={{height:'50px',width:'150px',marginTop:'10%'}}>
  Add Items
</Button>
 <hr />

<h1>{`Resturent ${mode? 'ON':'OFF'}`}</h1>

<Switch checked={mode} onChange={changeResturentMode} /> <br />
<Button type="primary" style={{ marginTop: '17px' }} onClick={()=>navigate('/adminchat')} >
      See Messeges
    </Button>
<Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  <h1 style={{ width: '100%', fontSize: '17px' }}>Add items in your restaurant</h1>
  <div style={{ height: '400px' }} className="inputContainerOfAddItem">
    <Input placeholder={placeholderText.itemname} id="itemname" />
    <Input placeholder={placeholderText.itemprice} id="itemprice" />
    <Input placeholder={placeholderText.itemdescription} id="itemdescription" />
    <Input placeholder={placeholderText.itemserving} id="itemserving" />
    <Input placeholder={placeholderText.itemcategory} id="itemcategory" />
    <input
      className="form-control form-control-lg"
      type="file"
      id="itemimage"
    />
    <Button type="primary" style={{ marginTop: '17px' }} onClick={createItems} >
      Add Items
    </Button>
  </div>
</Modal>

      </div>
      <h1 className="accounts-h1" style={{ color: "black" }}>
        Number Of Items in your Resturents
      </h1>

      <div className="items">
     
      <div className="container-Orders" style={{display:'flex',justifyContent:'center',gap:'20px',marginTop:'10%'}} >
      {restShow.map((item, index) => (
         <Card sx={{ maxWidth: 345 }} key={item.id} className="cardadItem" >
         <CardMedia
           sx={{ height: 140 }}
           image={item.itemImage}
           title=  {item.itemName}
         />
         <CardContent>
           <Typography gutterBottom variant="h5" component="div">
           {item.itemName}
           </Typography>
           <Typography variant="body2" color="text.secondary">
             Lizards are a widespread group of squamate reptiles, with over 6,000
             species, ranging across all continents except Antarctica
           </Typography>
         </CardContent>
         <CardActions>


 <Button type="primary" onClick={(()=>Ubdatemodal(item.id))}>
  Ubdate Items
</Button>

         <Button type="primary" danger onClick={()=>deleteItem(item.id)} >
      Delete Item
    </Button>
         </CardActions>
         </Card>
         
        ))}
</div>
     </div>

    </>
  );
      }
    
export default Additem;

































































