using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginAuthenticationProject.Models
{
    public class PaymentRequest
    {
        public PaymentRequest()
        {
            this.extOrderId = Guid.NewGuid().ToString();
        }
        public string notifyUrl { get; set; }
        public string continueUrl { get; set; }
        public string extOrderId { get; set; }
        public string customerIp { get; set; }
        public string merchantPosId { get; set; }
        public string description { get; set; }
        public string currencyCode { get; set; }
        public string totalAmount { get; set; }
        public Buyer buyer { get; set; }
        public List<Product> products { get; set; }
        public PaymentMethods payMethods { get; set; }
    }

    public class Buyer
    {
        public string email { get; set; }
        public string phone { get; set; }
        public string city { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string language { get; set; }
    }

    public class PaymentMethods
    {
        public PaymentMethod payMethod { get; set; }
    }

    public class PaymentMethod
    {
        public Card card { get; set; }
    }

    public class Card
    {
        public string number { get; set; }
        public string expirationMonth { get; set; }
        public string expirationYear { get; set; }
        public string cvv { get; set; }
    }

    public class Product
    {
        public string name { get; set; }
        public string unitPrice { get; set; }
        public string quantity { get; set; }
    }
}
