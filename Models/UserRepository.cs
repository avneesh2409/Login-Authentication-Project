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
                user.Password = null;
                return user;
            }
            catch (Exception ex) {
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
    }
}
