using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using LoginAuthenticationProject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LoginAuthenticationProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IConfiguration _config;

        public AppDbContext _context { get; }

        public PaymentController(IConfiguration config, AppDbContext context)
        {
            _config = config;
            _context = context;
        }

        // POST api/payment
        [HttpPost]
        public ObjectResult Post(PayRequestUMoney model)
        {
            string key = _config["PayuMoney:Key"];
            string salt = _config["PayuMoney:Salt"];
            //string redirect_url = "http://localhost:44316/redirect";
            string hash = PaymentRequestHash(model);
            _context.PaymentHistories.Add(new PayUMoneyDb {
                Amount = model.Amount,
                EmailId = model.EmailId,
                FirstName = model.FirstName,
                LastName = model.LastName,
                ProductInfo = model.ProductInfo,
                TransactionId = model.TransactionId,
                Mobile = model.Mobile,
                Udf5 = model.Udf5
            });
            return new ObjectResult(new { model, hash, key, salt });
        }

        private string PaymentRequestHash(PayRequestUMoney data)
        {
            byte[] hash;
            string beforeHashPayload = _config["PayuMoney:Key"] + "|" + data.TransactionId + "|" + data.Amount + "|" + data.ProductInfo + "|" + data.FirstName + "|" + data.EmailId + "|" + data.Mobile + "|||||" + data.Udf5 + "||||||" + _config["PayuMoney:Salt"];
            var datab = Encoding.UTF8.GetBytes(beforeHashPayload);
            using (SHA512 shaM = new SHA512Managed())
            {
                hash = shaM.ComputeHash(datab);
            }


            return GetStringFromHash(hash);
        }
        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2").ToLower());
            }
            return result.ToString();
        }
        [HttpPost]
        [Route("/test-payment")]
        public async Task<string> TestPayment(PaymentRequest model) {
           
            StringContent content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", "9d4455fd-13ea-4c86-b4b5-d0eef27561b6");
                using (var response = await httpClient.PostAsync("https://secure.snd.payu.com/api/v2_1/orders",content))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    return apiResponse;
                }
            }
        }
        [HttpPost]
        [Route("payment-methods")]
        public async Task<ObjectResult> PaymentMethods()
        {

            //StringContent content = new StringContent(JsonConvert.SerializeObject(model), Encoding.UTF8, "application/json");
            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "9d4455fd-13ea-4c86-b4b5-d0eef27561b6");
                httpClient.DefaultRequestHeaders.CacheControl = new CacheControlHeaderValue();
                using (var response = await httpClient.GetAsync("https://secure.snd.payu.com/api/v2_1/paymethods"))
                {
                    string apiResponse = await response.Content.ReadAsStringAsync();
                    return new ObjectResult(apiResponse);
                }
            }
        }
    }
}
