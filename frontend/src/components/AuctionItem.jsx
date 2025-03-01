import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AuctionItem() {
  const { id } = useParams();
  const [item, setItem] = useState({});
  const [bid, setBid] = useState(''); // Store bid as string for input
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState(''); // Store username

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/auctions/${id}`); // Wrap URL in backticks
        setItem(res.data);
      } catch (error) {
        setMessage('Error fetching auction item: ' + (error.response?.data?.message || error.message));
        console.error(error);
      }
    };

    fetchItem();
  }, [id]);

  const handleBid = async () => {
    // Validate bid is a number and greater than current bid
    const bidValue = parseFloat(bid);
    if (isNaN(bidValue) || bidValue <= item.currentBid) {
      setMessage('Please enter a valid bid higher than the current bid.');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5001/bid/${id}`, {
        bid: bidValue,
        username,
      }); // Wrap URL in backticks
      setMessage(res.data.message);
      if (res.data.winner) {
        setMessage(`Auction closed. Winner: ${res.data.winner}`);
      }
      setBid(''); // Clear the bid input after placing a bid
    } catch (error) {
      setMessage('Error placing bid.');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>{item.itemName}</h2>
      <p>{item.description}</p>
      <p>Current Bid: ${item.currentBid || 'No bids yet'}</p>
      <p>Highest Bidder: {item.highestBidder || 'N/A'}</p>
      <input
        type="number"
        value={bid}
        onChange={(e) => setBid(e.target.value)}
        placeholder="Enter your bid"
      />
      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={handleBid} disabled={!username || !bid}>
        Place Bid
      </button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AuctionItem;