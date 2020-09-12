using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginAuthenticationProject.Models
{
    public class SmsHorizonModel
    {
        public string Number { get; set; }
        public string Message { get; set; }
    }
    public class LoginModel
    {
        public string email { get; set; }
        public string password { get; set; }
    }
    public class UserViewModel
    {
        public int Id { get; set; }
        public string email { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
    }
}
