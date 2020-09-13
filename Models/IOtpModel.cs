using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginAuthenticationProject.Models
{
    public interface IOtpModel
    {
        OtpModel GetOtp(string msgId);
        bool StoreOtp(OtpModel otp);
    }
}
