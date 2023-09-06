let sendToken = (user, statuscode, res, req) => {
  const token = user.getJwtToken();
  //
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };
  console.log("generated toked : ", token);
  res.cookie("token", token, options).status(statuscode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
