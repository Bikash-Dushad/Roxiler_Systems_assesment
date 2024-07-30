const Transactions = require("../models/transactions");

async function fetchJSON(url) {
  const fetch = (await import("node-fetch")).default;
  const response = await fetch(url);
  return response.json();
}

// Initialize the database with seed data
module.exports.initialize = async (req, res) => {
  try {
    const transactions = await fetchJSON(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    await Transactions.deleteMany({}); // Clear existing data
    await Transactions.insertMany(transactions);

    res
      .status(200)
      .send({
        success: "true",
        message: "Database initialized with seed data",
      });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ success: "false", message: "Error in initialize api" }, error);
  }
};

//getting all transaction
module.exports.allTransaction = async (req, res) => {
  try {
    const transactions = await Transactions.find({});
    if (!transactions) {
      return res
        .status(404)
        .send({ success: false, message: "No transaction founded" });
    }
    return res
      .status(200)
      .send({ success: true, message: "All Transaction", transactions });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error in allTransaction api", error });
  }
};

// //transaction by date
// module.exports.transactonByDate = async (req, res) =>{
//     const month = req.params.month;

// }
module.exports.test = async (req, res)=>{
    return res.render('transactions')
}
// transaction by title of transaction
module.exports.searchByTitle = async (req, res) => {
    try {
      const title = req.body.title;
      // Create a query to find titles containing the specified title
      const query = { title: { $regex: title, $options: "i" } };
  
      // Find the documents that match the query
      const documents = await Transactions.find(query);
      
      if (documents.length === 0) {
        return res.status(404).send({ success: false, message: "No documents found" });
      }
      
      return res.status(200).send({ success: true, message: "Transactions found by title", documents });
    } catch (error) {
      return res.status(500).send({ success: false, message: "Error in searchByTitle API", error });
    }
  };
  