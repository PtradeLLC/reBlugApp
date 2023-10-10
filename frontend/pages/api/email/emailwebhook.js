const handleRequest = (req, res) => {
  if (req.method === "POST") {
    const payload = req.body;
    // console.log(payload);
    res.statusCode = 200;
  }
};

export default handleRequest;
