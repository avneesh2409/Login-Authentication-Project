using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace LoginAuthenticationProject.Models
{
    public class OtpModel
    {
        private string _msgId;
        private string _otp;
        private DateTime _createdAt;
        private DateTime _updatedAt;

        public OtpModel() {
            this.CreatedAt = DateTime.UtcNow;
            this.UpdatedAt = DateTime.UtcNow;
        }
        [Key]
        public string MsgId { get => _msgId; set => _msgId = value; }
        public string Otp { get => _otp; set => _otp = value; }
        
        public DateTime CreatedAt { get => _createdAt; set => _createdAt = value; }
        public DateTime UpdatedAt { get => _updatedAt; set => _updatedAt = value; }
    }
}
