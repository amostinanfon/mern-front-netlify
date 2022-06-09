import React from 'react';
import { useLocation } from 'react-router-dom';




export default function Success() {

const location = useLocation();

console.log(location);
  return (

    <div style={{
      height: "120vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
  }}>
      <img src='https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg' alt='' 
             style={{height:"200px", width:"200px", margin:"2px"}}
            />
      <div>
            <button
                style={{
                    border: "none",
                    width: 200,
                    borderRadius: 5,
                    padding: "25px",
                    margin:"3px",
                    backgroundColor: "seagreen",
                    color: "white",
                    cursor: 'pointer',
                    fontWeight: '800'
                }}
            >
                <p style={{textTransform:"uppercase"}}>Effectuez avec succès</p>      
            </button><br/>
    </div>

    </div>
  )
}
