using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;

namespace LoginAuthenticationProject.Models
{
    public class OtpRepository : IOtpModel
    {
        private readonly AppDbContext _context;

        public OtpRepository(AppDbContext context) {
            _context = context;
        }
        public OtpModel GetOtp(string msgId)
        {
            try {
                var otp = _context.Otps.Find(msgId);
                return otp;
            }
            catch (Exception ex) {
                ErrorLog(ex.Message);
                return null;
            }
            
        }

        public bool StoreOtp(OtpModel otp)
        {
            try
            {
                _context.Otps.Add(otp);
                _context.SaveChanges();
                return true;
            }
            catch (Exception ex) {
                ErrorLog(ex.Message);
                return false;
            }
        }
        private void ErrorLog(string msg) {
            File.AppendAllText(Path.Combine(Directory.GetCurrentDirectory(), "ErrorLog", "ErrorLog.txt"), "Error :- --->" + msg + "\n");
        }
    }
}
