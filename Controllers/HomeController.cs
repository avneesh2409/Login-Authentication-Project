using System;
using System.IO;
using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using LoginAuthenticationProject.Models;
using Microsoft.AspNetCore.Authorization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;

namespace LoginAuthenticationProject.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class HomeController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IUserModel _userContext;
        private readonly IOtpModel _otpContext;

        public HomeController(IUserModel userContext,IOtpModel otpContext, IConfiguration config) {
            _config = config;
            _userContext = userContext;
            _otpContext = otpContext;
        }

        #region OTP Authentication
        [AllowAnonymous]
        [HttpGet]
        [Route("verify-otp/{msgId}/{recieveotp}")]
        public JsonResult VerifyOtp(string msgId,string recieveotp) {
            OtpModel otp = _otpContext.GetOtp(msgId);
            if (otp != null)
            {
                double diff2 = (DateTime.UtcNow - otp.CreatedAt).TotalMinutes;
                if (diff2 < 10)
                {
                    if (otp.Otp == recieveotp)
                    {
                        UserViewModel user = _userContext.GetUserByMsgId(msgId);
                        string token = GenerateJSONWebToken(user);
                        return Json(new { status = true, accessToken = token,message = "verified" });
                    }
                    return Json(new { status = false, message = "Please Enter Valid Otp !!" });
                }
                else
                {
                    return Json(new { status = false, message = "Otp Expired" });
                }

            }
            else {
                return new JsonResult(new { status = false, message = "Invalid Request" });
            }
            
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("sent-otp/{number}")]
        public JsonResult StoreOtp(string number) {
            string user = _userContext.GetUserByNumber(number);
            if (user != null)
            {
                Random generator = new Random();
                string otp = generator.Next(0, 999999).ToString("D6");
                string msgId = SendSms(number, "OTP :- " + otp + "  it will expire in 10 minutes");
                if (msgId != null || msgId != "")
                {
                    //string MsgId = generator.Next(0, 999999).ToString();
                    _userContext.UpdateOtp(number, msgId);
                    _otpContext.StoreOtp(new OtpModel
                        {
                            MsgId = msgId,
                            Otp = otp
                        });
                        return Json(new { status = true, data = msgId, message = "Otp Sent !!" });
                }
                else
                {
                    return Json(new { status = false,message = "Enter Valid Number please !!" });
                }
            }
            else {
                return Json(new { status=false,message="You are not registered ,firstly Register yourself !!"});
            }
            
        }
        #endregion

        #region Sms Service
        [HttpGet]
        [Route("sms-status/{msgId}")]
        public string SmsStatus(string MsgId)
        {
            string smsStatus = SentSmsStatus(MsgId);
            return smsStatus;
        }


        public string SentSmsStatus(string msgId)
        {
            string sUserID = _config["Sms:User"];
            string sApikey = _config["Sms:Key"];
            string url = "http://smshorizon.co.in/api/status.php?user=" + sUserID + "&apikey=" + sApikey + "&msgid=" + msgId + "";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(url);
            request.MaximumAutomaticRedirections = 4;
            request.Credentials = CredentialCache.DefaultCredentials;
            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream receiveStream = response.GetResponseStream();
                StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
                string sResponse = readStream.ReadToEnd();
                response.Close();
                readStream.Close();
                return sResponse;
            }
            catch (Exception ex)
            {
                System.Console.WriteLine("Error occured :-", ex.Message);
                return "";
            }
        }
        public string SendSms(string sNumber, string sMessage)
        {
            string sUserID = _config["Sms:User"];
            string sApikey = _config["Sms:Key"];
            string sSenderid = "MYTEXT";
            string sType = "txt";
            string sURL = "http://smshorizon.co.in/api/sendsms.php?user=" + sUserID + "&apikey=" + sApikey + "&mobile=" + sNumber + "&senderid=" + sSenderid + "&message=" + sMessage + "&type=" + sType + "";

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(sURL);
            request.MaximumAutomaticRedirections = 4;
            request.Credentials = CredentialCache.DefaultCredentials;
            try
            {
                HttpWebResponse response = (HttpWebResponse)request.GetResponse();
                Stream receiveStream = response.GetResponseStream();
                StreamReader readStream = new StreamReader(receiveStream, Encoding.UTF8);
                string sResponse = readStream.ReadToEnd();
                response.Close();
                readStream.Close();
                return sResponse;
            }
            catch (Exception ex)
            {
                System.Console.WriteLine("Error occured :-", ex.Message);
                return "";
            }
        }

        #endregion
        #region Token Authentication

        [AllowAnonymous]
        [HttpPost]
        [Route("login")]
        public JsonResult Login(LoginModel login)
        {
            var user = AuthenticateUser(login);

            if (user != null)
            {
                var tokenString = GenerateJSONWebToken(user);
                return Json(new { status=true,token = tokenString });
            }
            else {
                return Json(new { status = false,message = "unable to login"});
            }
            
        }

        private string GenerateJSONWebToken(UserViewModel userInfo)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            Claim[] claims = new Claim[] { 
                new Claim("email", userInfo.Email),
                new Claim("name",userInfo.Name),
                new Claim("image",userInfo.Image)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserViewModel AuthenticateUser(LoginModel login)
        {
            UserModel user = _userContext.GetSingleUser(login.email,login.password);
              
            if (user != null)
            {
                var authUser = new UserViewModel { Id=user.Id,Email=user.Username,Name=user.Name,Image=user.Image};
                return authUser;
            }
            return null;
        }
        #endregion

        [AllowAnonymous]
        [HttpPost]
        [Route("post-user")]
        public ObjectResult PostUser(UserModel user) {
            var userResult = _userContext.AddUsers(user);
            return new ObjectResult(userResult);
        }
        [Route("get-users")]
        public ObjectResult GetUsers()
        {
            var users = _userContext.GetUsers();
            return new ObjectResult(users);
        }
    }
}
