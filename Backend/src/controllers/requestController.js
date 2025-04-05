const apiRequestHandler = async (req, res) => {
  console.log("🚀 Incoming Request Details:");
  console.log("➡️-- Method:", req.method);
  console.log("➡️-- Full URL:", req.protocol + "://" + req.get("host") + req.originalUrl);
  console.log("➡️-- Endpoint:", req.originalUrl);

  console.log("💛-- Headers:", req.headers);
  console.log("💚-- Body:", req.body);
  console.log("💙-- Query Parameters:", req.query);
  console.log("💜-- Params:", req.params.name);
  console.log("🔴 IP Address:", req.ip);
  console.log("🔵 User-Agent:", req.get("User-Agent"));
  console.log("🟢 Referer:", req.get("Referer") || "Noreferer");
  console.log("🟡 Accept:", req.get("Accept"));
  console.log("🕒 Request Time:", new Date().toISOString());
  var responseData = {
    method: req.method,
    url: req.protocol + "://" + req.get("host") + req.originalUrl,
    endpoint: req.originalUrl,
    headers: req.headers,
    body: req.body,
    query: req.query,
    params: req.params,
    ip: req.ip,
    userAgent: req.get("User-Agent"),
    referer: req.get("Referer") || "No referer",
    accept: req.get("Accept"),
    requestTime: new Date().toISOString()
  }
  res.status(200).json({
    message: "API request received successfully",
    data: responseData
  });
};


module.exports = {  apiRequestHandler,}