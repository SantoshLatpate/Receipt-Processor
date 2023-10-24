const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// In-memory storage for receipts - used MAP to store the database
const receipts = {};

//POST Request- Endpoint for processing receipts 
app.post('/receipts/process', (req, res) => {
  const receipt = req.body;
  const id = generateUUID();
  try {
    const points = calculatePoints(receipt);
    receipts[id] = { id, points };
    res.json({ id });
  } catch (error) {
    res.status(404).json({ error: 'The receipt is invalid' });
  }
  
});

// Get Request - get the points from the api database
app.get('/receipts/:id/points', (req, res) => {
  const id = req.params.id;
  const receipt = receipts[id];
  if (!receipt) {
    res.status(404).json({ error: 'No receipt found for that id' });
  } else {
    res.json({ points: receipt.points });
  }
});

// Function to calculate points
function calculatePoints(receipt) {
    let points = receipt.retailer.replace(/[^A-Za-z0-9]/g, '').length;
    const total = parseFloat(receipt.total);
  
    //50 points if the total is a round dollar amount with no cents
    if (Number.isInteger(total) && total % 1 === 0) {
      points += 50;
    }
  
    //25 points if the total is a multiple of 0.25.
    if (total % 0.25 === 0) {
      points += 25;
    }
  

    //5 points for every two items on the receipt.
    points += (Math.floor(receipt.items.length / 2))*5;
  

    //If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    receipt.items.forEach((item) => {
      const trimmedLength = item.shortDescription.trim().length;
      if (trimmedLength % 3 === 0) {
        const price = parseFloat(item.price);
        points += Math.ceil(price * 0.2);
      }

    });
  
    //10 points if the time of purchase is after 2:00pm and before 4:00pm.
    const purchaseTime = new Date(`${receipt.purchaseDate}T${receipt.purchaseTime}`);
    if (purchaseTime.getHours() >= 14 && purchaseTime.getHours() < 16) {
      points += 10;
    }
     //console.log(' 6 ..',points);
  
     //6 points if the day in the purchase date is odd.
    if (purchaseTime.getDate() % 2 === 1) {
      points += 6;
    }
    return points;
  }

// Function to generate a UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
