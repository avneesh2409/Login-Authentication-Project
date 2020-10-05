using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace LoginAuthenticationProject.Models
{


    public class PayRequestUMoney
    {
        public string TransactionId { get; set; }
        public double Amount { get; set; }
        public string Mobile { get; set; }

        public string ProductInfo { get; set; }
        public string FirstName { get; set; }
    
        public string LastName { get; set; }

        public string EmailId { get; set; }

        public string Udf5 { get; set; }
    }
    public class PayUMoneyDb:PayRequestUMoney
    {
        [Key]
        public Guid Id { get; set; }
    }
}
