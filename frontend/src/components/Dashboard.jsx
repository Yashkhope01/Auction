import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate(); // Use 'navigate' instead of 'nav'

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/signin'); // Redirect to signin if not authenticated
      return;
    }

    const fetchItems = async () => {
      try {
        const res = await axios.get('http://localhost:5001/auctions');
        setItems(res.data);
      } catch (error) {
        console.error('Error fetching auctions:', error);
      }
    };
    fetchItems();
  }, [navigate]); // Add 'navigate' to dependency array

  //  Handle Logout
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token
    navigate('/signin'); // Redirect to Sign In page
  };

  return (
    <div>
      <h2>Auction Dashboard</h2>

      {/* Logout Button */} 
      <button onClick={handleLogout} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>
        Logout
      </button>

      <Link to="/post-auction">
        <button style={{ marginLeft: '10px' }}>Post New Auction</button>
      </Link>

      <ul style={{ listStyleType: 'none', padding: 0 }}> {/* Improve list styling */}
        {items.map((item) => (
          <li key={item._id} style={{ marginBottom: '10px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <Link to={`/auction/${item._id}`} style={{ textDecoration: 'none', color: 'blue' }}> {/* Wrap the link in a Link component */}
              <strong>{item.itemName}</strong> - Current Bid: ${item.currentBid} {item.isClosed ? '(Closed)' : ''}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;