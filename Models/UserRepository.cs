using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LoginAuthenticationProject.Models
{
    public class UserRepository : IUserModel
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context) {
            _context = context;
        }
        public UserModel AddUsers(UserModel user)
        {
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
                return user;
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
                return null;
            }
        }
        public UserModel GetSingleUser(string email, string password) {
            try {
                    var user = _context.Users
                       .Where(s => s.Username == email)
                       .Where(s => s.Password == password)
                       .FirstOrDefault<UserModel>();
                return user;
             }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
                return null;
            }
            
        }

        public UserViewModel GetUserByMsgId(string msgId)
        {
            try {
                var user = _context.Users.FirstOrDefault(e => e.MsgId == msgId);
                if (user != null) {
                    return new UserViewModel
                    {
                        Id=user.Id,
                        Email=user.Username,
                        Image=user.Image,
                        Name=user.Name
                    };
                }
                else {
                    return null;
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
                return null;
            }
           

        }

        public string GetUserByNumber(string number)
        {
            try {
                var user = _context.Users.Where(e => e.Contact == number).FirstOrDefault();
                if (user != null) {
                    return user.Contact;
                }
                return null;
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
                return null;
            }
        }

        public List<UserModel> GetUsers()
        {
            return _context.Users.ToList();
        }

        public void UpdateOtp(string number,string msgId)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(e => e.Contact == number);
                if (user != null)
                {
                    user.MsgId = msgId;
                    user.UpdatedAt = DateTime.UtcNow;
                    _context.SaveChanges();
                }
            }
            catch (Exception ex) {
                Console.WriteLine(ex.Message);
            }
        }
    }
}
