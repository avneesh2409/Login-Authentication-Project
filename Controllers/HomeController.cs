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
    [Route("[controller]")]
    public class HomeController : Controller
    {
        private readonly IConfiguration _config;
        private readonly IUserModel _userContext;

        public HomeController(IUserModel userContext, IConfiguration config) {
            _config = config;
            _userContext = userContext;
        }
        


        #region Sms Service
        [AllowAnonymous]
        [HttpPost]
        [Route("sms")]
        public JsonResult SmsService(SmsHorizonModel model)
        {
            string msgId = SendSms(model.Number, model.Message);
            return Json(new { data = msgId });
        }

        [HttpGet]
        [Route("sms-status/{msgId}")]
        public string SmsStatus(string msgId)
        {
            string smsStatus = SentSmsStatus(msgId);
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

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              null,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private UserViewModel AuthenticateUser(LoginModel login)
        {
            UserModel user = _userContext.GetSingleUser(login.email,login.password);
              
            if (user != null)
            {
                var authUser = new UserViewModel { Id=user.Id,email=user.Username,Name=user.Name,Image=user.Image};
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
